<template>
    <article class="relative w-full h-full">
        <img :src="slide.image" :alt="`${slide.title} imagen - Jabones Esencia Serena`" class="absolute top-0 left-0 w-full h-full object-cover" />
    </article>
</template>

<script setup lang="ts">
import type { SlideBanner } from "@/types/banner"

interface Props {
    slide: SlideBanner
}

defineProps<Props>()
</script>

<style scoped></style>
