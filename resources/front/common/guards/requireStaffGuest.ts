import {NavigationGuard} from 'vue-router';
import {STAFF_MAIN} from '@/common/constants/staffRouteNames';
import useAuthStore from '@/common/stores/auth.store';

const requireStaffGuest: NavigationGuard = () => {
    const authStore = useAuthStore();

    if (authStore.isAuthenticated) {
        return {name: STAFF_MAIN};
    }
};

export default requireStaffGuest;
