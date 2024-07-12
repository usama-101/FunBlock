<template>
    <SidebarLayout>
        <div class="md:col-span-full">
                <div class="flex flex-col sm:flex-row gap-y-3 sm:items-center sm:justify-between">
                    <p class="heading font-semibold">Campaign Management</p>
                  <div class="flex items-center justify-end gap-2 flex-1">
                        <!-- <select
                            class="flex-1 palceholder:text-xs bg-white block w-full sm:max-w-[200px] rounded-lg border-0 px-3 py-2.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-primary-600 sm:text-sm text-gray-400 sm:leading-6"
                            name="" id="">
                            <option selected value="">All</option>
                            <option value="">Monthly</option>
                            <option value="">Yearly</option>
                        </select> -->
                        <select @input="filterValue($event)"
                            class="flex-1 palceholder:text-xs bg-white block w-full sm:max-w-[200px] rounded-lg border-0 px-3 py-2.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-primary-600 sm:text-sm text-gray-400 sm:leading-6"
                            name="" id="">
                            <option selected value="all">All</option>
                            <option  value="weekly">Weekly</option>
                            <option  value="monthly">Monthly</option>
                            <option value="yearly">yearly</option>
                        </select>
                  </div>
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
                                                <th scope="col"
                                                    class="px-3 py-3.5 text-left text-lg font-medium text-gray-900">Approve/Reject
                                                </th>
                                                <th scope="col"
                                                    class="px-3 py-3.5 text-left text-lg font-medium text-gray-900">Actions
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
                                                    <span v-if="person.status == 'reject'" class="inline-flex items-center rounded-md bg-red-100 px-3 py-0.5 text-sm font-light text-purple-700">Rejected</span>
                                                </td>
                                                <td class="whitespace-nowrap px-3 py-4 text-md  font-normal text-gray-500">
                                                    <span @click="aCampaign(person.id)" v-if="person.status == 'pending'" style="cursor:pointer" class="text-green-500 px-3 py-1 rounded-md">{{ approveValue[person.id]  }}</span>
                                                    <span @click="rCampaign(person.id)" v-if="person.status == 'pending' " style="cursor:pointer" class="text-red-500 px-3 py-1 rounded-md">{{ rejectValue[person.id] }}</span>
                                                </td>
                                                <td class="whitespace-nowrap px-3 py-4 text-sm  font-normal text-gray-500 flex items-center justify-start gap-x-3">
                                                    <router-link to="/editproduct" class="bg-blue-50 rounded-full p-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                            </svg>
                                                    </router-link>
                                                    <button @click="dCampaign(person.id)" class="bg-red-600 rounded-full p-1 text-white">
                                                        <svg v-if="!deleteValue[person.id]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                        </svg>
                                                        <span v-else>...</span>
                                                    </button>
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
    </SidebarLayout>
</template>

<script setup>
import SidebarLayout from "../../layouts/SidebarLayout.vue";
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { getAllAdminCampaign, approveCampaign, rejectCampaign, deleteCampaign} from '../../utils/api';
import { msg, goTo, E, fNum } from '../../utils/utils';

const people = ref([]);
const approveValue = ref([])
const rejectValue = ref([])
const deleteValue = ref([])
let campaignDet = []
let currentSel = 'all'


//to approve campaign
const aCampaign = async (cid) => {
    if(cid != "") { 
        approveValue.value[cid] = 'Approving'
        const isApprove = await approveCampaign(cid);  
        approveValue.value[cid] = 'Approve'
        if(isApprove !== false) {
            if(isApprove.status) {
                msg('Campaign approved', 'good')
                approveValue.value[cid] = 'Approved'
                reload(cid,'active')
            }
            else if(!isApprove['AUTH']){
                msg('Session has expired', 'fail')
                window.location = '/admin/login'
            }
            else {
                msg('Something went wrong', 'fail')
            }
        }
        else {
            msg('Network error', 'fail')
        }
    }
}
//to reject campaign
const rCampaign = async (cid) => {
    if(cid != "") {
        rejectValue.value[cid] = 'Rejecting'
        const isReject = await rejectCampaign(cid)
        rejectValue.value[cid] = 'Reject'
        if(isReject !== false) {
            if(isReject['status']) {
                msg('Campaign rejected', 'good')
                rejectValue.value[cid] = 'Rejected'
                reload(cid,'reject')
            }
            else if(!isReject['AUTH']){
                msg('Session has expired', 'fail')
                window.location = '/admin/login'
            }
            else {
                msg('Something went wrong', 'fail')
            }
        }
        else {
            msg('Network error', 'fail')
        }
    }
}
//to delete campaign
const dCampaign = async (cid) => {
    if(cid != "" && confirm("Do you want to delete this campaign.")) {
        deleteValue.value[cid] = true
        const isDelete = await deleteCampaign(cid)
        deleteValue.value[cid] = false
        if(isDelete !== false) {
            if(isDelete['status']) {
                msg('Campaign deleted', 'good')
                reload(cid,'delete')
            }
            else if(!isReject['AUTH']){
                msg('Session has expired', 'fail')
                window.location = '/admin/login'
            }
            else {
                msg('Something went wrong', 'fail')
            }
        }
        else {
            msg('Network error', 'fail')
        }
    }
}
//filter campaign
const filterValue = (event) => {
    const sel = event.target.value
    currentSel = sel
    people.value = [] //clear it
    if(Object.keys(campaignDet[sel]).length > 0) {  
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
//reloadit
const reload = (cid, status) => {
    const sel = currentSel
    people.value = [] //clear it
    if(Object.keys(campaignDet[sel]).length > 0) {  
        const campaigns = (sel != 'all') ? campaignDet[sel][Object.keys(campaignDet[sel])[0]] : campaignDet[sel]
        //filetr by date
        campaigns.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        //loop through
        for(let i=0;i<campaigns.length;i++) {
            if(status == 'delete' && campaigns[i].cid == cid){
                //remove it
                delete campaigns[i];
                continue;
            }
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
                status:(campaigns[i].cid == cid) ? status : campaigns[i].status
            })
            if(campaigns[i].cid == cid){campaigns[i].status = status}
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
                approveValue.value[campaigns['all'][i].cid] = 'Approve'
                rejectValue.value[campaigns['all'][i].cid] = 'Reject'
                deleteValue.value[campaigns['all'][i].cid] = false
            }
        }
    }
    else {
        //retry after 1.5 secs
        setTimeout(() => {
            getCampaign()
        }, 1500)
    }
}

getCampaign()
</script>