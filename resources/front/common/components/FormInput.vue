<script lang="ts" setup>
import {useField} from 'vee-validate';

interface Props {
    label: string;
    name: string;
    direction?: string;
    disabled?: boolean;
    padding?: string;
    placeholder?: string;
    type?: 'email' | 'password' | 'text' | 'number';
}

const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    placeholder: 'Enter details',
});

const {errorMessage, value} = useField(props.name);
</script>

<template>
    <div :class="['field-container', { error: !!errorMessage }]">
        <label :for="name" class="">{{label}}</label>
        <input :id="name"
               v-model="value"
               :name="name"
               :placeholder="placeholder"
               :type="type"
               :disabled="disabled"
               class="input input-accent  input-bordered w-full"
               :class="[disabled?'input-disabled':'']"
        >
        <div v-if="errorMessage" class="message">{{errorMessage}}</div>
    </div>
</template>

<style scoped>
.field-container {
    @apply flex flex-col gap-3 mt-2 items-start;
    @apply dark:text-black;

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

    .message {
        @apply text-sm;
    }

    &.error {
        input {
            @apply border-red-600 border;

            &::placeholder {
                @apply italic text-white;
            }
        }

        label {
            @apply text-yellow-600;
        }

        .message {
            @apply text-accent text-xs capitalize;
        }
    }
}
</style>
