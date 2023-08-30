import {RouteRecordRaw} from 'vue-router';

const commonRoutes: RouteRecordRaw[] = [
    {
        children: [],
        component: () => import('@/common/CommonRoot.vue'),
        path: '/common',
    },
];

export default commonRoutes;
