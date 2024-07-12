<template>
    <SidebarLayout>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <p class="heading md:col-span-full font-semibold">Quick Stats</p>
            <div v-for="(widget, index) in widgets" :key="index"
                class="bg-white rounded-3xl px-3 pt-4 sm:pt-4 pb-4 sm:pb-14 space-y-6 shadow-xl border border-gray-100 text-center">
                <select @input="selectValue($event)" class="palceholder:text-xs bg-white block w-fit ml-auto rounded-lg border-0 font-light px-3 pr-7 py-0 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-200 focus:ring-inset focus:ring-primary-600 sm:text-sm text-gray-400 sm:leading-6"
                        name="" :id="widget.key">
                        <option selected value="all">all</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                </select>
                <h1 :id="widget.keyvalue" class="text-primary text-3xl sm:text-5xl font-semibold">{{ widget.value }}</h1>
                <p class="text-md sm:text-lg font-semibold">{{ widget.title }}</p>
            </div>
            <div class="md:col-span-full">
                <div class="flex flex-col sm:flex-row gap-y-3 sm:items-end sm:justify-between">
                    <p class="heading font-semibold">All Campaigns</p>
                    <select @input="filterValue($event)"
                        class="palceholder:text-xs bg-white block w-full sm:max-w-[200px] rounded-md border-0 px-3 py-2.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-primary-600 sm:text-sm text-gray-400 sm:leading-6"
                        name="" id="">
                        <option value="all">All</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                </div>
                <div class="">
                    <div class="mt-6 flow-root">
                        <div class="-mx-0 sm:-mx-2 -my-2 overflow-x-auto">
                            <div class="inline-block min-w-full py-2 align-middle px-1  sm:px-4">
                                <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-xl">
                                    <table class="min-w-full divide-y divide-gray-300 table-fixed">
                                        <thead class="bg-white">
                                            <tr>
                                                <th scope="col"
                                                    class="py-3.5 pl-4 pr-3 text-left text-lg font-medium text-gray-900 sm:pl-6">
                                                    Name</th>
                                                <th scope="col"
                                                    class="py-3.5 pl-4 pr-3 text-left text-lg font-medium text-gray-900 sm:pl-6">
                                                    Date</th>
                                                <th scope="col"
                                                    class="px-3 py-3.5 text-left text-lg font-medium text-gray-900">Donations
                                                </th>
                                                <th scope="col"
                                                    class="px-3 py-3.5 text-left text-lg font-medium text-gray-900">Views
                                                </th>
                                                <th scope="col"
                                                    class="px-3 py-3.5 text-left text-lg font-medium text-gray-900">Status
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody class="divide-y divide-gray-200 bg-white">
                                            <tr class="even:bg-blue-50 even:bg-opacity-80" v-for="person in people" :key="person.email">
                                                <td
                                                    class="whitespace-nowrap py-4 pl-4 pr-3 text-md font-normal text-gray-800 sm:pl-6 truncate max-w-xs">
                                                    {{ person.name }}</td>
                                                <td
                                                    class="whitespace-nowrap py-4 pl-4 pr-3 text-md font-normal text-gray-500 sm:pl-6">
                                                    {{ person.date }}</td>
                                                <td class="whitespace-nowrap px-3 py-4 text-md font-normal text-gray-500">{{person.donations }}</td>
                                                <td class="whitespace-nowrap px-3 py-4 text-md  font-normal text-gray-500">{{person.views }}</td>
                                                <td class="whitespace-nowrap px-3 py-4 text-md  font-normal text-gray-500">
                                                    <span v-if="person.status  == 'pending'" class="inline-flex items-center rounded-md bg-red-100 px-3 py-0.5 text-sm font-light text-red-700">Pending</span>
                                                    <span v-if="person.status == 'active'" class="inline-flex items-center rounded-md bg-green-100 px-3 py-0.5 text-sm font-light text-green-700">Active</span>
                                                    <span v-if="person.status == 'paused'" class="inline-flex items-center rounded-md bg-yellow-100 px-3  py-0.5 text-sm font-light text-yellow-800">Paused</span>
                                                    <span v-if="person.status == 'completed'" class="inline-flex items-center rounded-md bg-purple-100 px-3 py-0.5 text-sm font-light text-purple-700">Completed</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </SidebarLayout>
</template>

<script setup>
import SidebarLayout from "@layouts/SidebarLayout.vue";
import { ref } from "vue";
import bannerImg from '@assets/fundbanner.jpg'
import { getAdminProfile, getAdminStats, getAllAdminCampaign} from '../../utils/api';
import { msg, goTo, E, fNum } from '../../utils/utils';

const widgets = ref([
    {
        image: '',
        title: "Active Campaigns",
        value: '..',
    },
    {
        image: '',
        title: "New Donations",
        value: '..',
    },
    {
        image: '',
        title: "Total Users",
        value: '..',
    },
    {
        image: '',
        title: "Notifications",
        value: '..',
    },
]);
const statDet = ref(null)
let campaignDet = null
const people = ref([])
const adminDet = ref({})
const isLoadedCampaign = ref(false)

/* Clicks */
const selectValue = (event) => {
    const id = event.target.id
    const selId = id.substring(0, id.indexOf('_'))
    //get the selected
    const sel = E(id).value.toLowerCase()
    if(sel == 'all'){
        E(id.replace('key', 'value')).innerText = ((selId == 'donations') ? '$' : "") + (statDet.value[selId][sel] || '0')
    }
    else {
        if(statDet.value[selId][sel]){
            E(id.replace('key', 'value')).innerText = ((selId == 'donations') ? '$' : "") + statDet.value[selId][sel][Object.keys(statDet.value[selId][sel])[0]] || '0'
        }
        else {
            E(id.replace('key', 'value')).innerText = ((selId == 'donations') ? '$' : "") +  '0'
        }
        
    }
}
const filterValue = (event) => {
    const sel = event.target.value
    people.value = [] //clear it
    if(Object.keys(campaignDet[sel]).length > 0) { console.log(campaignDet[sel])
        const campaigns = (sel != 'all') ? campaignDet[sel][Object.keys(campaignDet[sel])[0]] : campaignDet[sel]
        //filetr by date
        campaigns.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        //loop through
        for(let i=0;i<campaigns.length;i++) {
            people.value.push({
                id:campaigns[i].cid,
                name:campaigns[i].title,
                date:(new Date(campaigns[i].date)).toLocaleDateString('en-US', {
                            weekday: 'short', 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                }),
                views:fNum(campaigns[i].views),
                donations:'$' + Number(campaigns[i].amount).toLocaleString(),
                status:campaigns[i].status
            })
            }
    }
}
//load campaigns 
const getCampaign = async () => {
    let campaigns = await getAllAdminCampaign();
    if(campaigns) {   
        campaignDet = campaigns
        if(campaigns['all'].length > 0) {
            //filetr by date
            campaigns['all'].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            //loop through
            for(let i=0;i<campaigns['all'].length;i++) {
                people.value.push({
                    id:campaigns['all'][i].cid,
                    name:campaigns['all'][i].title,
                    date:(new Date(campaigns['all'][i].date)).toLocaleDateString('en-US', {
                            weekday: 'short', 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                    }),
                    views:fNum(campaigns['all'][i].views),
                    donations:'$' + Number(campaigns['all'][i].amount).toLocaleString(),
                    status:campaigns['all'][i].status
                })
            }
        }
        isLoadedCampaign.value = true
    }
    else {
        //retry after 1.5 secs
        setTimeout(() => {
            getCampaign()
        }, 1500)
    }
}
//load admin stats 
const getStats = async () => {
    const stats = await getAdminStats();  
    if(stats) { 
        widgets.value = [
            {
                image: '',
                title: "Active Campaigns",
                value: stats['campaign']['all'] || '0',
                key:"campaign_key",
                keyvalue:"campaign_value"
            },
            {
                image: '',
                title: "New Donations",
                value: `$${stats['donations']['all'] || '0'}`,
                key:"donations_key",
                keyvalue:"donations_value"
            },
            {
                image: '',
                title: "Total Users",
                value: stats['users']['all'] || '0',
                key:"users_key",
                keyvalue:"users_value"
            },
            {
                image: '',
                title: "Notifications",
                value: stats['notification']['all'] || '0',
                key:"notification_key",
                keyvalue:"notification_value"
            },
        ]
        statDet.value = stats;  
        
    }
    else {
        //retry it
        setTimeout(() => {
            getStats()
        }, 2000)
    }
}
//load admin profile
const setUp = async () => {
    //first load local user details
    let admin = JSON.parse(localStorage.getItem('x-admin') || '{}')
    if(admin['token']) {adminDet.value = admin}
    //load profile details from server
    admin = await getAdminProfile()
    if(admin['token']) { 
        //there is info
        localStorage.setItem('x-admin', JSON.stringify(admin))
        adminDet.value = admin
        getStats()
        getCampaign()
        //update all components of new changes
        speak('x-admin', admin)
    }
    else if(!admin['AUTH']) {
        //show logout error
        msg('Session has expired', 'error')
        localStorage.setItem('x-admin', '{}')
        setTimeout(() => {
            window.location = '/admin/login'
        }, 2000)
    }
}

setUp()
</script>
