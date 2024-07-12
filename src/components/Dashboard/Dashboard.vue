<template>
    <div class="">
        <div class="flex flex-col lg:flex-row max-w-7xl mx-auto gap-4 min-h-[80vh]">
            <!-- Main Content -->
            <div class="lg:w-3/4 p-4 bg-white shadow rounded-lg p-4 cursor-pointer border border-gray-100/50">
                <div class="flex items-center gap-4 ">
                    <button class="block text-left pb-1 my-2  font-light tracking-wider text-gray-900"
                        :class="{ 'border-b-2 border-primary text-primary font-medium': activeTab === 'Fundraisers' }"
                        @click="activeTab = 'Fundraisers'">
                        Fundraisers
                    </button>
                    <button class="block text-left pb-1 my-2 font-light tracking-wider text-gray-900"
                        :class="{ 'border-b-2 border-primary text-primary font-medium': activeTab === 'Activity' }"
                        @click="activeTab = 'Activity'">
                        Activity
                    </button>
                    <button class="block text-left pb-1 my-2 font-light tracking-wider text-gray-900"
                        :class="{ 'border-b-2 border-primary text-primary font-medium': activeTab === 'Comment' }"
                        @click="activeTab = 'Comment'">
                        Comment
                    </button>
                </div>
                <div class="py-5" v-if="activeTab === 'Fundraisers'">
                    <div v-if="fundraisers.length > 0" v-for="fundraiser in fundraisers" :key="fundraiser.id" @click="() => {goTo(`/charitydetail?id=${fundraiser.id}`)}"
                        class="mb-4 p-4 shadow border border-gray-100 rounded-lg flex flex-wrap lg:flex-nowrap items-start gap-4">
                        <img :src="fundraiser.image" alt="Fundraiser"
                            class="min-w-56 h-48 object-cover rounded-xl mb-2 ">
                        <div class="">
                            <p class="mb-2 text-lg font-light">{{ fundraiser.description }}</p>
                            <div class="relative h-3 bg-gray-100 rounded-full overflow-hidden my-4">
                                <div :style="{ width: fundraiser.progress + '%' }"
                                    class="bg-gradient-to-r from-primary to-secondary w-1/2 rounded-full h-full"></div>
                            </div>
                            <p class="mt-2 text-xl font-light">{{ fundraiser.amountRaised }} raised</p>
                        </div>
                    </div>
                    <div v-else-if="!isLoadedCampaign" >
                        Fetching campaigns...
                    </div>
                    <div v-else >
                        No campaign created
                    </div>
                </div>
                <div class="my-5" v-if="activeTab === 'Activity'">
                    <div v-if="items.length > 0" v-for="(item, index) in items" :key="index"
                        class="border-b border-purple-300">
                       <div :class="{ 'bg-purple-50': item.active }" class="rounded-xl py-4 flex items-start gap-4 px-4">
                        <img class="w-14 h-14 rounded-full object-cover border border-primary" :src="item.image" alt="">
                        <div class="flex flex-col gap-1 items-start justify-start">
                            <p class="font-extralight">
                                <span class="font-semibold mr-2">{{ item.name }}</span>
                                {{ item.message }}
                            </p>
                            <span class="font-extralight text-primary text-sm">{{ item.time }}</span>
                        </div>
                       </div>
                    </div>
                    <div v-else-if="!isLoadedStat" >
                        Fetching activities...
                    </div>
                    <div v-else >
                        No records yet
                    </div>
                </div>
                <div v-if="activeTab === 'Comment'">
                    <div v-if="comments.length > 0"  v-for="(item, index) in comments" :key="index"
                        class="border-b border-purple-300">
                       <div :class="{ 'bg-purple-50': item.active }" class="rounded-xl py-4 flex items-start gap-4 px-4">
                        <img class="w-14 h-14 rounded-full object-cover border border-primary" :src="item.image" alt="">
                        <div class="flex flex-col gap-1 items-start justify-start">
                            <p class="font-extralight">
                                <span class="font-semibold mr-2">{{ item.name }}</span>
                                {{ item.message }}
                            </p>
                            <span class="font-extralight text-primary text-sm">{{ item.time }}</span>
                        </div>
                       </div>
                    </div>
                    <div v-else-if="!isLoadedStat" >
                        Fetching comments...
                    </div>
                    <div v-else >
                        No records yet
                    </div>
                </div>
            </div>

            <!-- Sidebar Profile -->
            <div class="lg:w-1/4 p-4 bg-white border border-gray-100/50 shadow rounded-lg p-4 cursor-pointer">
                <div class="text-center mt-5 space-y-4">
                    <img :src="userDet.img || PROFILE_LOGO"
                        alt="" class="w-32 h-32 rounded-full mx-auto object-cover">
                    <h2 class="mt-2 text-xl font-semibold">
                        {{ userDet.firstname }}
                        {{ userDet.lastname }}
                    </h2>
                    <div class="flex items-center justify-center gap-3 my-3">
                        <a href=""><img class="w-10 h-10 object-contain shadow rounded-md" :src="Link1" alt=""></a>
                        <a href=""><img class="w-10 h-10 object-contain shadow rounded-md" :src="Link2" alt=""></a>
                        <a href=""><img class="w-10 h-10 object-contain shadow rounded-md" :src="Link3" alt=""></a>
                        <a href=""><img class="w-10 h-10 object-contain shadow rounded-md" :src="Link4" alt=""></a>
                        <a href=""><img class="w-10 h-10 object-contain shadow rounded-md" :src="Link5" alt=""></a>
                    </div>
                    <div class="text-left mt-8">
                        <h1 class="text-lg font-medium">About me</h1>
                        <p class="font-light">
                            {{ userDet.bio }}
                        </p>
                    </div>
                </div>
            </div>

        </div>
        <div
            class="bg-gradient-to-r from-primary to-secondary sm:rounded-t-full border-t py-4 sm:py-10 text-center col-span-5">
            <p class="text-lg font-normal text-white text-center">© 2024 BlockFund - Built on stellar</p>
        </div>
    </div>

</template>

<script setup>
import { ref } from 'vue';
import Link1 from '@assets/Frame 15.png';
import Link2 from '@assets/Frame 16.png';
import Link3 from '@assets/Frame 17.png';
import Link4 from '@assets/Frame 18.png';
import Link5 from '@assets/Frame 19.png';
import bannerImg from '@assets/fundbanner.jpg'
import { getProfile, getUserActivity, getUserComments, getAllCampaign } from '../../utils/api';
import { PROFILE_LOGO } from '../../utils/constant';
import { msg, goTo } from '../../utils/utils';

const activeTab = ref('Fundraisers');
const active = ref(true);
const fundraisers = ref([]);
let items = ref([]);
let comments = ref([]);
const userDet = ref({
    firstname:"", lastname: "", img:"", bio: ""
})
const isLoadedStat = ref(false)
const isLoadedCampaign = ref(false)

//load user activities and comments
const getUserActivityComments = async () => {
    const activities = await getUserActivity()
    if(activities) {
        const comment = await getUserComments()
        if(comment) {
            //reset the items
            items.value = []; comments.value = []
            activities['data'] = activities['data'] || []
            comment['data'] = comment['data'] || []
            if(activities['data'].length > 0) {
                for(let i=0;i<activities['data'].length;i++) {
                    const res = JSON.parse(activities['data'][i])
                    items.value.push({
                        name:res.name,
                        message:res.msg,
                        time:(new Date(res.date)).toLocaleDateString('en-US', {
                            weekday: 'short', 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                        }),
                        active:true,
                        image:res.img || PROFILE_LOGO
                    })
                }
            }
            //for comments
            if(comment['data'].length > 0) {
                for(let i=0;i<comment['data'].length;i++) {
                    const res = comment['data'][i]
                    comments.value.push({
                        name:res.name,
                        message:res.msg,
                        time:(new Date(res.date)).toLocaleDateString(),
                        active:true,
                        image:res.img || PROFILE_LOGO
                    })
                }
            }
            isLoadedStat.value = true
        }
        else {
            //retry comments
            setTimeout(() => {
                getUserActivityComments()
            }, 1500)
        }
    }
    else {
        //retry activities in the next 1 sec
        setTimeout(() => {
            getUserActivityComments()
        }, 1500)
    }
}
//load user campaigns
const getUserCampaigns = async () => {
    const campaigns = await getAllCampaign(userDet.value.id);
    if(campaigns) {   
        if(campaigns.length > 0) {
            //filetr by date
            campaigns.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            //loop through
            for(let i=0;i<campaigns.length && i <= 6;i++) {
                fundraisers.value.push({
                    id:campaigns[i].cid,
                    image:(campaigns[i].img != "") ? campaigns[i].img : bannerImg,
                    description:campaigns[i].bio,
                    amountRaised:Number(campaigns[i].amount),
                    progress:(100/Number(campaigns[i].goal)) * Number(campaigns[i].amount)
                })
            }
        }
        isLoadedCampaign.value = true
    }
    else {
        //retry after 1.5 secs
        setTimeout(() => {
            setUp()
        }, 1500)
    }
}
//load user profile
const setUp = async () => {
    //first load local user details
    let user = JSON.parse(localStorage.getItem('x-users') || '{}')
    if(user['token']) {userDet.value = user}
    //load profile details from server
    user = await getProfile()
    if(user['token']) { 
        //there is info
        localStorage.setItem('x-users', JSON.stringify(user))
        userDet.value = user
        await getUserCampaigns()
        //update all components of new changes
        speak('x-user', user)
    }
    else if(!user['AUTH']) {
        //show logout error
        msg('Session has expired', 'error')
        localStorage.setItem('x-users', '{}')
        setTimeout(() => {
            window.location = '/login'
        }, 2000)
    }
}

setUp()
getUserActivityComments()
</script>

<style scoped>
/* Add any custom styles here */
</style>