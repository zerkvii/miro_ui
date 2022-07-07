import { computed } from "vue";
import { RouteRecordRaw, RouteRecordNormalized } from "vue-router";
import usePermission from "@/hooks/permission";
import { useAppStore } from "@/store";
import appClientMenus from "@/router/appMenus";

export default function useMenuTree() {
  const permission = usePermission();
  const appStore = useAppStore();
  const appRoute = computed(() => {
    if (appStore.menuFromServer) {
      return appStore.appAsyncMenus;
    }
    return appClientMenus;
  });
  const menuTree = computed(() => {
    const copyRouter = JSON.parse(JSON.stringify(appRoute.value));
    copyRouter.sort((a: RouteRecordNormalized, b: RouteRecordNormalized) => {
      return (a.meta.order || 0) - (b.meta.order || 0);
    });

    function travel(_routes: RouteRecordRaw[]) {
      // if (!_routes) return null;

      // const collector: any = _routes.map((element) => {
      _routes.map((element) => {
        // no access
        if (!permission.accessRouter(element)) {
          return null;
        }

        // @ts-ignore
        if (element.children_ids) {

          // @ts-ignore
          const childrenIds = element.children_ids.split(",").map(Number);
          // eslint-disable-next-line camelcase
          childrenIds.forEach((id: number) => {
            const child = copyRouter.find((el: RouteRecordNormalized) => {
              // @ts-ignore
              return el.id === id;
            });
            if (element.children) {
              element.children.push(child);
            } else {
              element.children = [];
              element.children.push(child);
            }
          });
        }
        // preset children or leaf node hide all children
        if (element.meta?.hideChildrenInMenu || !element.children) {
          element.children = [];
          return element;
        }

        // route filter child hideInMenu true
        element.children = element.children.filter(
          (x) => x.meta?.hideInMenu !== true
        );

        // Associated child node
        // const subItem = travel(element.children, layer + 1);
        //
        // if (subItem.length) {
        //   element.children = subItem;
        //   return element;
        // }
        // // the else logic
        // if (layer > 1) {
        //   element.children = subItem;
        //   return element;
        // }

        // current child is submenu
        if (element.meta?.hideInMenu === false) {
          return element;
        }
        return null;
      });
      return copyRouter.filter(Boolean);
    }

    travel(copyRouter);
    return copyRouter.filter((e: any) => e.level === 1);
    // copyRouter.filter(e => e.level === 1);
    // copyRouter.sort((a: RouteRecordNormalized, b: RouteRecordNormalized) => {
    //   return (a.id || 0) - (b.id || 0);
    // });
  });
  return {
    menuTree
  };
}
