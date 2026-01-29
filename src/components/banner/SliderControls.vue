<template>
  <div>
    <!-- Slider controls go here -->
  </div>
</template>

<script setup lang="ts">
interface Props {
  totalSlides: number
  currentSlide: number
}

defineProps<Props>()

const emit = defineEmits<{
  next: []
  prev: []
  goToSlide: [index: number]
}>()
</script>

<style scoped>
</style>
