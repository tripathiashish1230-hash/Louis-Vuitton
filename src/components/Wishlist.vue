<template>
  <section class="wishlist-page">
    <div v-if="wishlist.length === 0" class="empty-wishlist">
      <p>Your wishlist is empty.</p>
    </div>
    <div v-else class="wishlist-grid">
      <div v-for="product in wishlist" :key="product.name" class="wishlist-card">
        <div class="wishlist-image">
          <img :src="product.image" :alt="product.name" />
          <button class="wishlist-remove" @click="removeFromWishlist(product)" aria-label="Remove from wishlist">
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
        <div class="wishlist-info">
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
</template>

<script setup>
import { ref } from 'vue'

// Wishlist
const wishlist = ref(
  JSON.parse(localStorage.getItem('wishlist')) || []
)
// Remove product from wishlist
const removeFromWishlist = (product) => {
  wishlist.value = wishlist.value.filter(
    item => item.name !== product.name
  )

  // Save updated wishlist
  localStorage.setItem(
    'wishlist',
    JSON.stringify(wishlist.value)
  )
}
</script>

<style scoped>
.wishlist-page {
  width: 100%;
  padding: 100px 64px 60px;
}

.wishlist-page h1 {
  text-align: center;
  font-size: 30px;
  font-weight: 400;
  margin-bottom: 40px;
}

.empty-wishlist {
  text-align: center;
  padding: 80px 20px;
}

.empty-wishlist p {
  font-size: 16px;
}

.wishlist-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.wishlist-card {
  min-width: 0;
}

.wishlist-image {
  position: relative;
  width: 100%;
  aspect-ratio: 294 / 367;
  overflow: hidden;
  background: #eeeeee;
}

.wishlist-image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.wishlist-remove {
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

.wishlist-remove svg {
  width: 17px;
  height: 17px;
  fill: #e00000;
  stroke: #e00000;
  stroke-width: 1.15;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.wishlist-info {
  padding-top: 15px;
}

.product-name {
  margin: 0 0 5px;
  font-size: 13px;
}

.product-price {
  margin: 0;
  font-size: 13px;
  color: #555;
}

/* TABLET */
@media (max-width: 900px) {
  .wishlist-page {
    padding: 100px 40px 24px;
  }

  .wishlist-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 25px 14px;
  }
}

/* MOBILE */
@media (max-width: 600px) {
  .wishlist-page {
    padding: 100px 35px 16px;
  }

  .wishlist-page h1 {
    font-size: 24px;
    margin-bottom: 25px;
  }

  .wishlist-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px 10px;
  }

  .wishlist-info {
    padding-top: 11px;
  }

  .product-name {
    font-size: 11px;
  }

  .product-price {
    font-size: 11px;
  }
}
</style>