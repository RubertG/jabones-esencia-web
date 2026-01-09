<script setup lang="ts">
interface Props {
    isOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    isOpen: false,
})

defineEmits<{
    (e: "toggle"): void
}>()
</script>

<template>
    <button
        type="button"
        class="flex w-5 flex-col items-center justify-center gap-1 cursor-pointer"
        aria-label="Abrir menú"
        :aria-expanded="props.isOpen ? 'true' : 'false'"
        :data-open="props.isOpen ? 'true' : 'false'"
        @click="$emit('toggle')"
    >
        <span
            class="h-0.5 w-full rounded-lg bg-word-900 transition-all duration-300"
            :class="{ 'translate-y-[calc(100%*3)] rotate-45 transform': props.isOpen }"
        />
        <span class="h-0.5 w-full rounded-lg bg-word-900 transition-all duration-300" :class="{ 'translate-x-2 opacity-0': props.isOpen }" />
        <span
            class="h-0.5 w-full rounded-lg bg-word-900 transition-all duration-300"
            :class="{ '-translate-y-[calc(100%*3)] -rotate-45 transform': props.isOpen }"
        />
    </button>
</template>
