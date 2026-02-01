<script setup lang="ts">
import { ref } from "vue"
import NavButton from "./NavButton.vue"
import Brand from "@assets/brand-esencia-serena.webp"
import Link from "@components/common/Link.vue"
import { ShoppingCart } from "lucide-vue-next"
import { mdAndUp } from "@/utils/common/breakpoints"
import NavContentMobile from "./NavContentMobile.vue"

interface Props {
    pathName: string
}

defineProps<Props>()

const isOpen = ref(false)

const toggleNav = () => {
    isOpen.value = !isOpen.value
}

const links = [
    { name: "Inicio", href: "/" },
    { name: "Productos", href: "/productos" },
    { name: "Historia", href: "/historia" },
]
</script>

<template>
    <nav v-bind="$attrs" class="border-primary-200 w-full border-b py-4">
        <div class="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-3 md:gap-14 2xl:px-0">
            <!-- Cart -->
            <ShoppingCart class="text-word-900 h-5 w-5 md:hidden" />

            <!-- Brand -->
            <a href="/" class="shrink-0 grow-0">
                <img :src="Brand.src" alt="Jabones Esencia Serena Brand" class="h-8 w-auto" />
            </a>

            <!-- open/close button -->
            <div class="flex items-center justify-center gap-4 md:hidden">
                <NavButton :isOpen="isOpen" @toggle="toggleNav" />
            </div>

            <!-- Links pc -->
            <ul class="hidden w-full justify-end gap-6 md:flex">
                <li v-for="link in links" :key="link.name">
                    <Link
                        :type="link.href !== pathName ? 'colorless' : 'primary'"
                        :decoration-class="link.href !== pathName ? 'bg-word-800' : ''"
                        :href="link.href"
                        class="font-semibold tracking-wide uppercase"
                        :class="link.href !== pathName ? 'text-word-800' : ''"
                    >
                        {{ link.name }}
                    </Link>
                </li>
            </ul>

            <!-- Cart pc -->
            <ShoppingCart class="text-word-900 hidden h-5 w-5 shrink-0 grow-0 cursor-pointer transition-transform duration-300 hover:scale-125 md:block" />
        </div>
    </nav>

    <!-- Background overlay -->
    <Transition name="fade">
        <div v-show="isOpen && !mdAndUp" class="fixed top-0 right-0 z-10 h-dvh w-full bg-black/50 backdrop-blur-[2px]" @click="toggleNav"></div>
    </Transition>

    <!-- Mobile nav -->
    <NavContentMobile v-show="!mdAndUp" :is-open="isOpen" @close="toggleNav" :links="links" />
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}
</style>
