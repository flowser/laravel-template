import {defineStore} from 'pinia';
import {computed, ref} from 'vue';
import {RouteLocationNormalized} from 'vue-router';
import useCurrentAuthRequest from '@/common/api/requests/useCurrentAuthRequest';
import {LOGIN} from '@/common/constants/customerRouteNames';
// import {STAFF_MAIN} from '@/common/constants/staffRouteNames';
import {Citizen} from '@/common/parsers/citizenParser';
import {Permission} from '@/common/parsers/permissionParser';
import {AuthenticatedUser} from '@/common/parsers/userParser';
import {isError} from '@/common/utilities/isError';

const useAuthStore = defineStore('auth', () => {
    const checkController = ref<AbortController>();
    const initialized = ref(false);
    const intendedRoute = ref<RouteLocationNormalized>();
    const user = ref<AuthenticatedUser | Citizen>();
    const isAuthenticated = computed(() => !!user.value);
    const mainRoute = computed(() => {
        //Todo:// redirect by role first then by permissions
        // if (hasPermission('view staff dashboard')) {
        //     return {name: STAFF_MAIN};
        // }

        return {name: LOGIN};
    });

    function setUser(newUser?: AuthenticatedUser | Citizen) {
        user.value = newUser;
    }

    async function check() {
        checkController.value?.abort();
        checkController.value = new AbortController();

        try {
            const currentUser = await useCurrentAuthRequest({
                signal: checkController.value?.signal,
            });
            setUser(currentUser);
        } catch (err) {
            if (!isError(err, 'AbortError')) {
                setUser(undefined);
            }
        }
    }

    function hasPermission(permission: Permission): boolean {
        return user.value?.role === 'Super Admin' || !!user.value?.permissions?.includes(permission);
    }

    function hasAllPermissions(permissions: Permission[]): boolean {
        return permissions.every(permission => hasPermission(permission));
    }

    async function initialize() {
        if (initialized.value) {
            return;
        }

        await check();

        initialized.value = true;
    }

    return {
        hasAllPermissions,
        hasPermission,
        initialize,
        intendedRoute,
        isAuthenticated,
        mainRoute,
        setIntendedRoute: (route?: RouteLocationNormalized) => {
            intendedRoute.value = route;
        },
        setUser,
        user,
    };
});

export default useAuthStore;
