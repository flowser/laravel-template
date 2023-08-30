<script lang="ts" setup>
import {useForm} from 'vee-validate';
import {useRouter} from 'vue-router';
import * as yup from 'yup';
import {useRegisterRequest} from '@/common/api/requests/useAuthenticateRequest';
import FormInput from '@/common/components/FormInput.vue';
import useUnexpectedErrorHandler from '@/common/composables/useUnexpectedErrorHandler';
import {LOGIN} from '@/common/constants/customerRouteNames';
import ValidationError from '@/common/errors/ValidationError';
import useAuthStore from '@/common/stores/auth.store';

const authStore = useAuthStore();
const handleUnexpectedError = useUnexpectedErrorHandler();
const router = useRouter();
const schema = yup.object({
    id_number: yup.string().required(),
    first: yup.string().required(),
    phone: yup.string().required(),
    last: yup.string().required(),
    email: yup.string(),
    password: yup.string().required(),
});
const {handleSubmit, setErrors, setFieldError, setFieldValue} = useForm<{
    id_number: string;
    first: string;
    last: string;
    phone: string;
    email: string;
    password: string;
}>({
    validationSchema: schema,
    initialValues: {
        id_number: '',
        password: '',
    },
});

const onSubmit = handleSubmit(async (values) => {
    try {
        await useRegisterRequest(values);
        // authStore.setUser(authenticatedUser);
        // const route = authStore.intendedRoute ?? authStore.mainRoute;
        authStore.setIntendedRoute(undefined);
        await router.push({name: LOGIN});
    } catch (err) {
        if (err instanceof ValidationError) {
            setErrors(err.messages);

        } else {
            setFieldError('id_number', 'Something went wrong.');
            handleUnexpectedError(err);
        }
    } finally {
        setFieldValue('email', '');
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
                        Sign Up
                    </h1>
                    <p class="lg:mt-12 lg:mx-12 mt-2 mx-4 w-full lg:text-lg sm:block leading-loose  lg:w-3/6">
                        Register and get started with automated county bill payments.
                    </p>
                </div>

            </div>
        </div>
        <div class="lg:w-6/12 w-full px-4 mt-12 mb-12">
            <div class="font-thin text-sm flex flex-col items-center gap-6">
                <form novalidate @submit="onSubmit"
                      class="px-4 flex flex-col w-full rounded-xl justify-evenly gap-2
                      lg:gap-2 mx-auto border border-gray-800 p-4">
                    <FormInput
                        direction="up"
                        label="First Name **"
                        name="first"
                        class="w-full text-sm  tracking-wide"
                        placeholder="Enter your First name"
                        type="text"
                    />
                    <FormInput
                        direction="up"
                        label="Last Name **"
                        name="last"
                        class="w-full text-sm  tracking-wide"
                        placeholder="Enter your Last Name"
                        type="text"
                    />
                    <FormInput
                        direction="up"
                        label="Phone Number **"
                        name="phone"
                        class="w-full text-sm  tracking-wide"
                        placeholder="Enter your Phone number"
                        type="text"
                    />
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
                        label="Email"
                        name="email"
                        class="w-full text-sm  tracking-wide"
                        placeholder="Enter your Email"
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
                    <button type="submit" class="login-button mb-1 w-full  pt-1 text-red-600 mt-6">
                        Register
                    </button>
                </form>
                <RouterLink :to="{name:LOGIN}" class="text-white underline my-12 ">
                    Already with an Account? Log In
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
