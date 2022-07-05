import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';

export interface AuthData {
  username: string;
  password: string;
}

export interface LoginRes {
  token:string
}

export function auth(data: AuthData) {
  return axios.post<LoginRes>('/api/users/auth', data);
}

export function logout() {
  return axios.post<LoginRes>('/api/users/logout');
}

export function getUserInfo() {
  return axios.get<UserState>('/api/users/info');
}

export function getMenuList() {
  return axios.get<RouteRecordNormalized[]>('/api/users/menu');
}
