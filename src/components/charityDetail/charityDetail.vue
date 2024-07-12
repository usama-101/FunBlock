<template>
    <div class="">
        <Wrap class="max-w-7xl mx-auto my-0">
            <div class="">
                <h1 class="text-3xl font-medium"> {{ (proposals[0] || {}).title }}</h1>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-2 my-10">
                    <div v-if="proposals.length > 0 && !loading" v-for="(proposal, index) in proposals" :key="index"
                        class="bg-white shadow-xl p-4 rounded-xl overflow-hidden col-span-2">
                        <img class="w-full h-auto object-contain rounded-xl " :src="proposal.src" alt="">
                        <div class="bg-white w-full h-3 shadow-md border border-gray-100 rounded-full my-4">
                            <div :style="proposal.style" class="bg-gradient-to-r from-primary to-secondary rounded-full h-3"></div>
                        </div>
                        <h1 class="text-xl">${{ proposal.raised }} raised</h1>
                        <span class="text-gray-400 font-light text-sm">Created {{ proposal.date.toLocaleDateString('en-US', {
                            weekday: 'short', 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                        })}}</span>
                        <p :class="{ 'font-light mt-4': readMore, 'font-light mt-4 line-clamp-4': !readMore }">{{proposal.description }}</p>
                        <button v-if="proposal.description.length > 10" class="text-primary underline font-light py-1 leading-9" @click="toggleReadMore">{{readMore ? 'Read Less' : 'Read More' }}</button>
                        <div
                            class="flex items-center gap-6 space-y-4 my-4 py-4 bg-white shadow-xl px-4 py-6 rounded-xl overflow-hidden">
                            <h1 class="text-2xl font-semibold max-w-sm mx-auto text-center">Give $10 to help get this fundraiser to its goal</h1>
                            <Button class="" InnerBgColor="bg-gradient-to-r from-primary to-secondary"
                                classBg="bg-gradient-to-r from-primary to-secondary" bgColor="text-white">
                                Make a Donation
                            </Button>
                        </div>
                    </div>
                    <div v-else-if="!loading">
                        <center>Nothing found</center>
                    </div>
                    <div v-else-if="loading" class="bg-white shadow-xl p-4 rounded-xl overflow-hidden col-span-2">
                        <img class="w-full h-auto object-contain rounded-xl " alt="">
                        <div class="bg-white w-full h-3 shadow-md border border-gray-100 rounded-full my-4">
                            <div class="bg-gradient-to-r from-primary to-secondary rounded-full h-3"></div>
                        </div>
                        <h1 class="text-xl">...</h1>
                        <span class="text-gray-400 font-light text-sm"></span>
                        <div
                            class="flex items-center gap-6 space-y-4 my-4 py-4 bg-white shadow-xl px-4 py-6 rounded-xl overflow-hidden">
                            <h1 class="text-2xl font-semibold max-w-sm mx-auto text-center">Give $10 to help get this fundraiser to its goal</h1>
                            
                        </div>
                    </div>
                    <div class="bg-white shadow-xl px-4 py-6 rounded-xl overflow-hidden md:col-span-1">
                        <div class="flex items-center justify-between gap-4 mt-2">
                            <Button class="w-full" InnerBgColor="bg-gradient-to-r from-primary to-secondary"
                                classBg="bg-gradient-to-r from-primary to-secondary" bgColor="text-white">
                                Donate
                            </Button>
                        </div>
                        <h1 class="text-xl font-medium mt-4">Comments</h1>
                        <div class="space-y-4 my-4 py-4 bg-white shadow-xl px-4 py-6 rounded-xl overflow-hidden">
                            <div v-if="items.length > 0 && !isLoading" v-for="(item, index) in items" :key="index" class="border-b border-gray-200 py-3">
                                <div class="flex items-center gap-3">
                                    <img class="bg-gray-100 w-10 h-10 rounded-full" :src="item.imgSrc" alt="">
                                    <h2 class="text-sm font-medium">{{ item.name }}</h2>
                                </div>
                                <div class="text-gray-900 font-light mt-1">
                                    {{ item.description }}
                                </div>
                            </div>
                            <div v-else-if="isLoading">
                                <center>Getting comments...</center>
                            </div>
                            <div v-else-if="!isLoading">
                                <center>Nothing found</center>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Wrap>
    </div>
</template>

<script setup>
import Wrap from '@components/General/Wrap.vue';
import { ref } from 'vue';
import bannerImg from '@assets/fundbanner.jpg'
import { defineProps } from 'vue';
import Button from '@components/General/Button.vue';
import { getCampaign, getCampaignComments } from '../../utils/api';
import { getWallet, msg } from '../../utils/utils';
import { PROFILE_LOGO } from '../../utils/constant';

const walletKey = ref("")
const readMore = ref(false);
const loading = ref(true)
const isLoading = ref(true)
const toggleReadMore = () => {
    readMore.value = !readMore.value;
};

const props = defineProps({
    title: {
        type: String,
        default: ''
    }
});
const proposals = ref([]);
const items = ref([]);

//load comments details
const getComments = async () => {
    //fetch the campaign detail
    const url = new URLSearchParams((new URL(window.location.href)).search)
    const cid = url.get('id') || ""
    if(cid != "") { 
        const comments = await getCampaignComments(cid)
        isLoading.value = false
        items.value = []
        if(comments) {  
            if(comments['data'].length > 0) {
                for(let i=0;i<comments['data'].length;i++) {
                    const res = comments['data'][i]
                    items.value.push({
                        name:res.user,
                        description:res.msg,
                        imgSrc:res.img || PROFILE_LOGO
                    })
                }
            }
        }
        else {
            //reload it
            setTimeout(() => {
                getComments()
            }, 1500)
        }
    }
}
//load campaign details
const setUp = async () => {
    //fetch the campaign detail
    const url = new URLSearchParams((new URL(window.location.href)).search)
    const cid = url.get('id') || ""
    if(cid != "") { 
        const campaign = await getCampaign(cid)
        loading.value = false
        proposals.value = [
            {
                title:campaign['title'],
                description: campaign['bio'],
                src: campaign['img'] || bannerImg ,
                raised: campaign['amount'],
                date:(new Date(campaign['date'])),
                style: `width:${(100/(campaign['goal']*1)) * Number(campaign['amount'])}%`
            },
        ]
    }
    else {
        //redirect to homepage
        window.location = "/"
    }
}

setUp()
getComments()
</script>