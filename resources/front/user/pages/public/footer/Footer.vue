<template>
    <section class="footer">
        <div class="image-container">
            <img src="@assets/images/logo.svg" alt="Logo">
        </div>
        <div class="text-section">
            <div class="mb-6 mt-6 lg:px-12 px-4 text-left lg:order-1 order-3">
                <p class="text-sm text-white">&copy; {{new Date().getFullYear()}} Template<sup>&reg;</sup> . All rights
                    reserved</p>
            </div>
            <div class="mb-6 lg:mt-6 lg:px-12 px-4 text-left items-center lg:order-2">
                <div class="flex flex-between gap-6 lg:mt-0 mt-4">
                    <a target="_blank" href=""
                       class="border-b border-blue-400 lg:border-b-2  text-sm">Privacy
                        Policy</a>
                    <a target="_blank" href=""
                       class="border-b border-blue-400 lg:border-b-2 text-sm">Terms of
                        Service</a>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang='ts' setup>
</script>

<style scoped>
.footer {
    @apply flex flex-col bottom-0 flex-1;
    @apply text-white;

    .image-container {
        @apply flex flex-col justify-center items-center;

        img {
            @apply w-8 mt-6;
        }
    }
    .text-section{
        @apply flex flex-col lg:flex-row  justify-between items-center;
    }
}
</style>
