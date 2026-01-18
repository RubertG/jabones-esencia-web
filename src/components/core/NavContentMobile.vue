<script setup lang="ts">
import Brand from "@assets/brand-esencia-serena.webp"
import Button from "@components/common/Button.vue";
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
        class="fixed z-20 top-0 right-0 w-full h-dvh p-4 bg-foreground-50 max-w-sm duration-300 ease-in-out transition-transform grid grid-rows-[auto_1fr_auto]"
        :class="{ 'translate-x-0': isOpen, 'translate-x-full': !isOpen }"
    >
        <div class="flex justify-between items-center border-b border-primary-200 pb-4">
            <img :src="Brand.src" alt="Jabones Esencia Serena Brand" class="h-8 w-auto" />

            <X @click="$emit('close')" class="h-7 w-7 cursor-pointer" />
        </div>

        <ul class="mt-8">
            <li v-for="(link, index) in links" :key="link.name">
                <a
                    :href="link.href"
                    class="block py-2.5 transition-all duration-300"
                    :class="{ 'opacity-100 translate-x-0': isOpen, 'opacity-0 translate-x-10': !isOpen }"
                    :style="{ transitionDelay: isOpen ? index * 0.1 + 0.2 + 's' : '0s' }"
                    @click="$emit('close')"
                >
                    <span class="text-3xl text-secondary-800 uppercase tracking-wide italic font-semibold border-b-2 border-secondary-800">
                        {{ link.name }}
                    </span>
                </a>
            </li>
        </ul>

        <footer class="space-y-3 border-t border-primary-200 pt-4">
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
