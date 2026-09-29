<script setup>
import { ref } from 'vue'
import productData from '@/data/products.json'

const categorySections = productData.categorySections
const productSections = productData.productSections

// Wishlist
const wishlist = ref(JSON.parse(localStorage.getItem('wishlist')) || [])

const toastMessage = ref('')
const showToast = ref(false)

// Check wishlist
const isWishlisted = (product) => {
    return wishlist.value.some((item) => item.name === product.name)
}

// Toggle wishlist
const toggleWishlist = (product) => {
    const index = wishlist.value.findIndex((item) => item.name === product.name)

    if (index === -1) {
        wishlist.value.push({
            name: product.name,
            price: product.price,
            image: product.image,
        })

        toastMessage.value = 'Added to wishlist'
        showToast.value = true
    } else {
        wishlist.value.splice(index, 1)

        toastMessage.value = 'Removed from wishlist'
        showToast.value = true
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist.value))

    setTimeout(() => {
        showToast.value = false
    }, 2000)
}
</script>

<template>
    <!-- HERO SECTION -->
    <main
        class="relative h-screen min-h-[600px] w-full bg-[url('/src/assets/hero1.jpg')] bg-cover bg-center bg-no-repeat max-[600px]:min-h-[550px]">
        <div class="absolute inset-0 bg-black/20"></div>

        <div
            class="absolute left-1/2 bottom-[49px] z-[2] w-[90%] -translate-x-1/2 text-center text-white max-[600px]:bottom-[38px]">
            <p class="mb-[13px] text-xs max-[600px]:mb-[10px] max-[600px]:text-[10px]">WOMEN</p>

            <h1
                class="mb-5 text-[30px] font-normal leading-[1.2] max-[900px]:text-[27px] max-[600px]:mb-4 max-[600px]:text-[21px] max-[600px]:leading-[1.25] max-[380px]:text-[19px]">
                Back to School Collection
            </h1>

            <a href="#" class="text-sm text-white underline underline-offset-4 max-[600px]:text-[13px]">
                Shop Now
            </a>
        </div>
    </main>

    <!-- CATEGORY SECTION -->
    <section v-for="section in categorySections" :key="section.title || section.products[0].name"
        class="w-full bg-white px-16 pb-[30px] pt-12 max-[900px]:px-6 max-[900px]:pb-[25px] max-[900px]:pt-10 max-[600px]:px-4 max-[600px]:pb-[25px] max-[600px]:pt-[35px] max-[380px]:px-3">
        <!-- CATEGORY TITLE -->
        <h2 v-if="section.title"
            class="mb-[26px] text-center text-[30px] font-normal leading-[1.2] text-[#111] max-[900px]:mb-[22px] max-[900px]:text-[27px] max-[600px]:mb-5 max-[600px]:text-2xl max-[380px]:text-[21px]">
            {{ section.title }}
        </h2>

        <!-- CATEGORY GRID -->
        <div
            class="grid w-full grid-cols-4 gap-4 max-[900px]:grid-cols-2 max-[900px]:gap-x-[14px] max-[900px]:gap-y-5 max-[600px]:gap-x-[10px] max-[600px]:gap-y-[25px] max-[380px]:gap-x-2 max-[380px]:gap-y-5">
            <!-- CATEGORY CARD -->
            <a v-for="product in section.products" :key="product.name" href="#"
                class="group block w-full text-[#111] no-underline">
                <div class="aspect-[294/367] w-full overflow-hidden bg-[#eeeeee]">
                    <img :src="product.image" :alt="product.name"
                        class="block h-full w-full object-cover transition-transform duration-[400ms] ease group-hover:scale-[1.02]" />
                </div>

                <p
                    class="mt-[19px] text-center text-[15px] font-normal leading-[1.3] text-[#111] max-[600px]:mt-3 max-[600px]:text-xs max-[380px]:text-[11px]">
                    {{ product.name }}
                </p>
            </a>
        </div>
    </section>

    <!-- IMAGE SECTION -->
    <section
        class="aspect-[1440/809] h-auto w-full bg-[url('/src/assets/content.jpg')] bg-center bg-no-repeat [background-size:100%_100%]">
    </section>

    <!-- PRODUCT SECTIONS -->
    <section v-for="section in productSections" :key="section.title"
        class="w-full bg-white px-16 pb-[38px] pt-12 max-[900px]:px-6 max-[900px]:pb-[30px] max-[900px]:pt-10 max-[600px]:px-4 max-[600px]:pb-[25px] max-[600px]:pt-[35px] max-[380px]:px-3">
        <!-- HEADING -->
        <div class="mb-[27px] text-center max-[900px]:mb-[23px] max-[600px]:mb-5">
            <p class="mb-[13px] text-xs text-[#111111] max-[600px]:mb-[9px] max-[600px]:text-[10px]">
                {{ section.category }}
            </p>

            <h2
                class="text-[30px] font-normal leading-[1.2] text-[#111111] max-[900px]:text-[27px] max-[600px]:text-[23px] max-[380px]:text-[21px]">
                {{ section.title }}
            </h2>
        </div>

        <!-- PRODUCTS -->
        <div
            class="grid w-full grid-cols-4 gap-4 max-[900px]:grid-cols-2 max-[900px]:gap-x-[14px] max-[900px]:gap-y-[25px] max-[600px]:gap-x-[10px] max-[600px]:gap-y-6 max-[380px]:gap-x-2 max-[380px]:gap-y-5">
            <div v-for="product in section.products" :key="product.name" class="min-w-0 text-[#111111]">
                <!-- PRODUCT IMAGE -->
                <div class="relative aspect-[294/367] w-full overflow-hidden bg-[#eeeeee]">
                    <img :src="product.image" :alt="product.name" class="block h-full w-full object-cover" />

                    <!-- WISHLIST -->
                    <button
                        class="absolute right-3 top-3 flex h-5 w-5 cursor-pointer items-center justify-center border-0 bg-transparent p-0 max-[600px]:right-2 max-[600px]:top-2"
                        :aria-label="isWishlisted(product) ? 'Remove from wishlist' : 'Add to wishlist'"
                        @click="toggleWishlist(product)">
                        <svg viewBox="0 0 24 24"
                            class="h-[17px] w-[17px] fill-none stroke-[#111111] [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.15] max-[600px]:h-[15px] max-[600px]:w-[15px]"
                            :class="{ '!fill-[#e00000] !stroke-[#e00000]': isWishlisted(product) }">
                            <path d="M20.8 8.7
                C20.8 13.5 12 19 12 19
                C12 19 3.2 13.5 3.2 8.7
                C3.2 6.1 5 4.3 7.4 4.3
                C9.1 4.3 10.6 5.3 12 7
                C13.4 5.3 14.9 4.3 16.6 4.3
                C19 4.3 20.8 6.1 20.8 8.7Z" />
                        </svg>
                    </button>
                </div>

                <!-- PRODUCT INFO -->
                <div class="pt-[15px] max-[600px]:pt-[11px]">
                    <p
                        class="mb-[5px] text-[13px] font-normal leading-[1.3] text-[#111111] max-[600px]:mb-1 max-[600px]:text-[11px] max-[380px]:text-[10px]">
                        {{ product.name }}
                    </p>

                    <p class="text-[13px] font-normal text-[#555555] max-[600px]:text-[11px] max-[380px]:text-[10px]">
                        {{ product.price }}
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- TOAST -->
    <div v-if="showToast"
        class="showToast fixed bottom-[30px] left-1/2 z-[9999] -translate-x-1/2 whitespace-nowrap bg-[#111111] px-6 py-[13px] text-[13px] font-normal text-white max-[600px]:bottom-5 max-[600px]:px-5 max-[600px]:py-3 max-[600px]:text-xs">
        {{ toastMessage }}
    </div>
</template>

<style>
html,
body,
#app {
    margin: 0;
    padding: 0;
    width: 100%;
}

body {
    overflow-x: hidden;
}

section {
    padding: 48px 64px 30px;
}

h2 {
    margin: 0 0 26px;
}

.showToast {
    padding: 13px 24px;
}
</style>