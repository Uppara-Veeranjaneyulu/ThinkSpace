import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { prisma } from '../../config/database.js';
import { env } from '../../config/env.js';
import { ConflictError, UnauthorizedError, ForbiddenError, NotFoundError } from '../../middleware/errorHandler.js';
import type { RegisterInput, LoginInput, AuthUserDTO, UserRole } from '@thinkspace/shared';

interface TokenPayload {
  sub: string;
  username: string;
  email: string;
  role: UserRole;
}

function formatUserDTO(user: any): AuthUserDTO {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    displayName: user.displayName,
    bio: user.bio,
    avatarUrl: user.avatarUrl,
    coverImageUrl: user.coverImageUrl,
    isVerified: user.isVerified,
    isPrivate: user.isPrivate,
    role: user.role as UserRole,
    emailVerified: user.emailVerified,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}

function generateTokens(user: { id: string; username: string; email: string; role: string }) {
  const payload: TokenPayload = {
    sub: user.id,
    username: user.username,
    email: user.email,
    role: user.role as UserRole,
  };

  const accessToken = jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  });

  const refreshToken = jwt.sign({ sub: user.id }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  });

  return { accessToken, refreshToken };
}

function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export const authService = {
  async register(input: RegisterInput) {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: input.email.toLowerCase() },
          { username: input.username.toLowerCase() },
        ],
      },
    });

    if (existingUser) {
      if (existingUser.email.toLowerCase() === input.email.toLowerCase()) {
        throw new ConflictError('An account with this email already exists');
      }
      throw new ConflictError('This username is already taken');
    }

    const passwordHash = await argon2.hash(input.password);

    const user = await prisma.user.create({
      data: {
        username: input.username.toLowerCase(),
        email: input.email.toLowerCase(),
        displayName: input.displayName || input.username,
        passwordHash,
        emailVerified: false,
      },
    });

    const { accessToken, refreshToken } = generateTokens(user);

    // Store refresh token
    const tokenHash = hashToken(refreshToken);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await prisma.refreshToken.create({
      data: {
        tokenHash,
        userId: user.id,
        expiresAt,
      },
    });

    return {
      user: formatUserDTO(user),
      accessToken,
      refreshToken,
    };
  },

  async login(input: LoginInput) {
    const user = await prisma.user.findUnique({
      where: { email: input.email.toLowerCase() },
    });

    if (!user || !user.passwordHash) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const isPasswordValid = await argon2.verify(user.passwordHash, input.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid email or password');
    }

    if (user.isSuspended) {
      throw new ForbiddenError('Your account has been suspended. Please contact support.');
    }

    const { accessToken, refreshToken } = generateTokens(user);

    const tokenHash = hashToken(refreshToken);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await prisma.refreshToken.create({
      data: {
        tokenHash,
        userId: user.id,
        expiresAt,
      },
    });

    return {
      user: formatUserDTO(user),
      accessToken,
      refreshToken,
    };
  },

  async refreshToken(token: string) {
    if (!token) {
      throw new UnauthorizedError('Refresh token required');
    }

    try {
      jwt.verify(token, env.JWT_REFRESH_SECRET);
    } catch {
      throw new UnauthorizedError('Invalid or expired refresh token');
    }

    const tokenHash = hashToken(token);
    const storedToken = await prisma.refreshToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    });

    if (!storedToken || storedToken.revokedAt || storedToken.expiresAt < new Date()) {
      throw new UnauthorizedError('Refresh token revoked or expired');
    }

    if (storedToken.user.isSuspended) {
      throw new ForbiddenError('Account is suspended');
    }

    // Token rotation: Revoke old token
    await prisma.refreshToken.update({
      where: { id: storedToken.id },
      data: { revokedAt: new Date() },
    });

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(storedToken.user);

    const newTokenHash = hashToken(newRefreshToken);
    await prisma.refreshToken.create({
      data: {
        tokenHash: newTokenHash,
        userId: storedToken.user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return {
      user: formatUserDTO(storedToken.user),
      accessToken,
      refreshToken: newRefreshToken,
    };
  },

  async logout(token?: string) {
    if (token) {
      const tokenHash = hashToken(token);
      await prisma.refreshToken.updateMany({
        where: { tokenHash, revokedAt: null },
        data: { revokedAt: new Date() },
      });
    }
  },

  async getMe(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return formatUserDTO(user);
  },
};
