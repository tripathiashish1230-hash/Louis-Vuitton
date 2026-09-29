<template>
    <section class="account-page">
        <div class="login-container">
            <h1>Login</h1>
            <p class="login-subtitle">
                Sign in to your account
            </p>
            <form @submit.prevent="login">
                <!-- Email -->
                <div class="form-group">
                    <label for="email">
                        Email
                    </label>
                    <input id="email" v-model="email" type="email" placeholder="Enter your email" required />
                </div>
                <!-- Password -->
                <div class="form-group">
                    <label for="password">
                        Password
                    </label>
                    <input id="password" v-model="password" type="password" placeholder="Enter your password"
                        required />
                </div>
                <!-- Login Button -->
                <button type="submit" class="login-button">
                    Login
                </button>
            </form>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Form fields
const email = ref('')
const password = ref('')

// Router
const router = useRouter()

// Login
const login = () => {
    // Login successful
    localStorage.setItem('isLoggedIn', 'true')

    // Go to Home page
    router.push('/')
}
</script>

<style scoped>
.account-page {
    min-height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    padding: 100px 20px 40px;
}

.login-container {
    width: 100%;
    max-width: 420px;
}

.login-container h1 {
    margin: 0;
    text-align: center;
    font-size: 32px;
    font-weight: 400;
    color: #111;
}

.login-subtitle {
    margin: 10px 0 35px;
    text-align: center;
    font-size: 14px;
    color: #666;
}

.form-group {
    margin-bottom: 22px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-size: 13px;
    color: #111;
}

.form-group input {
    width: 100%;
    height: 48px;
    padding: 0 14px;
    border: 1px solid #bdbdbd;
    background: #fff;
    color: #111;
    font-size: 14px;
    outline: none;
}

.form-group input:focus {
    border-color: #111;
}

.login-button {
    width: 100%;
    height: 48px;
    border: none;
    background: #111;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
}

.login-button:hover {
    background: #333;
}

/* MOBILE */
@media (max-width: 600px) {
    .account-page {
        padding: 90px 20px 30px;
    }

    .login-container h1 {
        font-size: 28px;
    }
}
</style>