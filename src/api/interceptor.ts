import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Message, Modal } from '@arco-design/web-vue';
import { useUserStore } from '@/store';
import { clearToken, getToken } from '@/utils/auth';

export interface HttpResponse<T = unknown> {
  detail: any;
  info: string;
  status: number;
  data: T;
}

if (import.meta.env.VITE_API_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
}

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // let each request carry token
    // this example using the JWT token
    // Authorization is a custom headers key
    // please modify it according to the actual situation
    const token = getToken();
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // do something
    return Promise.reject(error);
  }
);
// add response interceptors
axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    const res = response.data;
    // if the custom code is not 20000, it is judged as an error.
    if (res.status !== 20000) {
      Message.error({
        content: res.info || res.detail.info || 'Error',
        duration: 5 * 1000,
      });
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (
        [50000, 50008, 50012, 50014].includes(res.status) &&
        response.config.url !== '/api/user/info'
      ) {
        Modal.error({
          title: 'Confirm logout',
          content:
            'You have been logged out, you can cancel to stay on this page, or log in again',
          okText: 'Re-Login',
          async onOk() {
            const userStore = useUserStore();

            await userStore.logout();

            window.location.href = '/auth';
          },
        });
      }

      if (res.detail.status === 403) {
        clearToken();
      }

      return Promise.reject(new Error(res.info || 'Error'));
    }
    return res;
  },
  (error) => {
    Message.error({
      content: error.msg || error.response.data.detail || 'Request Error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);
