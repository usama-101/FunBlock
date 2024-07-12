<template>
    <Wrap class="max-w-8xl !my-3">
        <nav class="flex items-center justify-between sm:gap-10">
           <div class="flex items-center justify-between sm:gap-2">
            <div @click="IsMobNav = !IsMobNav" class="blook lg:hidden">
                <span>
                    <svg v-if="!IsMobNav" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>

                </span>
            </div>
           <router-link to="/">
             <div class="">
                <img class="h-6 sm:h-14 ml-2 sm:ml-0" :src="Logo" alt="">
             </div>
           </router-link>
           </div>
            <ul class="hidden lg:flex items-center justify-start flex-2 gap-5">
                <li>
                    <div class="flex items-center justify-center gap-2">
                        <span>
                            Discover
                        </span>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </span>
                    </div>
                </li>
                <li>
                    <div class="flex items-center justify-center gap-2">
                        <span>
                            How it Works
                        </span>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </span>
                    </div>
                </li>
            </ul>
            <div class="flex items-center justify-end gap-2 sm:gap-8 flex-1">
                <div class="hidden lg:block shadow-sm rounded-full px-4 sm:py-2.5 max-w-xs w-full border">
                    <input class="focus:outline-none border-0 bg-transparent w-full py-0 focus:ring-0" type="text" placeholder="Search">
                </div>
                <router-link v-if="isLogin" to="/connectWallet">
                    <Button v-if="!isConnected">
                        Connect Wallet
                    </Button>
                    <Button v-else >
                        {{ fAddr(wallet) }}
                    </Button>
                </router-link>
                <router-link v-else to="/login">
                    <Button v-if="!isConnected">
                        Connect Wallet
                    </Button>
                    <Button v-else >
                        {{ fAddr(wallet) }}
                    </Button>
                </router-link>
                <router-link to="/notification" class="hidden sm:block text-gray-400 relative">
                    <BellIcon />
                    <span class="w-2 h-2 bg-primary rounded-full absolute -top-1 -right-1"></span>
                </router-link>
                <router-link v-if="!isLogin" to="/login">
                    <div class="w-6 h-6 sm:w-12 sm:h-12">
                        <img class="border border-primary rounded-full w-full h-full" :src="userNewImg" alt="">
                    </div>
                </router-link>
                <router-link v-else to="/dashboard">
                    <div class="w-6 h-6 sm:w-12 sm:h-12">
                        <img class="border border-primary rounded-full w-full h-full" :src="userDetImg" alt="">
                    </div>
                </router-link>
            </div>
        </nav>
        <nav v-if="IsMobNav" class="w-full">
            <ul class="flex flex-col md:hidden items-start justify-start flex-2 gap-3 mt-5 w-full">
                <li class="w-full">
                    <div class="shadow-sm rounded-full px-4 sm:py-1.5 w-full border">
                        <input class="focus:outline-none border-0 bg-transparent w-full py-0" type="text"
                            placeholder="Search">
                    </div>
                </li>
                <li class="ml-3">
                    <div class="flex items-center justify-center gap-2 text-sm">
                        <span>
                            Discover
                        </span>
                    </div>
                </li>
                <li class="ml-3">
                    <div class="flex items-center justify-center gap-2 text-sm">
                        <span>
                            How it Works
                        </span>
                    </div>
                </li>
            </ul>
        </nav>
    </Wrap>
</template>
<script setup>
import Logo from '@assets/logo.png';
import userNewImg from '@assets/user_new.avif'
import Button from '@components/General/Button.vue';
import BellIcon from '@components/icons/BellIcon.vue';
import Wrap from '@components/General/Wrap.vue';
import { ref } from 'vue';
import { fAddr, getWallet } from '../../utils/utils';
import { PROFILE_LOGO } from '../../utils/constant';

const IsMobNav = ref(false);
let userDetImg = ref(PROFILE_LOGO)
const isConnected = ref(false)
const isLogin = ref(false)
const wallet = ref("")


/* hearing functions */
hear('x-wallet', async (e) => { 
    isConnected.value = e.status
    if(e.status) {
        await setUp()
    }
})
//listen to login events
hear(['x-login', 'x-users'], (e) => {  
    userSetup()
})

//wallet setup
const setUp = async () => {
    wallet.value = await getWallet(); 
    //if empty value, disconnect wallet
    if(wallet.value == "") {
        isConnected.value = false
        localStorage.setItem('x-wallet-connect','false')
    }
    else {
        isConnected.value = true
    }
}
//userSetup
const userSetup = async () => {
    //read the user details
    const userDet = JSON.parse(localStorage.getItem('x-users') || '{}')
    if(userDet['token']) { 
        //change the logo
        isLogin.value = true
        userDetImg.value = userDet.img || PROFILE_LOGO
    }
    else {
        isLogin.value = false
    }
}
setUp()
userSetup()
</script>