<script lang="ts" setup>
import {useForm} from 'vee-validate';
import {useRouter} from 'vue-router';
import * as yup from 'yup';
import {useLoginRequest} from '@/common/api/requests/useAuthenticateRequest';
import FormInput from '@/common/components/FormInput.vue';
import useUnexpectedErrorHandler from '@/common/composables/useUnexpectedErrorHandler';
import {DASHBOARD, FORGOT_PASSWORD} from '@/common/constants/customerRouteNames';
import ValidationError from '@/common/errors/ValidationError';
import useAuthStore from '@/common/stores/auth.store';

const authStore = useAuthStore();
const handleUnexpectedError = useUnexpectedErrorHandler();
const router = useRouter();
const schema = yup.object({
    id_number: yup.string().required(),
    password: yup.string().required(),
});
const {handleSubmit, setErrors, setFieldError, setFieldValue} = useForm<{
    id_number: string;
    password: string;
    remember: boolean;
}>({
    validationSchema: schema,
    initialValues: {
        id_number: '',
        password: '',
        remember: false,
    },
});

const onSubmit = handleSubmit(async (values) => {
    try {
        const authenticatedUser = await useLoginRequest(values);
        authStore.setUser(authenticatedUser);
        // const route = authStore.intendedRoute ?? authStore.mainRoute;
        authStore.setIntendedRoute(undefined);
        await router.push({name: DASHBOARD});
    } catch (err) {
        if (err instanceof ValidationError) {
            setErrors(err.messages);

        } else {
            setFieldError('id_number', 'Something went wrong.');
            handleUnexpectedError(err);
        }
    } finally {
        setFieldValue('password', '');
        // setFieldValue('password', '');
    }
});
</script>

<template>
    <section
        class="h-full bg-gradient-to-l from-blue-primary to-blue-veryDark flex justify-center  items-center flex-col">
        <div class="flex justify-center ">
            <div class="text-white">
                <div class="flex mx-4 mt-12 lg:mt-4 flex-col  items-center text-center">
                    <h1
                        class="font-semibold text-left lg:text-6xl md:text-5xl text-4xl lg:mt-24 mt-6
                                text-white tracking-wide" style="line-height: 4rem">
                        Sign In
                    </h1>
                    <p class="lg:mt-12 lg:mx-12 mt-2 mx-4 w-full lg:text-lg sm:block leading-loose  lg:w-3/6">
                        Please use the details that were sent to you via email. If you encounter any problems,
                        <span class="text-yellow-400 border-b border-secondary">
                            <br class="lg:hidden"> We are here for you!
                        </span>
                    </p>
                </div>

            </div>
        </div>
        <div class="lg:w-6/12 w-full px-4 mt-12 mb-12">
            <div class="font-thin text-sm flex flex-col items-center gap-6">
                <form novalidate @submit="onSubmit"
                      class="px-4 flex flex-col w-full rounded-xl justify-evenly gap-3
                      lg:gap-4 mx-auto border border-gray-800 p-4">
                    <FormInput
                        direction="up"
                        label="ID Number **"
                        name="id_number"
                        class="w-full text-sm  tracking-wide"
                        placeholder="Enter your ID number"
                        type="text"
                    />
                    <FormInput
                        direction="up"
                        label="Password **"
                        name="password"
                        class="w-full text-sm tracking-wide"
                        placeholder="*****"
                        type="password"
                    />
                    <button type="submit" class="login-button mb-1 w-full ml-1 pt-1 text-red-600 mt-6">
                        Login
                    </button>
                </form>
                <RouterLink :to="{name:FORGOT_PASSWORD}" class="text-white underline my-12 ">
                    Forgot Your Password?
                </RouterLink>
            </div>
        </div>
    </section>
</template>
<style>
.login-button {
    @apply bg-secondary text-white flex items-center justify-center font-bold;
    @apply rounded-md h-12;
    @apply uppercase;
}
</style>
