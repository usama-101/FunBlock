<template>
    <Wrap class="mx-auto">
        <div class="relative grid md:grid-cols-2 place-items-center">
            <div class=" max-w-lg mx-auto">
                <h1 class="text-4xl font-semibold">Featured Story</h1>
                <p class="text-lg my-4">
                    Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae legendos at vix ad putent delectus delicata usu. Vidit dissentiet eos cu eum an brute copiosae hendrerit.
                    <br>
                    Eos erant dolorum an. Per facer affert ut. Mei iisque mentitum moderatius cu. Sit munere facilis accusam eu dicat falli consulatu at vis. Te facilisis mnesarchum qui posse omnium mediocritatem est cu.
                </p>
                <Button InnerBgColor="bg-gradient-to-r from-primary to-secondary" classBg="bg-gradient-to-r from-primary to-secondary" bgColor="text-white">
                    <router-link to="/start-fundraising">Start Campaign</router-link>
                </Button>
            </div>
            <div class="">
                <img class="" :src="Nim" alt="">
            </div>
        </div>
    </Wrap>
</template>
<script setup>
import Wrap from '@components/General/Wrap.vue';
import Button from '@components/General/Button.vue';
import Nim from '@assets/Glow.png';
</script>