<template>
    <div>
        <Navbar />
        <Hero />
        <Popular  title="Popular Fundraisers" />
        <Help />
        <Popular title="Urgent Cause" types="urgent" />
        <Feature />
        <FAQs />
        <Footer />
    </div>
</template>
<script setup>
import Navbar from '@components/Home/Navbar.vue';
import Hero from '@components/Home/Hero.vue';
import Popular from '@components/Home/Popular.vue';
import Help from '@components/Home/Help.vue';
import Feature from '@components/Home/Feature.vue';
import FAQs from '@components/Home/FAQs.vue';
import Footer from '@components/Home/Footer.vue';

</script>