<script setup lang="ts">
import Brand from "@assets/brand-esencia-serena.webp"
import Button from "@components/common/Button.vue"
import { Headset, ShoppingCart, X } from "lucide-vue-next"

interface Props {
    isOpen: boolean
    links: { name: string; href: string }[]
}

const props = defineProps<Props>()

defineEmits<{
    (e: "close"): void
}>()
</script>

<template>
    <div
        class="bg-foreground-50 fixed top-0 right-0 z-20 grid h-dvh w-full max-w-sm grid-rows-[auto_1fr_auto] p-4 transition-transform duration-300 ease-in-out"
        :class="{ 'translate-x-0': isOpen, 'translate-x-full': !isOpen }"
    >
        <div class="border-primary-200 flex items-center justify-between border-b pb-4">
            <img :src="Brand.src" alt="Jabones Esencia Serena Brand" class="h-8 w-auto" />

            <X @click="$emit('close')" class="h-7 w-7 cursor-pointer" />
        </div>

        <ul class="mt-8">
            <li v-for="(link, index) in links" :key="link.name">
                <a
                    :href="link.href"
                    class="block py-3 transition-all duration-300"
                    :class="{ 'translate-x-0 opacity-100': isOpen, 'translate-x-10 opacity-0': !isOpen }"
                    :style="{ transitionDelay: isOpen ? index * 0.1 + 0.2 + 's' : '0s' }"
                >
                    <span class="text-secondary-800 border-secondary-800 border-b-2 text-3xl font-semibold tracking-wide uppercase italic">
                        {{ link.name }}
                    </span>
                </a>
            </li>
        </ul>

        <footer class="border-primary-200 space-y-3 border-t pt-4">
            <p class="text-p2-dark">
                Somos una tienda de jabones artesanales hechos a mano con ingredientes <strong class="italic">100% naturales</strong>. 🌱💚
            </p>
            <Button class="w-full">
                <ShoppingCart class="h-4 w-4" />
                ¡Ir al carrito a comprar!
            </Button>
            <Button class="w-full" type-style="secondary" href="https://api.whatsapp.com/send?phone=573124372240">
                <Headset class="h-4 w-4" />
                ¡Contáctanos!
            </Button>
        </footer>
    </div>
</template>
