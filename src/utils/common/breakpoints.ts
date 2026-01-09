import { computed, ref } from "vue"

// Breakpoint values matching Tailwind defaults
const breakpoints = {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
} as const

// Reactive window width
const windowWidth = ref(0)

// Initialize on client side
if (typeof window !== "undefined") {
    windowWidth.value = window.innerWidth

    const handleResize = () => {
        windowWidth.value = window.innerWidth
    }

    window.addEventListener("resize", handleResize)
}

// And Up breakpoints
export const xsAndUp = computed(() => windowWidth.value >= breakpoints.xs)
export const smAndUp = computed(() => windowWidth.value >= breakpoints.sm)
export const mdAndUp = computed(() => windowWidth.value >= breakpoints.md)
export const lgAndUp = computed(() => windowWidth.value >= breakpoints.lg)

// And Down breakpoints
export const xsAndDown = computed(() => windowWidth.value < breakpoints.sm)
export const smAndDown = computed(() => windowWidth.value < breakpoints.md)
export const mdAndDown = computed(() => windowWidth.value < breakpoints.lg)
export const lgAndDown = computed(() => windowWidth.value < breakpoints.xl)
