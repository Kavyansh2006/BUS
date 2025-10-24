// Authentication Service
// Connects to: RegisterUserHandler, LoginUserHandler

import apiClient from './api.client';
import { API_ENDPOINTS } from './api.config';
import { RegisterRequest, LoginRequest, AuthResponse } from './api.types';

class AuthService {
  // Register new user
  // → POST /api/auth/register → RegisterUserHandler
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      data,
      false // No auth required for registration
    );
    
    // Store token after successful registration
    if (response.token) {
      await apiClient.setToken(response.token);
    }
    
    return response;
  }

  // Login user
  // → POST /api/auth/login → LoginUserHandler
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      data,
      false // No auth required for login
    );
    
    // Store token after successful login
    if (response.token) {
      await apiClient.setToken(response.token);
    }
    
    return response;
  }

  // Logout user
  async logout(): Promise<void> {
    await apiClient.clearToken();
  }

  // Check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    const token = await apiClient.getToken();
    return !!token;
  }

  // Get current auth token
  async getToken(): Promise<string | null> {
    return await apiClient.getToken();
  }
}

export default new AuthService();
