<template>
    <div class="landing">
        <div class="hero">
            <h1 class="title">Cool</h1>
        </div>
    </div>
</template>
<script setup lang="ts">
</script>
<style scoped>
.landing {
    @apply bg-white px-12 h-screen;

    .hero {
        @apply flex flex-col justify-center items-center;

        .title {
            @apply font-semibold text-5xl my-6 w-11/12 text-center tracking-wide;
        }
    }
}
</style>
