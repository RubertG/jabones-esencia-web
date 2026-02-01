<script setup lang="ts">
import type { SlideBanner } from "@/types/banner"
import BannerSlide from "./BannerSlide.vue"
import SliderControls from "./SliderControls.vue"
import { onMounted, onBeforeUnmount, ref, computed } from "vue"

interface Props {
    slides: SlideBanner[]
    timePerSlide?: number
    transitionDuration?: number
}

const props = withDefaults(defineProps<Props>(), {
    timePerSlide: 6000,
    transitionDuration: 500,
})

const currentSlide = ref<SlideBanner>(props.slides[0])
let intervalId: number | null = null
const currentIndex = computed(() => props.slides.findIndex((slide) => slide.title === currentSlide.value.title))

const startInterval = () => {
    if (intervalId !== null) clearInterval(intervalId)

    intervalId = window.setInterval(() => {
        next()
    }, props.timePerSlide)
}

const stopInterval = () => {
    if (intervalId !== null) {
        clearInterval(intervalId)
        intervalId = null
    }
}

const restartInterval = () => {
    stopInterval()
    startInterval()
}

const next = () => {
    const idx = props.slides.findIndex((slide) => slide.title === currentSlide.value.title)
    const nextIndex = (idx + 1) % props.slides.length
    currentSlide.value = props.slides[nextIndex]
}

const prev = () => {
    const idx = props.slides.findIndex((slide) => slide.title === currentSlide.value.title)
    const prevIndex = (idx - 1 + props.slides.length) % props.slides.length
    currentSlide.value = props.slides[prevIndex]
}

const handleNext = () => {
    next()
    restartInterval()
}

const handlePrev = () => {
    prev()
    restartInterval()
}

const goToSlide = (index: number) => {
    if (index >= 0 && index < props.slides.length) {
        currentSlide.value = props.slides[index]
        restartInterval()
    }
}

onMounted(() => {
    startInterval()
})

onBeforeUnmount(() => {
    stopInterval()
})
</script>

<template>
    <section class="grid-[auto_1fr] relative grid h-[55vh] max-h-150 w-full overflow-hidden md:h-[75vh]">
        <BannerSlide :slide="currentSlide" :transitionDuration="props.transitionDuration" />

        <SliderControls
            :totalSlides="props.slides.length"
            :currentSlide="currentIndex"
            :timePerSlide="props.timePerSlide"
            @next="handleNext"
            @prev="handlePrev"
            @goToSlide="goToSlide"
        />
    </section>
</template>
