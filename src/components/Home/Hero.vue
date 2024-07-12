<template>
    <Wrap class="relative max-w-7xl mx-auto mt-10">
        <div class="bg-gradient-to-r from-primary to-secondary rounded-3xl p-7 text-center h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[620px] max-w-7xl mx-auto">
           <div class=" lg:mt-20">
            <h1 class="text-2xl sm:text-3xl lg:text-6xl font-bold text-white">Empowering Change</h1>
            <p class="text-xs sm:text-base text-white font-medium mt-3">One Block at a Time: Launch Your Fundraiser Campaign Today!</p>
            <Button class="!p-0 !bg-white !font-medium mt-5" style="z-index: 100;position: relative;">
                <router-link to="/start-fundraising">Start Campaign</router-link>
            </Button>
           </div>
        </div>
        <Wrap class="!my-0">
            <img  :src="HeroImg" alt="Hero" class="w-full mt-5 absolute right-0 left-0 bottom-0 sm:-bottom-9 md:-bottom-9 max-w-[89rem] mx-auto object-contain">
        </Wrap>
    </Wrap>
</template>
<script setup>
import { ref } from 'vue';
import Wrap from '@components/General/Wrap.vue';
import Button from '@components/General/Button.vue';
import HeroImg from '@assets/HeroImg.png';

const go = () => {window.location = '/start-fundraising'}
</script>