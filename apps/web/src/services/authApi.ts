import { api, setAccessToken } from '@/lib/axios';
import type { AuthUserDTO, LoginInput, RegisterInput } from '@thinkspace/shared';

interface AuthResponse {
  user: AuthUserDTO;
  accessToken: string;
}

export const authApi = {
  async register(data: RegisterInput): Promise<AuthResponse> {
    const res = await api.post<{ data: AuthResponse }>('/auth/register', data);
    const { accessToken } = res.data.data;
    setAccessToken(accessToken);
    return res.data.data;
  },

  async login(data: LoginInput): Promise<AuthResponse> {
    const res = await api.post<{ data: AuthResponse }>('/auth/login', data);
    const { accessToken } = res.data.data;
    setAccessToken(accessToken);
    return res.data.data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
    setAccessToken(null);
  },

  async getMe(): Promise<AuthUserDTO> {
    const res = await api.get<{ data: AuthUserDTO }>('/auth/me');
    return res.data.data;
  },

  async refreshToken(): Promise<string> {
    const res = await api.post<{ data: { accessToken: string } }>('/auth/refresh');
    const { accessToken } = res.data.data;
    setAccessToken(accessToken);
    return accessToken;
  },

  async forgotPassword(email: string): Promise<void> {
    await api.post('/auth/forgot-password', { email });
  },

  async resetPassword(token: string, password: string): Promise<void> {
    await api.post('/auth/reset-password', { token, password, confirmPassword: password });
  },
};
