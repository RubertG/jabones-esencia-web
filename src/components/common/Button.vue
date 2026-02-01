<script setup lang="ts">
import { computed } from "vue"

interface ButtonProps {
    type?: "button" | "submit" | "reset"
    disabled?: boolean
    typeStyle?: "primary" | "secondary" | "primary-outlined" | "secondary-outlined" | "foreground"
    size?: "sm" | "md" | "lg"
    href?: string
    target?: "_blank" | "_self" | "_parent" | "_top"
    class?: string
}
const props = withDefaults(defineProps<ButtonProps>(), {
    type: "button",
    disabled: false,
    typeStyle: "primary",
    size: "md",
    href: undefined,
    target: "_self",
    class: "",
})

const emit = defineEmits<{
    (e: "click", event: MouseEvent): void
}>()

const classes = computed(() => {
    const baseClasses = `${props.class} font-medium rounded-lg cursor-pointer transition-all duration-300`

    const sizeClasses = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-3.5 py-2 text-base",
        lg: "px-4 py-3 text-lg",
    }

    const hoverable = !props.disabled

    const commonTypeClasses = "flex items-center justify-center gap-2"

    const typeStyleClasses = {
        primary: `${commonTypeClasses} bg-primary-600 text-white ${hoverable ? "hover:bg-primary-700 hover:shadow-[0_0_12px_var(--color-primary-600)]" : ""} focus:ring-primary-500`,
        secondary: `${commonTypeClasses} bg-secondary-500 text-white ${hoverable ? "hover:bg-secondary-600 hover:shadow-[0_0_12px_var(--color-secondary-500)]" : ""} focus:ring-secondary-400`,
        "primary-outlined": `${commonTypeClasses} border border-primary-600 text-primary-600 ${hoverable ? "hover:bg-primary-100" : ""} focus:ring-primary-500`,
        "secondary-outlined": `${commonTypeClasses} border border-secondary-600 text-secondary-600 ${hoverable ? "hover:bg-secondary-50" : ""} focus:ring-secondary-500`,
        foreground: `${commonTypeClasses} bg-foreground-50 text-word-900 ${hoverable ? "hover:bg-primary-600 hover:text-word-50 hover:shadow-[0_0_12px_var(--color-primary-600)]" : ""} focus:ring-primary-300`,
    }

    return [
        baseClasses,
        sizeClasses[props.size || "md"],
        typeStyleClasses[props.typeStyle || "primary"],
        props.disabled ? "opacity-50 !cursor-not-allowed" : "",
    ].join(" ")
})

const handleClick = (event: MouseEvent) => {
    if (!props.disabled) {
        emit("click", event)
    }
}
</script>

<template>
    <button v-if="!props.href" :class="classes" :type="props.type" :disabled="props.disabled" :aria-disabled="props.disabled" @click="handleClick">
        <slot></slot>
    </button>
    <a v-else :href="props.disabled ? undefined : props.href" :aria-disabled="props.disabled" :class="classes" @click="handleClick" :target="props.target">
        <slot></slot>
    </a>
</template>
