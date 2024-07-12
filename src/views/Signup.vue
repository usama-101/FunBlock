<!-- src/views/Login.vue -->
<template>
    <div class="min-h-screen flex items-center justify-center bg-img">
        <div class="bg-white py-10 px-5 sm:py-20 sm:px-20 rounded-3xl shadow-lg max-w-3xl w-full">
            <h2 class="text-4xl font-semibold text-center mb-2">Your account details</h2>
            <p class="text-center text-gray-900 mb-8 font-light">
                Fill in your details to create an account.
            </p>

            <form @submit.prevent="handleLogin">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-4">
                    <div class="relative mt-2 flex-1">
                        <label for="name"
                            class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">First
                            Name</label>
                        <input type="text" v-model="first_name"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none placeholder:font-light text-sm"
                            placeholder="John" required />
                        <span class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                class="size-6">
                                <path fill-rule="evenodd"
                                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                                    clip-rule="evenodd" />
                            </svg>

                        </span>
                    </div>
                    <div class="relative mt-2 flex-1">
                        <label for="name"
                            class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">Last
                            Name</label>
                        <input type="text" v-model="last_name"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none placeholder:font-light text-sm"
                            placeholder="Smith" required />
                        <span class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                class="size-6">
                                <path fill-rule="evenodd"
                                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                                    clip-rule="evenodd" />
                            </svg>

                        </span>
                    </div>
                </div>

                <div class="flex flex-col sm:flex-row  sm:items-center justify-between gap-5">
                    <div class="relative flex-1">
                        <label for="name"
                            class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">Email</label>
                        <input type="email" v-model="email"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none placeholder:font-light text-sm"
                            placeholder="johnsmith@gmail.com" required />
                        <span class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                class="w-5 h-5">
                                <path
                                    d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                                <path
                                    d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                            </svg>
                        </span>
                    </div>
                    <div class="relative flex-1">
                        <label for="name"
                            class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">Password</label>
                        <input id="password" @input="validPass" :type="showPassword ? 'text' : 'password'" v-model="password"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none"
                            placeholder="*******" required />
                        <span class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer"
                            @click="togglePassword">
                            <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                fill="currentColor" class="w-6 h-6">
                                <path
                                    d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                                <path
                                    d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                                <path
                                    d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                            </svg>

                            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                class="w-6 h-6">
                                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                <path fill-rule="evenodd"
                                    d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                                    clip-rule="evenodd" />
                            </svg>

                        </span>
                    </div>
                </div>
                <div class="bg-gray-100 rounded-3xl p-4 my-8">
                    <h1 class="text-lg font-bold">Your Password must have:</h1>
                    <ul id="pass_verify_field" class="text-xs list-disc text-gray-600 ml-4 space-y-1 mt-2">
                        <li>At least 8 characters</li>
                        <li>1 uppercase letter</li>
                        <li>1 lowercase letter</li>
                        <li>1 number</li>
                        <li>1 symbol</li>
                    </ul>
                </div>
                <div class="flex items-start gap-3 mb-3">
                    <input type="checkbox" class="w-4 h-4 text-purple-500 focus:outline-purple-500 rounded-md mt-1">
                    <p class="text-xs sm:text-sm">Receive tips to help you make the most of your fundraiser, and updates about important causes. Unsubscribe anytime.</p>
                </div>
                <div class="flex items-center justify-center">
                    <button v-if="!signStatus" type="submit"
                        class="w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white py-2 rounded-full shadow-lg max-w-xs">
                        Sign up
                    </button>
                    <button v-else type="submit" disabled
                        class="w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white py-2 rounded-full shadow-lg max-w-xs">
                        Signing...
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { E, msg, validatePass } from '../utils/utils';
import { API_URL } from '../utils/constant';
import Swal from 'sweetalert2';
import axios from 'axios';

const first_name = ref('')
const last_name = ref('')
const password = ref('')
const email = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const signStatus = ref(false)


const handleLogin = () => {
    // Handle login logic here
    if(validatePass("password")) {
        signStatus.value = true
        const formData = new FormData();
        formData.append('email', email.value);
        formData.append('password', password.value);
        formData.append('firstname', first_name.value);
        formData.append('lastname', last_name.value);
        
        axios.post(`${API_URL}?type=sign`, formData)
        .then((resp) => {
        signStatus.value = false
        if(resp.data.status) {
                msg(resp.data.msg)
                //redirect to login
                setTimeout(() => {window.location = '/login'}, 1500)
        }
        else {
                msg(resp.data.msg, 'error')
        }
        })
        .catch((error) => {
            signStatus.value = false
        msg('Something went wrong', 'error')
        console.error(error); // Log the error to the console for debugging
        });
    }
} 
//to validate pass
const validPass = () => { 
    const flg = validatePass("password")
    if(!flg) {
        //show warning
        E('pass_verify_field').style.color = "red"
    }
    else {
        E('pass_verify_field').style.color = "limegreen"
    }
}
const togglePassword = () => {
    showPassword.value = !showPassword.value
};
</script>

<style scoped>
.bg-img {
    background-image: url('@assets/bgLogin.png');
}
</style>