import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { UnauthorizedError, ForbiddenError } from './errorHandler.js';
import { prisma } from '../config/database.js';
import type { UserRole } from '@thinkspace/shared';

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
}

interface JwtPayload {
  sub: string;
  username: string;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}

function extractToken(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }
  return null;
}

// Middleware: require authenticated user
export async function requireAuth(
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const token = extractToken(req);
    if (!token) {
      throw new UnauthorizedError('Access token required');
    }

    const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    // Verify user still exists and is not suspended
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, username: true, email: true, role: true, isVerified: true, isSuspended: true },
    });

    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    if (user.isSuspended) {
      throw new ForbiddenError('Your account has been suspended');
    }

    req.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role as UserRole,
      isVerified: user.isVerified,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new UnauthorizedError('Invalid or expired access token'));
    } else {
      next(error);
    }
  }
}

// Middleware: optionally attach user (public routes that show extra data when logged in)
export async function optionalAuth(
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const token = extractToken(req);
    if (!token) {
      return next();
    }

    const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, username: true, email: true, role: true, isVerified: true, isSuspended: true },
    });

    if (user && !user.isSuspended) {
      req.user = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role as UserRole,
        isVerified: user.isVerified,
      };
    }
  } catch {
    // Silently ignore invalid tokens in optional auth
  }
  next();
}

// Middleware: require specific roles
export function requireRole(...roles: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new UnauthorizedError());
      return;
    }
    if (!roles.includes(req.user.role)) {
      next(new ForbiddenError('You do not have permission to access this resource'));
      return;
    }
    next();
  };
}

export const requireAdmin = requireRole('ADMIN');
export const requireModerator = requireRole('ADMIN', 'MODERATOR');
