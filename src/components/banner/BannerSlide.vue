<template>
    <article class="relative flex h-full w-full items-center justify-center overflow-hidden px-4">
        <!-- Fondo con imagen animada -->
        <Transition name="banner-image" mode="in-out">
            <img
                :key="slide.image"
                :src="slide.image"
                :alt="`${slide.title} imagen - Jabones Esencia Serena`"
                class="absolute top-0 left-0 h-full w-full object-cover brightness-95"
            />
        </Transition>

        <!-- Contenido animado de izquierda a derecha -->
        <Transition name="banner-content" mode="out-in">
            <div
                :key="slide.title"
                class="bg-foreground-50/75 -mt-4 flex w-full max-w-2xl flex-col items-center justify-center rounded-xl px-4 py-6 backdrop-blur-[2px] md:px-14 md:py-12"
            >
                <h2 class="text-secondary-800 text-center text-2xl font-extrabold tracking-wide uppercase md:text-3xl">
                    {{ slide.title }}
                </h2>
                <p class="text-word-900 mt-2 text-center text-base md:text-lg">
                    {{ slide.description }}
                </p>

                <Button v-if="slide.textButton && slide.route" :href="slide.route" class="mt-5" type-style="secondary">
                    {{ slide.textButton }}
                </Button>
            </div>
        </Transition>
    </article>
</template>

<script setup lang="ts">
import type { SlideBanner } from "@/types/banner"
import Button from "@components/common/Button.vue"

interface Props {
    slide: SlideBanner
    transitionDuration?: number
}

const props = withDefaults(defineProps<Props>(), {
    transitionDuration: 500,
})
</script>

<style scoped>
/* Image fade animation */
.banner-image-enter-active,
.banner-image-leave-active {
    transition: opacity v-bind("props.transitionDuration + 'ms'") ease-in-out;
}

.banner-image-enter-from,
.banner-image-leave-to {
    opacity: 0;
}

/* Content animation */
.banner-content-enter-active,
.banner-content-leave-active {
    transition: all v-bind("(props.transitionDuration - 100) + 'ms'") ease;
}

.banner-content-enter-from {
    opacity: 0;
    transform: translateX(30px);
}

.banner-content-leave-to {
    opacity: 0;
    transform: translateX(-30px);
}
</style>
