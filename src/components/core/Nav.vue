<script setup lang="ts">
import { ref } from "vue"
import NavButton from "./NavButton.vue"
import Brand from "@assets/brand-esencia-serena.webp"
import Link from "@components/common/Link.vue"
import { Headset, ShoppingCart, X } from "lucide-vue-next"
import { mdAndUp } from "@/utils/common/breakpoints"
import Button from "@components/common/Button.vue"
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
    <nav v-bind="$attrs" class="bg-primary-100 w-full py-2.5">
        <div class="pl-3 pr-4 2xl:px-0 gap-4 w-full md:gap-14 max-w-7xl mx-auto flex items-center justify-between">
            <!-- Cart -->
            <ShoppingCart v-if="!mdAndUp" class="h-6 w-6 text-word-900" />

            <!-- Brand -->
            <a href="/" class="shrink-0 grow-0">
                <img :src="Brand.src" alt="Jabones Esencia Serena Brand" class="h-12 w-auto" />
            </a>

            <!-- open/close button -->
            <div v-if="!mdAndUp" class="flex gap-4 items-center justify-center">
                <NavButton :isOpen="isOpen" @toggle="toggleNav" />
            </div>

            <!-- Links pc -->
            <ul v-if="mdAndUp" class="flex justify-end w-full gap-6">
                <li v-for="link in links" :key="link.name">
                    <Link
                        :type="link.href !== pathName ? 'colorless' : 'primary'"
                        :decoration-class="link.href !== pathName ? 'bg-word-800' : ''"
                        :href="link.href"
                        class="uppercase tracking-wide font-semibold"
                        :class="link.href !== pathName ? 'text-word-800' : ''"
                    >
                        {{ link.name }}
                    </Link>
                </li>
            </ul>

            <!-- Cart pc -->
            <ShoppingCart v-if="mdAndUp" class="h-6 w-6 shrink-0 grow-0 text-word-900 transition-transform duration-300 cursor-pointer hover:scale-125" />
        </div>
    </nav>

    <!-- Background overlay -->
    <Transition name="fade">
        <div v-if="isOpen && !mdAndUp" class="fixed z-10 top-0 right-0 bg-black/50 backdrop-blur-[2px] w-full h-dvh" @click="toggleNav"></div>
    </Transition>

    <!-- Mobile nav -->
    <NavContentMobile v-if="!mdAndUp" :is-open="isOpen" @close="toggleNav" :links="links" />
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
