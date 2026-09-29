<script setup>

import { ref } from 'vue'
import productData from '@/data/products.json'

/*
 * GitHub Pages / Vite image handling
 * products.json me paths:
 * /src/assets/filename.jpg
 *
 * Vite in images ko build time par process karega.
 */
const images = import.meta.glob(
  '/src/assets/*',
  {
    eager: true,
    query: '?url',
    import: 'default'
  }
)

const getImageUrl = (image) => {
  return images[image] || image
}

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

  <main class="hero" :style="{
    backgroundImage: `url(${getImageUrl('/src/assets/hero1.jpg')})`
  }">

    <div class="hero-overlay"></div>

    <div class="hero-content">

      <p class="hero-category">WOMEN</p>

      <h1>Back to School Collection</h1>

      <a href="#" class="shop-now">Shop Now</a>

    </div>

  </main>


  <!-- CATEGORY SECTION -->

  <section v-for="section in categorySections" :key="section.title || section.products[0].name"
    class="category-section">

    <!-- CATEGORY TITLE -->

    <h2 v-if="section.title" class="category-title">
      {{ section.title }}
    </h2>


    <!-- CATEGORY GRID -->

    <div class="category-grid">

      <!-- CATEGORY CARD -->

      <a v-for="product in section.products" :key="product.name" href="#" class="category-card">

        <div class="category-image">

          <img :src="getImageUrl(product.image)" :alt="product.name" />

        </div>

        <p>{{ product.name }}</p>

      </a>

    </div>

  </section>


  <!-- IMAGE SECTION -->

  <section class="next-image-section" :style="{
    backgroundImage: `url(${getImageUrl('/src/assets/content.jpg')})`
  }"></section>


  <!-- PRODUCT SECTIONS -->

  <section v-for="section in productSections" :key="section.title" class="handbags-section">

    <!-- HEADING -->

    <div class="handbags-heading">

      <p class="handbags-category">
        {{ section.category }}
      </p>

      <h2>
        {{ section.title }}
      </h2>

    </div>


    <!-- PRODUCTS -->

    <div class="handbags-grid">

      <div v-for="product in section.products" :key="product.name" class="handbag-card">

        <!-- PRODUCT IMAGE -->

        <div class="handbag-image">

          <img :src="getImageUrl(product.image)" :alt="product.name" />


          <!-- WISHLIST -->

          <button class="product-wishlist" :class="{ active: isWishlisted(product) }" :aria-label="isWishlisted(product)
            ? 'Remove from wishlist'
            : 'Add to wishlist'
            " @click="toggleWishlist(product)">

            <svg viewBox="0 0 24 24">

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

        <div class="handbag-info">

          <p class="product-name">
            {{ product.name }}
          </p>

          <p class="product-price">
            {{ product.price }}
          </p>

        </div>

      </div>

    </div>

  </section>


  <!-- TOAST -->

  <div v-if="showToast" class="wishlist-toast">
    {{ toastMessage }}
  </div>

</template>


<style scoped>
/* GLOBAL */
:global(html),
:global(body),
:global(#app) {
  margin: 0;
  padding: 0;
  width: 100%;
}

:global(body) {
  overflow-x: hidden;
}

/* HERO */
.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  background-image: url('/src/assets/hero1.jpg');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

/* Overlay */
.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
}

/* Hero Content */
.hero-content {
  position: absolute;
  left: 50%;
  bottom: 49px;
  transform: translateX(-50%);
  width: 90%;
  text-align: center;
  color: white;
  z-index: 2;
}

/* Category */
.hero-category {
  margin-bottom: 13px;
  font-size: 12px;
}

/* Heading */
.hero-content h1 {
  margin-bottom: 20px;
  font-size: 30px;
  font-weight: 400;
  line-height: 1.2;
}

/* Shop Now */
.shop-now {
  color: white;
  font-size: 14px;
  text-decoration: underline;
  text-underline-offset: 4px;
}

/* CATEGORY SECTION */
.category-section {
  width: 100%;
  background: white;
  padding: 48px 64px 30px;
}

/* Category Title */
.category-title {
  margin: 0 0 26px;
  text-align: center;
  font-size: 30px;
  font-weight: 400;
  line-height: 1.2;
  color: #111;
}

/* Grid */
.category-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

/* Card */
.category-card {
  display: block;
  width: 100%;
  color: #111;
  text-decoration: none;
}

/* Image Container */
.category-image {
  width: 100%;
  aspect-ratio: 294 / 367;
  overflow: hidden;
  background: #eeeeee;
}

/* Image */
.category-image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

/* Hover */
.category-card:hover .category-image img {
  transform: scale(1.02);
}

/* Text */
.category-card p {
  margin-top: 19px;
  text-align: center;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.3;
  color: #111;
}

/* NEXT IMAGE SECTION */
.next-image-section {
  width: 100%;
  height: auto;
  aspect-ratio: 1440 / 809;
  background-image: url('/src/assets/content.jpg');
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}

/* NEW HANDBAGS FOR FALL */
.handbags-section {
  width: 100%;
  background: #ffffff;
  padding: 48px 64px 38px;
}

/* HEADING */
.handbags-heading {
  text-align: center;
  margin-bottom: 27px;
}

/* WOMEN */
.handbags-category {
  margin: 0 0 13px;
  font-size: 12px;
  font-weight: 400;
  color: #111111;
}

/* Heading */
.handbags-heading h2 {
  margin: 0;
  font-size: 30px;
  font-weight: 400;
  line-height: 1.2;
  color: #111111;
}

/* PRODUCT GRID */
.handbags-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

/* PRODUCT CARD */
.handbag-card {
  min-width: 0;
  color: #111111;
}

/* PRODUCT IMAGE */
.handbag-image {
  position: relative;
  width: 100%;
  aspect-ratio: 294 / 367;
  overflow: hidden;
  background: #eeeeee;
}

.handbag-image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* PRODUCT WISHLIST */
.product-wishlist {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 20px;
  height: 20px;
  padding: 0;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

/* Heart SVG */
.product-wishlist svg {
  width: 17px;
  height: 17px;
  fill: none;
  stroke: #111111;
  stroke-width: 1.15;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.product-wishlist.active svg {
  fill: #e00000;
  stroke: #e00000;
}

/* PRODUCT INFORMATION */
.handbag-info {
  padding-top: 15px;
}

.product-name {
  margin: 0 0 5px;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.3;
  color: #111111;
}

.product-price {
  margin: 0;
  font-size: 13px;
  font-weight: 400;
  color: #555555;
}

/* WISHLIST TOAST */
.wishlist-toast {
  position: fixed;
  left: 50%;
  bottom: 30px;
  transform: translateX(-50%);
  background: #111111;
  color: #ffffff;
  padding: 13px 24px;
  font-size: 13px;
  font-weight: 400;
  z-index: 9999;
  white-space: nowrap;
}

/*
   TABLET
   <= 900px
*/
@media (max-width: 900px) {
  .category-section {
    padding: 40px 24px 25px;
  }

  .category-title {
    font-size: 27px;
    margin-bottom: 22px;
  }

  .category-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px 14px;
  }

  .hero-content h1 {
    font-size: 27px;
  }

  .next-image-section {
    aspect-ratio: 1440 / 809;
    width: 100%;
    height: auto;
  }

  .handbags-section {
    padding: 40px 24px 30px;
  }

  .handbags-heading {
    margin-bottom: 23px;
  }

  .handbags-heading h2 {
    font-size: 27px;
  }

  .handbags-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 25px 14px;
  }
}

/* MOBILE <= 600px */
@media (max-width: 600px) {
  .hero {
    min-height: 550px;
    background-position: center center;
  }

  .hero-content {
    bottom: 38px;
  }

  .hero-category {
    font-size: 10px;
    margin-bottom: 10px;
  }

  .hero-content h1 {
    font-size: 21px;
    line-height: 1.25;
    margin-bottom: 16px;
  }

  .shop-now {
    font-size: 13px;
  }

  .category-section {
    padding: 35px 16px 25px;
  }

  .category-title {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .category-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 25px 10px;
  }

  .category-card p {
    margin-top: 12px;
    font-size: 12px;
  }

  .next-image-section {
    aspect-ratio: 1440 / 809;
    width: 100%;
    height: auto;
  }

  .handbags-section {
    padding: 35px 16px 25px;
  }

  .handbags-heading {
    margin-bottom: 20px;
  }

  .handbags-category {
    font-size: 10px;
    margin-bottom: 9px;
  }

  .handbags-heading h2 {
    font-size: 23px;
  }

  .handbags-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px 10px;
  }

  .product-wishlist {
    top: 8px;
    right: 8px;
  }

  .product-wishlist svg {
    width: 15px;
    height: 15px;
  }

  .handbag-info {
    padding-top: 11px;
  }

  .product-name {
    font-size: 11px;
    margin-bottom: 4px;
  }

  .product-price {
    font-size: 11px;
  }

  .wishlist-toast {
    bottom: 20px;
    padding: 12px 20px;
    font-size: 12px;
  }
}

/* SMALL MOBILE <= 380px */
@media (max-width: 380px) {
  .category-section {
    padding-left: 12px;
    padding-right: 12px;
  }

  .category-title {
    font-size: 21px;
  }

  .category-grid {
    gap: 20px 8px;
  }

  .category-card p {
    font-size: 11px;
  }

  .hero-content h1 {
    font-size: 19px;
  }

  .next-image-section {
    aspect-ratio: 1440 / 809;
    width: 100%;
    height: auto;
  }

  .handbags-section {
    padding-left: 12px;
    padding-right: 12px;
  }

  .handbags-heading h2 {
    font-size: 21px;
  }

  .handbags-grid {
    gap: 20px 8px;
  }

  .product-name {
    font-size: 10px;
  }

  .product-price {
    font-size: 10px;
  }
}
</style>