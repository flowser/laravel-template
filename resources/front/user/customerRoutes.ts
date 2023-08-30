import {RouteRecordRaw} from 'vue-router';
import {
    CHANGE_PASSWORD,
    CONTACT_US,
    FORGOT_PASSWORD,
    LANDING,
    LOGIN,
    REGISTER,
} from '@/common/constants/customerRouteNames';
import requireGuest from '@/common/guards/requireGuest';

const customerRoutes: RouteRecordRaw[] = [
    {
        children: [
            {
                beforeEnter: requireGuest,
                component: () => import('@/user/pages/public/ForgotPassword.vue'),
                name: FORGOT_PASSWORD,
                path: 'forgot-password',
                meta: {title: 'Forgot Password'},
            },
            {
                beforeEnter: requireGuest,
                component: () => import('@/user/pages/public/ChangePassword.vue'),
                name: CHANGE_PASSWORD,
                path: 'change-password',
                meta: {title: 'Change Password'},
            },
            {
                beforeEnter: requireGuest,
                component: () => import('@/user/pages/public/Login.vue'),
                name: LOGIN,
                path: 'login',
                meta: {title: 'Login'},
            },
            {
                beforeEnter: requireGuest,
                component: () => import('@/user/pages/public/Register.vue'),
                name: REGISTER,
                path: 'register',
                meta: {title: 'Register'},
            },
            {
                beforeEnter: requireGuest,
                component: () => import('@/user/pages/public/LandingPage.vue'),
                name: LANDING,
                path: '',
                meta: {title: 'EREV Payment Solutions'},
            },
        ],
        component: () => import('@/user/CustomerRoot.vue'),
        path: '/',
    },
];

export default customerRoutes;
