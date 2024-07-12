<template>
    <Wrap v-if="isLoaded" class="max-w-7xl mx-auto mt-40">
        <h1 class="text-3xl font-bold"> {{ title }}</h1>
        <div style="display: flex;">
            <button class="scroll-button bg-gradient-to-r from-primary to-secondary left" @click="scrollLeft">
                <img :src="left" />
            </button>
            <div :id='prop_id' class="proposal_container gap-6 my-10" style="overflow-x:auto;display: flex;width:100%">
                <div v-for="(proposal , index) in proposals" :key="index" @click="() => {goTo(proposal.link)}" class="bg-white border border-gray-100 shadow p-4 rounded-xl overflow-hidden max-w-sm mx-auto" style='margin-bottom:20px;min-width: 300px;'>
                    <img class="w-full h-auto object-contain rounded-xl " :src="proposal.src" alt="">
                    <p class="font-medium mt-4 line-clamp-2 text-lg">{{ proposal.description }}</p>
                    <div data-v-6e4040ee="" class="relative h-3 bg-gray-100 rounded-full overflow-hidden my-4"><div data-v-6e4040ee="" class="bg-gradient-to-r from-primary to-secondary w-1/2 rounded-full h-full" style="width: 50%;"></div></div>
                    <h1 class="text-xl">${{ proposal.raised }} raised</h1>
                </div>
            </div>
            <button class="scroll-button bg-gradient-to-r from-primary to-secondary right" @click="scrollRight">
                <img :src="right" />
            </button>
        </div>
    </Wrap>
</template>
<script setup>
import Wrap from '@components/General/Wrap.vue';
import bannerImg from '@assets/fundbanner.jpg'
import right from '@assets/right.svg'
import left from '@assets/left.png'
import { ref } from 'vue';
import { defineProps } from 'vue';
import { goTo} from '../../utils/utils';
import { getAllCampaign } from '../../utils/api';

const isLoaded = ref(false)
const props = defineProps({
    title: {
        type : String,
        default : ''
    },
    types: {
        type : String,
        default : 'popular'
    }
});
const proposals = ref([]);
const prop_id = "proposals_" + Math.random() * 100000000
const scrollLeft = () => {
    const container = document.getElementById(prop_id);
    container.scrollBy({
        left: -100,  
        behavior: 'smooth'
    });
}

const scrollRight = () => {
    const container = document.getElementById(prop_id);
    container.scrollBy({
        left: +100,   
        behavior: 'smooth'
    });   
}
//fetch all the campaigns
const setUp = async () => {
    const campaigns = await getAllCampaign();  
    const url = new URLSearchParams((new URL(window.location.href)).search)
    const cid = url.get('id') || ""
    if(campaigns) {
        if(campaigns.length > 0) {
            //filetr by views in descending order
            if(props.types == 'popular') {
                campaigns.sort((a, b) => b.views - a.views)
            }
            else {
                campaigns.sort((a, b) => Number(b.amount - a.amount))
            }
            //loop through
            for(let i=0;i<campaigns.length && i <= 6;i++) {
                if(campaigns[i].cid != cid) {
                    proposals.value.push({
                        src:(campaigns[i].img != "") ? campaigns[i].img : bannerImg,
                        description:campaigns[i].bio,
                        raised:Number(campaigns[i].amount),
                        goal:Number(campaigns[i].goal),
                        style:`width:${(100/Number(campaigns[i].goal)) * Number(campaigns[i].amount) }%`,
                        link:`/charitydetail?id=${campaigns[i].cid}`
                    })
                }
            }
            isLoaded.value = true

        }
    }
    else {
        //retry after 1.5 secs
        setTimeout(() => {
            setUp()
        }, 1500)
    }
}
setUp()
</script>

<style>
.scroll-button {
    border: none !important;
    font-size: 24px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0px 5px 2px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s;
    background: #fff;
    flex-shrink: 0;
    margin-top: auto;
    margin-bottom: auto;
    z-index: 4;
    img {
        max-width: 20px;max-height: 20px;
    }
}
.left {
    margin-right: -25px;
}
.right{
    margin-left: -25px;
}
.proposal_container::-webkit-scrollbar {
    display: none;   
}
.proposal_container {
    scroll-behavior: smooth; 
    -ms-overflow-style: none;  
}
</style>