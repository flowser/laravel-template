import {createRouter, createWebHistory} from 'vue-router';
import customerRoutes from '@/user/customerRoutes';
import commonRoutes from '@/common/commonRoutes';
import useAuthStore from '@/common/stores/auth.store';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...customerRoutes,
        ...commonRoutes,
    ],
});

router.beforeEach(async () => {
    const authStore = useAuthStore();

    await authStore.initialize();
});

export default router;
