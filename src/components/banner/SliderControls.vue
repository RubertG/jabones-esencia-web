<template>
    <div class="absolute right-1/2 bottom-4 z-10 flex translate-x-1/2 transform items-center gap-0.5 md:right-14 md:bottom-6 md:gap-1">
        <button
            v-for="(_, index) in totalSlides"
            :key="index"
            @click="handleClick(index)"
            class="relative flex cursor-pointer items-center justify-center"
            :aria-label="`Ir al slide ${index + 1}`"
        >
            <svg class="h-5.5 w-5.5" viewBox="0 0 16 16">
                <!-- Base circle -->
                <circle
                    cx="8"
                    cy="8"
                    r="3"
                    :fill="index === currentSlide ? 'currentColor' : 'rgba(255,255,255,0.4)'"
                    class="text-foreground-50 transition-colors"
                />

                <!-- Progress (only active) -->
                <circle
                    v-if="index === currentSlide"
                    :key="`${currentSlide}-${progressKey}`"
                    cx="8"
                    cy="8"
                    r="5.25"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    :stroke-dasharray="circumference"
                    :stroke-dashoffset="circumference"
                    class="text-foreground-50 progress-circle"
                    :style="{ animationDuration: `${timePerSlide}ms` }"
                />
            </svg>
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"

interface Props {
    totalSlides: number
    currentSlide: number
    timePerSlide?: number
}

const props = withDefaults(defineProps<Props>(), {
    timePerSlide: 3000,
})

const emit = defineEmits<{
    next: []
    prev: []
    goToSlide: [index: number]
}>()

const radius = 5.25
const circumference = 2 * Math.PI * radius

const progressKey = ref(0)

watch(
    () => props.currentSlide,
    () => {
        progressKey.value++
    }
)

const handleClick = (index: number) => {
    emit("goToSlide", index)

    if (index === props.currentSlide) {
        progressKey.value++
    }
}
</script>

<style scoped>
@keyframes progress {
    from {
        stroke-dashoffset: var(--circumference);
    }
    to {
        stroke-dashoffset: 0;
    }
}

.progress-circle {
    --circumference: 33;
    transform-origin: center;
    transform: rotate(-90deg);
    animation-name: progress;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
}
</style>
