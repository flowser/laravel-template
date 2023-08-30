<template>
    <h3 class="my-3 text-gray-900 dark:text-white text-xs leading-none font-normal">{{ title }}</h3>
    <ul
        class="items-center w-full text-sm font-medium text-gray-900
        bg-white border border-gray-200 rounded-lg lg:flex dark:bg-gray-710 dark:border-gray-600 dark:text-black">
        <li class="flex-grow border-b border-gray-200 lg:border-b-0 lg:border-r dark:border-gray-600"
            v-for="(option,i) in
                options" :key="i">
            <div class="flex items-center pl-3">
                <input id="horizontal-list-radio-license" v-model="value" type="radio" :value="option.value"
                       :name="name"
                       class="w-5 h-5 text-secondary bg-gray-100
                       border-gray-300 focus:ring-secondary
                       dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700
                       focus:ring-2 dark:bg-white dark:border-gray-500">
                <label for="horizontal-list-radio-license"
                       class="w-full py-4 ml-4 text-sm font-medium text-gray-900 dark:text-black">{{
                           option.name
                       }} </label>
            </div>
        </li>
        <div v-if="errorMessage" class="message">{{ errorMessage }}</div>
    </ul>
</template>

<script lang='ts' setup>

import {useField} from 'vee-validate';

type optionsType = {
    name: string,
    value: string
}

interface Props {
    title: string;
    name: string;
    options: optionsType[];
}

const props = withDefaults(defineProps<Props>(), {
    title: 'Select an option',
});
const {errorMessage, value} = useField(props.name);

</script>

<style scoped>


</style>
