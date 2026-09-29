import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),

    routes: [
        {
            path: "/",
            name: "Home",
            component: () => import("../components/Home.vue")
        },
        {
            path: "/wishlist",
            name: "Wishlist",
            component: () => import("../components/Wishlist.vue")
        },
        {
            path: "/account",
            name: "Account",
            component: () => import("../components/Account.vue")
        },
        {
            path: "/talwine",
            name: "Talwine",
            component: () => import("../components/Talwine.vue")
        }
    ]
});

export default router;