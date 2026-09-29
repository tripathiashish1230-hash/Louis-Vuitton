<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

// Router
const route = useRoute()

// Menu state
const isMenuOpen = ref(false)

// Current page checks
const isWishlistPage = computed(() => {
    return route.path === '/wishlist'
})

const isAccountpage = computed(() => {
    return route.path === '/account'
})

// Open menu
const openMenu = () => {
    isMenuOpen.value = true
}

// Close menu
const closeMenu = () => {
    isMenuOpen.value = false
}
</script>

<template>
    <header class="navbar" :class="{
        'wishlist-navbar': isWishlistPage,
        'account-navbar': isAccountpage
    }">
        <!-- LEFT SIDE -->
        <div class="nav-left">
            <!-- MENU DRAWER -->
            <div v-if="isMenuOpen" class="menu-overlay" @click="closeMenu"></div>
            <div class="menu-drawer" :class="{ 'menu-open': isMenuOpen }">
                <button class="close-menu" @click="closeMenu">
                    ×
                </button>
                <div class="menu-content">
                    <h2>MENU</h2>
                    <p>Men</p>
                    <p>Women</p>
                    <p>Bags</p>
                    <p>Wear</p>
                    <p>Leather Goods</p>
                    <p>Accessories</p>
                    <p>Shoes</p>
                </div>
            </div>

            <!-- MENU -->
            <button class="nav-item menu-button" @click="openMenu">
                <svg class="menu-icon" viewBox="0 0 24 24">
                    <line x1="4" y1="7" x2="20" y2="7"></line>
                    <line x1="4" y1="12" x2="20" y2="12"></line>
                    <line x1="4" y1="17" x2="20" y2="17"></line>
                </svg>
                <span>Menu</span>
            </button>

            <!-- SEARCH -->
            <button class="nav-item search-button">
                <svg class="search-icon" viewBox="0 0 24 24">
                    <circle cx="10.8" cy="10.8" r="6.3"></circle>
                    <line x1="15.6" y1="15.6" x2="20" y2="20"></line>
                </svg>
                <span>Search</span>
            </button>
        </div>

        <!-- LOGO -->
        <div class="logo">
            <router-link to="/">
                LOUIS VUITTON
            </router-link>
        </div>

        <!-- RIGHT SIDE -->
        <div class="nav-right">

            <!-- CONTACT -->
            <a href="#" class="contact-link">
                Contact Us
            </a>

            <!-- WISHLIST -->
            <router-link to="/wishlist" class="icon-button" aria-label="Wishlist">
                <svg class="right-icon" viewBox="0 0 24 24">
                    <path d="M20.8 8.7
            C20.8 13.5 12 19 12 19
            C12 19 3.2 13.5 3.2 8.7
            C3.2 6.1 5 4.3 7.4 4.3
            C9.1 4.3 10.6 5.3 12 7
            C13.4 5.3 14.9 4.3 16.6 4.3
            C19 4.3 20.8 6.1 20.8 8.7Z" />
                </svg>
            </router-link>

            <!-- ACCOUNT -->
            <router-link to="/account" class="icon-button account-button" aria-label="Account">
                <svg class="right-icon account-icon" viewBox="0 0 24 24">
                    <!-- Head -->
                    <circle cx="12" cy="7.5" r="3.2" />

                    <!-- Body -->
                    <path d="M5.5 20
         C5.8 15.8 8.1 13.5 12 13.5
         C15.9 13.5 18.2 15.8 18.5 20" />
                </svg>
            </router-link>

            <!-- SHOPPING BAG -->
            <button class="icon-button bag-button" aria-label="Shopping Bag">
                <svg class="right-icon bag-icon" viewBox="0 0 24 24">
                    <path d="M5 8.5
            H19
            L18 20
            H6
            Z" />

                    <path d="M9 8.5
            V6.5
            C9 4.8 10.3 3.5 12 3.5
            C13.7 3.5 15 4.8 15 6.5
            V8.5" />
                </svg>
            </button>

        </div>
    </header>
</template>

<style scoped>
/*   GLOBAL RESET*/
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/*   NAVBAR*/
.navbar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 85px;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 36px;
    background: none;
    color: white;
    transition:
        background-color 0.3s ease,
        color 0.3s ease;
}

/* Wishlist + Account Page Navbar */
.navbar.wishlist-navbar,
.navbar.account-navbar {
    background: white;
    color: #111;
}

/* Hover par bhi white hi rahe */
.navbar.wishlist-navbar:hover,
.navbar.account-navbar:hover {
    background: white;
    color: #111;
}

/*   NAVBAR HOVER*/
.navbar:hover {
    background: white;
    color: #111;
}

/*   LEFT SIDE*/
.nav-left {
    display: flex;
    align-items: center;
    gap: 36px;
}

/*   MENU + SEARCH*/
.nav-item {
    display: flex;
    align-items: center;
    gap: 9px;
    border: none;
    outline: none;
    background: transparent;
    color: inherit;
    cursor: pointer;
    font-size: 13px;
    font-weight: 400;
}

/*   MENU ICON*/
.menu-icon {
    width: 17px;
    height: 17px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.3;
    stroke-linecap: round;
}

/*   MENU OVERLAY*/
.menu-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
    z-index: 998;
}

/*   MENU DRAWER*/
.menu-drawer {
    position: fixed;
    top: 0;
    left: 0;
    width: 380px;
    height: 100vh;
    background: white;
    color: #111;
    z-index: 999;
    padding: 30px;
    transform: translateX(-100%);
    transition: transform 0.4s ease;
    overflow-y: auto;
}

/* OPEN */
.menu-drawer.menu-open {
    transform: translateX(0);
}

/*   CLOSE BUTTON*/
.close-menu {
    position: absolute;
    top: 25px;
    right: 25px;
    width: 35px;
    height: 35px;
    border: none;
    background: transparent;
    font-size: 32px;
    font-weight: 300;
    color: #111;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

/*   MENU CONTENT*/
.menu-content {
    padding-top: 50px;
}

.menu-content h2 {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 30px;
}

.menu-content p {
    font-size: 17px;
    margin-bottom: 22px;
    cursor: pointer;
}

/*   SEARCH ICON*/
.search-icon {
    width: 18px;
    height: 18px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.3;
    stroke-linecap: round;
}

/*   LOGO*/
.logo {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
    font-size: 30px;
    font-weight: 500;
    letter-spacing: 1.3px;
}

/* Logo Link */
.logo a {
    color: inherit;
    text-decoration: none;
}

/*   RIGHT SIDE*/
.nav-right {
    display: flex;
    align-items: center;
    gap: 20px;
}

/*   CONTACT*/
.contact-link {
    color: inherit;
    text-decoration: none;
    font-size: 12px;
    white-space: nowrap;
}

/*   ICON BUTTON*/
.icon-button {
    width: 20px;
    height: 24px;
    padding: 0;
    border: none;
    background: transparent;
    color: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    text-decoration: none;
}

/*   RIGHT ICONS*/
.right-icon {
    width: 18px;
    height: 18px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.15;
    stroke-linecap: round;
    stroke-linejoin: round;
}

/* 
   SHOPPING BAG
 */
.bag-icon {
    width: 18px;
    height: 19px;
}

/*   TABLET  900px*/
@media (max-width: 900px) {
    .navbar {
        height: 75px;
        padding: 0 24px;
    }

    .nav-left {
        gap: 22px;
    }

    .nav-right {
        gap: 15px;
    }

    .logo {
        font-size: 25px;
    }
}

/* MOBILE600px*/
@media (max-width: 600px) {
    .navbar {
        height: 65px;
        padding: 0 16px;
    }

    /* Hide Menu/Search Text */
    .nav-item span {
        display: none;
    }

    .nav-left {
        gap: 16px;
    }

    /* Logo */
    .logo {
        font-size: 19px;
        letter-spacing: 1px;
    }

    /* Hide Contact */
    .contact-link {
        display: none;
    }

    .nav-right {
        gap: 12px;
    }

    .icon-button {
        width: 18px;
        height: 22px;
    }

    .right-icon {
        width: 17px;
        height: 17px;
    }

    .menu-drawer {
        width: 85%;
        padding: 25px;
    }
}

/* SMALL MOBILE380px */
@media (max-width: 380px) {
    .navbar {
        padding: 0 12px;
    }

    .logo {
        font-size: 16px;
    }

    .nav-left {
        gap: 12px;
    }

    .nav-right {
        gap: 8px;
    }
}
</style>