<script lang="ts" setup>
import {onErrorCaptured, ref} from 'vue';
import App from '@/App.vue';
// import ForbiddenError from '@/common/errors/ForbiddenError';
// import ForbiddenErrorPage from '@/common/pages/ForbiddenErrorPage.vue';
import GenericErrorPage from '@/common/pages/GenericErrorPage.vue';
import SuspensefulErrorBoundary from "@/common/components/SuspensefulErrorBoundary.vue";
import LoadingComponent from "@/common/components/LoadingComponent.vue";
// import {Permission} from '@/common/parsers/permissionParser';
// import {isErrorClass} from '@/common/utilities/isError';

const errorEncountered = ref<Error>();

onErrorCaptured((err) => {
    errorEncountered.value = err;
    console.error(err);

    return false;
});
</script>

<template>
    <SuspensefulErrorBoundary>
        <template #default>
            <App/>
            <notifications position="top right"/>
        </template>
        <template #fallback>
            <LoadingComponent/>
        </template>
        <template #error="{error}">
            <!--            <ForbiddenErrorPage-->
            <!--                v-if="isErrorClass(error, ForbiddenError)"-->
            <!--                :permissions="error.permissions as Permission[]"-->
            <!--            />-->
            <GenericErrorPage
                    :error="error"
            />
        </template>
    </SuspensefulErrorBoundary>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Titillium+Web:wght@200;300;400;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
    * {
        font-family: "Titillium Web", sans-serif;
        @apply font-light;
    }

    html, body, #app {
        @apply h-full;
        @apply bg-black/50;
    }

    #app {
        @apply flex flex-col;
    }

    a, button {
        @apply outline-0;

        @apply focus-visible:ring-4 focus-visible:ring-blue-800/50;
    }
}

.login-button {
    @apply bg-secondary text-white flex items-center justify-center font-bold;
    @apply rounded-md h-12;
    @apply uppercase;
}
</style>
