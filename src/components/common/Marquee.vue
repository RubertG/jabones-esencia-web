<template>
    <div
        ref="marqueeWrapper"
        class="marquee-wrapper relative w-full overflow-hidden"
        :class="{ 'pause-on-hover': pauseOnHover }"
        :style="{ '--duration': duration + 's', '--gap': gap + 'px' }"
    >
        <div
            ref="marqueeTrack"
            class="marquee-track inline-flex items-center whitespace-nowrap"
            :class="direction === 'right' ? 'animate-marquee-right' : 'animate-marquee-left'"
            :style="marqueeStyle"
        >
            <div v-for="i in duplicateCount" :key="i" class="marquee-content inline-flex items-center" :style="{ gap: gap + 'px', marginRight: gap + 'px' }">
                <slot />
                <slot name="separator" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from "vue"

interface Props {
    duration?: number
    direction?: "left" | "right"
    pauseOnHover?: boolean
    gap?: number
}

const props = withDefaults(defineProps<Props>(), {
    duration: 20,
    direction: "left",
    pauseOnHover: false,
    gap: 32,
})

const marqueeWrapper = ref<HTMLElement | null>(null)
const marqueeTrack = ref<HTMLElement | null>(null)
const duplicateCount = ref(2)
const animationDistance = ref("50%")

const marqueeStyle = computed(() => ({
    animationDuration: `${props.duration}s`,
    "--animation-distance": animationDistance.value,
}))

onMounted(async () => {
    await nextTick()

    if (!marqueeWrapper.value || !marqueeTrack.value) return

    const wrapperWidth = marqueeWrapper.value.offsetWidth
    const trackWidth = marqueeTrack.value.offsetWidth / duplicateCount.value

    // Calculate how many copies we need to fill the viewport + one extra
    const copiesNeeded = Math.ceil(wrapperWidth / trackWidth) + 2
    duplicateCount.value = Math.max(copiesNeeded, 2)

    await nextTick()

    // Animation should move exactly one copy's width
    animationDistance.value = `${100 / duplicateCount.value}%`
})
</script>

<style scoped>
.marquee-wrapper {
    --duration: 20s;
    --gap: 32px;
}

.marquee-track {
    will-change: transform;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    perspective: 1000px;
}

.marquee-content {
    flex-shrink: 0;
}

@keyframes marquee-left {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(calc(-1 * var(--animation-distance)));
    }
}

@keyframes marquee-right {
    0% {
        transform: translateX(calc(-1 * var(--animation-distance)));
    }
    100% {
        transform: translateX(0);
    }
}

.animate-marquee-left {
    animation: marquee-left var(--duration) linear infinite;
}

.animate-marquee-right {
    animation: marquee-right var(--duration) linear infinite;
}

.pause-on-hover:hover .marquee-track {
    animation-play-state: paused;
}
</style>
