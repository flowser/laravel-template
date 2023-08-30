import {NavigationGuard} from 'vue-router';
import {DASHBOARD} from '@/common/constants/customerRouteNames';
import useAuthStore from '@/common/stores/auth.store';

const requireGuest: NavigationGuard = () => {
    const authStore = useAuthStore();

    if (authStore.isAuthenticated && authStore.user?.role === 'citizen') {
        return {name: DASHBOARD};
    }
};

export default requireGuest;
