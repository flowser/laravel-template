import {NavigationGuard} from 'vue-router';
import {STAFF_LOGIN} from '@/common/constants/staffRouteNames';
import useAuthStore from '@/common/stores/auth.store';

const requireAuthentication: NavigationGuard = (to) => {
    const authStore = useAuthStore();
    if (!authStore.isAuthenticated) {
        authStore.setIntendedRoute(to);

        // return {name: STAFF_MAIN};
        return {name: STAFF_LOGIN};
    }
    // if (authStore.isAuthenticated) {
    //     authStore.setIntendedRoute(to);
    //
    //     return {name: STAFF_MAIN};
    //     // return {name: STAFF_LOGIN};
    // }
};

export default requireAuthentication;
