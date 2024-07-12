<template>
    <div class="bg-img flex items-center justify-center py-20 px-4">
        <div class="max-w-2xl mx-auto flex flex-col items-center justify-center w-full">
            <img src="../../assets/logo-transparennt.png" alt="">
            <div class="border-4 border-white rounded-3xl p-4 sm:p-10 mt-10 bg-white/40 w-full flex flex-col items-center">
                <nav aria-label="Progress">
                    <ol role="list" class="flex items-center">
                        <li v-for="(step, stepIdx) in steps" :key="step.name"
                            :class="[stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : '', 'relative']">
                            <template v-if="step.status === 'complete'">
                                <div class="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div class="h-0.5 w-full bg-primary" />
                                </div>
                                <a href="#"
                                    class="relative flex h-6 w-6 items-center justify-center rounded-full bg-primary hover:bg-indigo-900">
                                    <CheckIcon class="h-4 w-4 text-white" aria-hidden="true" />
                                    <span class="sr-only">{{ step.name }}</span>
                                </a>
                            </template>
                            <template v-else-if="step.status === 'current'">
                                <div class="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div class="h-0.5 w-full bg-gray-200" />
                                </div>
                                <a href="#"
                                    class="relative flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary bg-white"
                                    aria-current="step">
                                    <span class="text-xs text-primary font-medium">{{ step.name }}</span>
                                </a>
                            </template>
                            <template v-else>
                                <div class="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div class="h-0.5 w-full bg-gray-200" />
                                </div>
                                <a href="#"
                                    class="group relative flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary bg-white hover:border-gray-400">
                                    <span class="text-xs text-primary font-medium">{{ step.name }}</span>
                                </a>
                            </template>
                        </li>
                    </ol>
                </nav>
                <div class="grid grid-cols-1 w-full pt-5">
                    <div v-for="step in steps" :key="step.name" class="">
                        <Step2 v-if="step.name === '01' && step.status === 'current'"
                            :title="campaign.title" 
                            :bio="campaign.bio" 
                        />
                        <Step3 v-if="step.name === '02' && step.status === 'current'" 
                            :goal="campaign.goal"
                            :startDate="(new Date(campaign.startDate * 1E3).toISOString().split('T')[0])"
                            :endDate="(new Date(campaign.endDate * 1E3).toISOString().split('T')[0])"
                            :category="campaign.selectedCategories"
                        />
                        <Step4 v-if="step.name === '03' && step.status === 'current'" 
                            :img="campaign.img"
                            :youtube="campaign.youtube"
                            :facebook="campaign.facebook"
                            :twitter="campaign.twitter"
                            :linkedin="campaign.linkedin"
                        />
                        <Step5 v-if="step.name === '04' && step.status === 'current'" 
                            :img="campaign.legalImg"
                            :check_1="campaign.check_1"
                            :check_2="campaign.check_2"
                        />
                        <Step6 v-if="step.name === '05' && step.status === 'current'" 
                            :title="campaign.title" 
                            :bio="campaign.bio" 
                            :goal="campaign.goal"
                            :startDate="(new Date(campaign.startDate * 1E3).toISOString().split('T')[0])"
                            :endDate="(new Date(campaign.endDate * 1E3).toISOString().split('T')[0])"
                            :selectedCategories="campaign.selectedCategories"
                            :img="campaign.img"
                            :youtube="campaign.youtube"
                            :facebook="campaign.facebook"
                            :twitter="campaign.twitter"
                            :linkedin="campaign.linkedin"
                            :check_1="campaign.check_1"
                            :check_2="campaign.check_2"
                            :check_3="campaign.check_3"
                            :legalImg="campaign.legalImg"
                        />
                    </div>
                </div>
                <div class="flex justify-start space-x-4 mt-4 w-full max-w-xs mr-auto mt-5" style='display:none'>
                    <Button v-if="currentStep > 0"  class=""
                        :disabled="currentStep === 0">Previous</Button>
                    
                    <Button  :disabled="currentStep === steps.length - 1" class="w-full" InnerBgColor="bg-gradient-to-r from-primary to-secondary" classBg="bg-gradient-to-r from-primary to-secondary" bgColor="text-white">
                        {{ currentStep === steps.length - 1 ? "Publish" : "Continue"  }}
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { CheckIcon } from '@heroicons/vue/20/solid';
import Step2 from '../StartFunding/Steps/Step2.vue';
import Step3 from '../StartFunding/Steps/Step3.vue';
import Step4 from '../StartFunding/Steps/Step4.vue';
import Step5 from '../StartFunding/Steps/Step5.vue';
import Step6 from '../StartFunding/Steps/Step6.vue';
import Button from '@components/General/Button.vue';
import axios from 'axios'
import { msg, isURL, AUTH_HEADERS, getWallet} from '../../utils/utils';
import { createCampaign } from '../../utils/stellar';
import { API_URL, ContractId} from '../../utils/constant';
const steps = ref([
    { name: '01', href: '#', status: 'current'  },
    { name: '02', href: '#', status: 'upcoming' },
    { name: '03', href: '#', status: 'upcoming' },
    { name: '04', href: '#', status: 'upcoming' },
    { name: '05', href: '#', status: 'upcoming' },
]);
const currentStep = ref(0); // Assuming step 3 is the current step
const currTime = (new Date()).getTime() / 1E3;
const campaign = ref({
    title:"", bio:"",
    goal:0, startDate:currTime, endDate:currTime, selectedCategories:[],
    imgObj:null, img:"", youtube:"", facebook:"", linkedin:"", twitter:"",
    legalImg:"", legalImgObj:null, check_1:false, check_2:false, check_3:false
})

/* hear */
hear('x-submit-step', (e) => {  
    if(e.type == 'next') { 
        if (currentStep.value < steps.value.length - 1) {
            steps.value[currentStep.value].status = 'complete';
            currentStep.value++;
            steps.value[currentStep.value].status = 'current';
            //get the values gotten
            readStepValues(e)
        }
    }
    else if(e.type == 'previous') {  
        if (currentStep.value > 0) {
            steps.value[currentStep.value].status = 'upcoming';
            currentStep.value--;
            steps.value[currentStep.value].status = 'current';
        }
    }
    else if(e.type == 'publish') {
        newCampaign()
    }
}) 

/* new campaign */
const newCampaign = async () => {
    /* do validations */
    const walletKey = await getWallet()
    if(walletKey != "") {
        if(!campaign.value.imgObj){
            msg('Select a cover photo', 'error')
            return;
        }
        /*if(!campaign.value.legalImgObj){
            msg('Uplaod a legal image cover', 'error')
            return;
        }*/
        if((campaign.value.goal * 1) <= 0){
            msg('Please set the campaign goal', 'error')
            return;
        }
        const flg = isURL(campaign.value.youtube) && isURL(campaign.value.facebook) && isURL(campaign.value.twitter) && isURL(campaign.value.linkedin)
        if(flg) {
            speak('x-publish', true)
            const formData = new FormData()
            //append the bio
            formData.append('title', campaign.value.title)
            formData.append('bio', campaign.value.bio)
            formData.append('goal', campaign.value.goal)
            formData.append('start_date', campaign.value.startDate)
            formData.append('end_date', campaign.value.endDate)
            formData.append('category', campaign.value.selectedCategories.join(","))
            if(campaign.value.imgObj){
                    formData.append('cover', campaign.value.imgObj)
            }
            if(campaign.value.legalImgObj){
                    formData.append('legal_cover', campaign.value.legalImgObj)
            }
            formData.append('socials', JSON.stringify({
                    youtube:campaign.value.youtube,
                    facebook:campaign.value.facebook,
                    twitter:campaign.value.twitter,
                    linkedin:campaign.value.linkedin,
            }))
            formData.append('contract', ContractId)
            //create the campaign
            axios.post(`${API_URL}?type=new_campaign`, AUTH_HEADERS(formData))
            .then(async (response) => {   
                    if(response.data.status) {
                        //create the campaign via smart contract
                        const res = await createCampaign({
                            owner:walletKey,
                            id:response.data.id,
                            start:campaign.value.startDate,
                            end:campaign.value.startDate
                            }, walletKey)
                        if(res !== false) {
                            speak('x-publish', false)
                            if(res.status === 'done') {
                                msg('Created successfully', 'good')
                                //redirect to campaign page
                                setTimeout(() => {
                                    window.location = '/charitydetail?id=' + response.data.id
                                })
                            }
                            else if(res.status === 'lessdate') {
                                msg('The end date has to be beyond today', 'fail')
                            }
                            else if(res.status === 'samedate') {
                                msg('The end date has to be beyond the start date', 'fail')
                            }
                            else {
                                msg('Blockchain error. Try again later', 'fail')
                            }
                        }
                        else {
                            speak('x-publish', false)
                            msg('Unable to create campaign', 'fail')
                        }
                    }
                    else if(response.data['AUTH'] === false){
                        speak('x-publish', false)
                        msg('Session has expired', 'error')
                        setTimeout(() => {
                            window.location = '/login'
                        }, 2000)
                    }
                    else {
                        msg('Something went wrong', 'error')
                        speak('x-publish', false)
                    }
            })
            .catch((error) => {
                console.error(error); // Log the error to the console for debugging
                speak('x-publish', false)
                msg('Something went wrong', 'error')
            });
        }
        else {
            msg('Invalid social media links', 'error')
        }
    }
    else {
        msg('Connect wallet first', 'fail')
    }
}
const readStepValues = (e) => {
    if(e.step == 1) {
        //read title and bio
        campaign.value.title = e.data.title
        campaign.value.bio = e.data.bio
    }
    else if(e.step == 2) {   
        campaign.value.goal = e['data']['goal']
        campaign.value.startDate = e['data']['startDate']
        campaign.value.endDate = e['data']['endDate']
        campaign.value.selectedCategories = e['data']['categories']
    }
    else if(e.step == 3) {   
        if(e['data']['imgObj']){  
            campaign.value.imgObj = e['data']['imgObj']
        }  
        campaign.value.img = e['data']['img']
        campaign.value.twitter = e['data']['twitter']
        campaign.value.facebook = e['data']['facebook']
        campaign.value.linkedin = e['data']['linkedin']
        campaign.value.youtube = e['data']['youtube']
    }
    else if(e.step == 4) {    
        if(e['data']['imgObj']){  
            campaign.value.legalImgObj = e['data']['imgObj']
        }  
        campaign.value.legalImg = e['data']['img']
        campaign.value.check_1 = e['data']['check_1']
        campaign.value.check_2 = e['data']['check_2']
        campaign.value.check_3 = e['data']['check_3']
    }
}
</script>

<style >
.bg-img {
    background-image: url('../../assets/StartFundraising.png');
    background-size: cover;
    background-position:fixed;
    background-repeat: no-repeat;
    min-height: 100vh;
    width: 100%;
}
</style>