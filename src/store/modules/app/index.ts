import { defineStore } from 'pinia';
import { Notification } from '@arco-design/web-vue';
import type { NotificationReturn } from '@arco-design/web-vue/es/notification/interface';
import type { RouteRecordNormalized } from 'vue-router';
import defaultSettings from '@/config/settings.json';
import { getMenuList } from '@/views/auth/api/user';
import { computed } from 'vue';
import { AppState } from './types';

const useAppStore = defineStore('app', {
  state: (): AppState => ({ ...defaultSettings }),

  getters: {
    appCurrentSetting(state: AppState): AppState {
      return { ...state };
    },
    appDevice(state: AppState) {
      return state.device;
    },
    appAsyncMenus(state: AppState): RouteRecordNormalized[] {
      return state.serverMenu as unknown as RouteRecordNormalized[];
    },
  },

  actions: {
    // Update app settings
    updateSettings(partial: Partial<AppState>) {
      // @ts-ignore
      this.$patch(partial);
    },

    // Change theme color
    toggleTheme(dark: boolean) {
      if (dark) {
        this.theme = 'dark';
        document.body.setAttribute('arco-theme', 'dark');
      } else {
        this.theme = 'light';
        document.body.removeAttribute('arco-theme');
      }
    },
    toggleDevice(device: string) {
      this.device = device;
    },
    toggleMenu(value: boolean) {
      this.hideMenu = value;
    },
    async fetchServerMenuConfig() {
      let notifyInstance: NotificationReturn | null = null;
      try {
        notifyInstance = Notification.info({
          id: 'menuNotice', // Keep the instance id the same
          content: 'loading',
          closable: true,
        });
        const { data } = await getMenuList();
        // const data={}
        // let retList=[];
        // conserved set
        const menuTree = computed(() => {
          const copyRouter = JSON.parse(JSON.stringify(data));

          function travel(_routes: any[], layer: number) {
            if (!_routes) return null;
            const collector: any = _routes.map((element) => {
              if (element.level === layer) {
                const childrenIds = element.children_ids
                  ?.split(',')
                  .map(Number);
                if (childrenIds.length > 0) {
                  element.children = copyRouter.filter((x: any) =>
                    childrenIds.includes(x.id)
                  );
                  travel(element.children, layer + 1);
                }
                return element;
              }
              return null;
            });
            return collector.filter(Boolean);
          }

          return travel(data, 1);
        });
        const whiteList = [
          'index',
          'auth',
          'Error',
          'Info',
          'Success',
          '403',
          '404',
          '500',
          'exception',
        ];
        // console.log("menuTree before", menuTree.value);
        this.serverMenu = menuTree.value.filter(
          (element: any) => !whiteList.includes(element.name)
        );
        // @ts-ignore
        // eslint-disable-next-line no-console
        console.log(this.serverMenu);

        // @ts-ignore
        // this.$patch({ "serverMenu": data });
        notifyInstance = Notification.success({
          id: 'menuNotice',
          content: 'success',
          closable: true,
        });
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        notifyInstance = Notification.error({
          id: 'menuNotice',
          content: 'error',
          closable: true,
        });
      }
    },
    clearServerMenu() {
      this.serverMenu = [];
    },
  },
});

export default useAppStore;
