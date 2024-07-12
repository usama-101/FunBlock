<template>
    <Wrap class="mx-auto max-w-7xl">
      <div class="relative grid lg:grid-cols-2 place-items-center gap-8">
        <!-- Video Section -->
        <div class="relative w-full flex justify-center">
          <!-- Background Shape -->
          <div class="hidden absolute -top-10 lg:flex justify-center items-center">
            <div class="max-w-full w-full">
                <img class="w-full" :src="Nim" alt="">
            </div>
          </div>
          <!-- Video Container -->
          <div class="relative flex items-center justify-center rounded-xl shadow-xl p-3 border border-gray-100 bg-white z-10">
            <iframe class="rounded-xl shadow-xl w-[330px] h-[250px] sm:w-[400px] sm:h-[300px] md:w-[500px] md:h-[300px]"
                    src="https://www.youtube.com/embed/IOT-wJhMkOg?si=0KBdpOUMFNixr94s" title="YouTube video player"
                    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </div>
        <!-- Text Section -->
        <div class="max-w-lg mx-auto">
          <h1 class="text-3xl font-bold">Your home for help</h1>
          <p class="text-lg my-4">
            Welcome to FundBlock, your trusted blockchain-based fundraising platform for transparent, secure, and accessible fundraising. Whether you need support for personal, medical, educational, entrepreneurial, or charitable causes, FundBlock is here to connect you with the help you need. Join our community and start making a difference today.
          </p>
          <Button InnerBgColor="bg-gradient-to-r from-primary to-secondary" classBg="bg-gradient-to-r from-primary to-secondary" bgColor="text-white">
            <router-link to="/start-fundraising">Get Started</router-link> 
          </Button>
        </div>
      </div>
    </Wrap>
</template>
  
<script setup>
  import Wrap from '@components/General/Wrap.vue';
  import Button from '@components/General/Button.vue';
  import Nim from '@assets/Nim.png';
</script>