<script setup lang="ts">
import type { SlideBanner } from "@/types/banner"
import BannerSlide from "./BannerSlide.vue"
import SliderControls from "./SliderControls.vue"

interface Props {
    slides: SlideBanner[]
}

defineProps<Props>()
</script>

<template>
    <section class="w-full h-[80vh] max-h-130 overflow-hidden">
        <BannerSlide v-for="(slide, index) in slides" :key="index" :slide="slide" />

        <!-- <SliderControls
            :totalSlides="slides.length"
            :currentSlide="0"
            @next="$emit('next')"
            @prev="$emit('prev')"
            @goToSlide="$emit('goToSlide', $event)"
        /> -->
    </section>
</template>
