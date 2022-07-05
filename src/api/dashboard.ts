import axios from 'axios';
import type { TableData } from '@arco-design/web-vue/es/table/interface';

export interface ContentDataRecord {
  x: string;
  y: number;
}

export function queryContentData() {
  return axios.get<ContentDataRecord[]>('/api/contents/week-data');
}

export interface PopularRecord {
  key: number;
  clickNumber: string;
  title: string;
  increases: number;
}

export function queryPopularList(params: { queryType: string }) {
  return axios.get<TableData[]>('/api/contents/popular-list', { params });
}

export interface PieItem {
  name: string;
  value: string;
}

export function queryCategorySum() {
  return axios.get<PieItem[]>('/api/contents/category-sum');
}
