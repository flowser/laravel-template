import Notifications from '@kyvg/vue3-notification';
import {VueQueryPlugin} from '@tanstack/vue-query';
import {createPinia} from 'pinia';
import {createApp} from 'vue';
import queryClient from '@/queryClient';
import router from '@/router';
import Root from "@/Root.vue";

import('preline');
const pinia = createPinia();
const app = createApp(Root)
    .use(pinia)
    .use(Notifications)
    .use(VueQueryPlugin, {queryClient})
    .use(router);
app.mount('#app');
