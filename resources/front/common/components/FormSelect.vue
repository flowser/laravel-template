<script lang="ts" setup>
import 'vue-search-select/dist/VueSearchSelect.css';
import {useField} from 'vee-validate';
import {ModelListSelect} from 'vue-search-select';

interface SelectItem {
    name: string,
    value: string | boolean
}

interface Props {
    label: string;
    name: string;
    options: SelectItem[];
    direction?: string;
    padding?: string;
    height?: string;
    crud?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    direction: 'right',
    crud: false,
});

const {errorMessage, value} = useField(props.name);
const emit = defineEmits(['addNew', 'selectedItem']);
const codeAndNameAndDesc = (item: SelectItem) => {
    return item.name.split('').slice(0, 200).join('');
};
</script>

<template>
    <div :class="['field-container', { error: !!errorMessage }]">
        <label :for="name" class="">{{label}}</label>
        <model-list-select
            :list="options"
            v-model="value"
            :name="name"
            :id="name"
            option-value="value"
            class="select select-accent bg-base-10 "
            :class="[height]"
            :custom-text="codeAndNameAndDesc"
            @update:modelValue="emit('selectedItem',value)"
            :placeholder="label">
        </model-list-select>

        <button class="btn btn-xs" v-if="crud" @click.prevent="emit('addNew')">Add New</button>
        <div v-if="errorMessage" class="message">{{errorMessage}}</div>
    </div>
</template>

<style scoped>
.ui.selection.dropdown {
    @apply bg-base-100;
    @apply border border-blue-400;
    @apply hover:border hover:border-blue-300;
    @apply flex items-center;
    @apply hover:ring-2 hover:ring-blue-500/50;
    @apply dark:text-white text-white;

    i {
        @apply flex items-center justify-center;
        @apply dark:text-white text-white;
    }
}

.field-container {
    @apply flex flex-col gap-3 mt-2 items-start;

    label {
        @apply leading-none font-normal text-sm;
        @apply dark:text-white text-white;
    }

    input {
        @apply flex flex-col gap-1 self-stretch;
        @apply rounded-md;
        @apply dark:text-white text-white;

        @apply hover:ring-2 hover:ring-white/50;

        &::placeholder {
            @apply italic text-alt text-sm;
        }

        &:focus-within {
            @apply ring ring-4 ring-white/50;
        }
    }

    select {
        @apply flex flex-col gap-2 self-stretch;
        @apply rounded-md;
        @apply h-14;

        @apply hover:ring-2 hover:ring-blue-500/50;

        &:focus-within {
            @apply ring ring-4 ring-blue-500/50;
        }
    }

    .message {
        @apply text-sm;
    }

    &.error {
        .select {
            @apply border-red-600 border;

            &::placeholder {
                @apply italic;
            }
        }

        label {
            @apply text-error;
        }

        .message {
            @apply text-error text-xs capitalize;
        }
    }
}
</style>
