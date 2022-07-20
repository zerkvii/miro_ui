import axios from 'axios';
import qs from 'query-string';
import type { DescData } from '@arco-design/web-vue/es/descriptions/interface';

export interface MusicRecord {
  id: number;
  number: number;
  artist: string;
  album: string;
  playNumber: number;
  createdTime: string;
  status: 'online' | 'offline';
}

export interface MusicParams extends Partial<MusicRecord> {
  current: number;
  pageSize: number;
}

export interface MusicListRes {
  list: MusicRecord[];
  total: number;
}

export function queryMusicList(params: MusicParams) {
  return axios.get<MusicListRes>('/api/musics', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export interface ServiceRecord {
  id: number;
  title: string;
  description: string;
  name?: string;
  actionType?: string;
  icon?: string;
  data?: DescData[];
  enable?: boolean;
  expires?: boolean;
}
export function queryInspectionList() {
  return axios.get('/api/list/quality-inspection');
}

export function queryTheServiceList() {
  return axios.get('/api/list/the-service');
}

export function queryRulesPresetList() {
  return axios.get('/api/list/rules-preset');
}
