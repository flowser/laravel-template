<script setup lang="ts">
import Footer from '@/user/pages/public/footer/Footer.vue';
import Navigation from '@/user/pages/public/header/Navigation.vue';

const customerMenuItems = [
    {
        name: 'Home',
        to: '/',
    },
    {
        name: 'Sign In',
        to: '/login',
    },
    {
        name: 'Sign up',
        to: '/register',
    },
];
</script>

<template>
    <Navigation :links="customerMenuItems"/>
    <RouterView/>
    <Footer :links="customerMenuItems"/>
</template>
