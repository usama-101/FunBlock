<template>
   <div class="max-w-8xl mx-auto h-screen flex items-center ">
    <div class="flex-grow container mx-auto flex flex-col lg:flex-row items-center justify-center py-12">
      <!-- Left Section -->
      <div class="w-full lg:w-1/2  px-4 text-center lg:text-left">
            <div class="text-center">
                <h1 class="text-4xl font-semibold mb-2">Connect Your Wallet</h1>
                <p class="text-gray-400 mb-8 font-light">Connect your wallet to sign in or create an account.</p>
            </div>
        <!-- Wallet Options as Radio Buttons -->
        <div class="space-y-4 mb-8 max-w-xl mx-auto">
          <label style="display: none;" class="flex items-center bg-white shadow rounded-lg p-4 cursor-pointer" :class="{ 'border-2 border-primary': selectedWallet === 'xbull' }">
            <input type="radio" name="wallet" value="xbull" class="hidden" v-model="selectedWallet">
            <img :src="Xbull" alt="xbull" class="w-8 h-8 mr-4" />
            <div>
              <h2 class="font-semibold">xbull</h2>
              <p class="text-gray-400 font-light">Connect your xbull wallet</p>
            </div>
          </label>
          <label class="flex items-center bg-white shadow rounded-lg p-4 cursor-pointer" :class="{ 'border-2 border-primary': selectedWallet === 'freighter' }">
            <input type="radio" name="wallet" value="freighter" class="hidden" v-model="selectedWallet">
            <img :src="frighter" alt="Freighter" class="w-8 h-8 mr-4" />
            <div>
              <h2 class="font-semibold">Freighter</h2>
              <p v-if="!connected" class="text-gray-400 font-light">Connect your Freighter wallet</p>
              <p v-else-if="connected && selectedWallet === 'freighter'" class="text-gray-400 font-light">
                {{fAddr(wallet)}}
              </p>
            </div>
          </label>
          <label class="flex items-center bg-white shadow rounded-lg p-4 cursor-pointer" :class="{ 'border-2 border-primary': selectedWallet === 'rabet' }">
            <input type="radio" name="wallet" value="rabet" class="hidden" v-model="selectedWallet">
            <img :src="rabat" alt="Rabet" class="w-8 h-8 mr-4" />
            <div>
              <h2 class="font-semibold">Rabet</h2>
              <p v-if="!connected" class="text-gray-400 font-light">Connect your Rabet wallet</p>
              <p v-else-if="connected && selectedWallet === 'rabet'" class="text-gray-400 font-light">
                {{fAddr(wallet)}}
              </p>
            </div>
          </label>
        </div>
        
        <!-- Connect Wallet Button -->
        <button v-show="!connected" v-if="!connect"
          class="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-6 py-3 rounded-full w-full"
          @click="() => {connectWallet(true)}"
        >
          Connect Wallet
        </button>
        <button v-show="!connected" v-else disabled
          class="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-6 py-3 rounded-full w-full"
        >
          Connecting...
        </button>
        <button v-show="connected"
          class="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-6 py-3 rounded-full w-full"
          @click="disconnectWallet"
        >
          Disconnect Wallet
        </button>
      </div>

      <!-- Right Section (Image) -->
      <div class="hidden lg:block">
        <img :src="glowhand" alt="Connect Wallet" class="rounded-lg" />
      </div>
    </div>
   </div>
</template>
<script setup>
import { ref } from 'vue';
import glowhand from '@assets/glowhand.png';
import Xbull from '@assets/Xbull.png';
import rabat from '@assets/rabbat.png';
import frighter from '@assets/frighter.png';
import {
        isConnected,
        setAllowed,
        getPublicKey,
} from "@stellar/freighter-api";
import { fAddr, msg } from '../utils/utils';

const selectedWallet = ref('freighter');
const connect = ref(false)
const connected = ref(false)
const wallet = ref("")

const selectWallet = (walletKey = null, redirect = false) => {
    if(walletKey != null && walletKey != undefined) {  
        connected.value = true
        wallet.value = walletKey
        localStorage.setItem('x-wallet-connect','true')
        localStorage.setItem('x-wallet-type',selectedWallet.value)
        speak('x-wallet', {walletKey, status:true})
        if(redirect){window.location= '/'}
    }
}

/* to disconnect wallet */
const disconnectWallet = () => {
  connected.value = false
  localStorage.setItem('x-wallet-connect','false')
  speak('x-wallet', {status:false})
}

/* to connect wallet */
const connectWallet = async (allowRedirect = false) => {
    if(selectedWallet.value == 'freighter') {
      try{
          //check if user has freighter installed
          const flg = await isConnected()
          if(flg) {
              connect.value = true;
              if((await setAllowed())){ 
                  //has connected
                  selectWallet((await getPublicKey()), allowRedirect)
                  connect.value = false
              }
              else {
                  connect.value = false
              }
          }
          else {
              //show error that freighter is not installed
              msg('You need to create a wallet first', 'fail')
          }
      }
      catch(e) {
            connect.value = false
      }
    }
    else if(selectedWallet.value == 'rabet') {
      if(window.rabet) {
        connect.value = true
        window.rabet.connect()
        .then(result => {
          selectWallet(result.publicKey)
          connect.value = false
        })
        .catch(error => { console.log(error)
          msg('Unable to connect wallet', 'fail')
          connect.value = false
        });
      }
      else {
        msg('Rabet not installed', 'fail')
      }
    }
}

/* to connect by default */
const setUp = async () => {
  const isConnected = localStorage.getItem('x-wallet-connect') || 'false'
  if(isConnected == 'true') {
    selectWallet.value = localStorage.getItem('x-wallet-type') || 'freighter'
    //automatic connect
    await connectWallet(false)
  }
}

setUp()
</script>
