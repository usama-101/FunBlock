<template>
    <div class="">
        <Navbar />
        <CharityDetail title="Usama Charity Campaign" />
        <div class="max-w-7xl mx-auto">
            <Popular title="Lorem ipsum dolor sit amet et delectus" />
        </div>
        <Footer />
    </div>
</template>
<script setup>
import Navbar from '@components/Home/Navbar.vue';
import CharityDetail from '@components/charityDetail/charityDetail.vue';
import Popular from '@components/Home/Popular.vue';
import Footer from '@components/Home/Footer.vue';

</script>