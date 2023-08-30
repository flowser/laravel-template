<template>
    <RouterLink
            v-for="item in links"
            :to="item.to"
            exact
            :class="['nav-link', linkClass,item.name=='Sign Up'?'login':'']"
            :key="item.name"
    >
        {{item.name}}
    </RouterLink>
</template>

<script lang="ts" setup>
defineProps<{
    linkClass?: string;
    links: RouterLinkProps[];
}>();

type RouterLinkProps = {
    name: string;
    to: string;
};

</script>

<style scoped>

.nav-link {
    @apply float-left clear-both;
    @apply block py-1.5 font-medium lg:text-left text-center;
    @apply lg:mx-4 mb-1;
    @apply uppercase;

    @apply hover:text-secondary uppercase;
}

.router-link-exact-active {
    @apply lg:border-b-4  border-secondary;
}

.mobile-link {
    @apply lg:hidden block mx-4;
}


</style>
