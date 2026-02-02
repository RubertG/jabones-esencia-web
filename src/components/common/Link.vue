<script setup lang="ts">
import { ExternalLink } from "lucide-vue-next"
import { computed, useAttrs } from "vue"

interface Props {
    href: string
    target?: "_blank" | "_self" | "_parent" | "_top"
    type?: "primary" | "secondary" | "colorless"
    version?: "light" | "dark"
    decorationClass?: string
    class?: string
    withIcon?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    target: "_self",
    type: "primary",
    version: "dark",
})

const attrs = useAttrs()

const classes = {
    primary: {
        decoration: {
            dark: "bg-primary-900",
            light: "bg-primary-400",
        },
        text: {
            dark: "text-primary-900",
            light: "text-primary-400",
        },
    },
    secondary: {
        decoration: {
            dark: "bg-secondary-500",
            light: "bg-secondary-50",
        },
        text: {
            dark: "text-secondary-500",
            light: "text-secondary-50",
        },
    },
} as const

const textClass = computed(() => (props.type !== "colorless" ? classes[props.type].text[props.version] : ""))
const decorationClass = computed(() => (props.type !== "colorless" ? classes[props.type].decoration[props.version] : ""))

const anchorClass = computed(() => [textClass.value, "inline-flex relative group justify-center items-center gap-1.5", (props.class ?? "")].filter(Boolean).join(" "))

const decoClass = computed(() =>
    [decorationClass.value, "absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all rounded-full duration-300", props.decorationClass ?? ""]
        .filter(Boolean)
        .join(" ")
)

const rel = computed(() => (props.target === "_blank" ? "noopener noreferrer" : undefined))
</script>

<template>
    <a :href="props.href" :target="props.target" :rel="rel" :class="anchorClass">
        <slot />
        <ExternalLink v-if="props.withIcon" class="h-3 w-3" />
        <span :class="decoClass"></span>
    </a>
</template>
