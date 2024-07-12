/** API FUNCTIONS */

import axios from "axios"
import { ADMIN_API_URL, API_URL, ContractId } from "./constant"
import { AUTH_HEADERS } from "./utils"
import { getCampaignChain, getAllCampaignsChain } from "./stellar"
import { getPublicKey } from "@stellar/freighter-api"

//get user profile details
export const getProfile = async () => {
    try{ 
        const res = await axios.post(API_URL + '?type=user&id=' + Math.random() * 100,
        AUTH_HEADERS()
        )
        if(res.status) { 
            return res.data
        }
        else {
            //network error
            return false
        }
    }
    catch(e) {return false}   
}
//get user activities 
export const getUserActivity = async () => {
    try{ 
        const res = await axios.post(API_URL + '?type=activity&id=' + Math.random() * 100,
        AUTH_HEADERS()
        )
        if(res.status) { 
            return res.data
        }
        else {
            //network error
            return false
        }
    }
    catch(e) {return false}   
}
//get user comments 
export const getUserComments = async () => {
    try{ 
        const res = await axios.post(API_URL + '?type=comments&id=' + Math.random() * 100,
        AUTH_HEADERS()
        )
        if(res.status) { 
            return res.data
        }
        else {
            //network error
            return false
        }
    }
    catch(e) {return false}   
}
//to add tx to activity
export const addTx = async (params) => {
    try {
        if(params.msg.trim() != "" && params.address != "") {
           //check if the url is http and from this domain
           const url = API_URL + "?type=add_tx&msg=" + encodeURIComponent(params.msg) + "&address=" + encodeURIComponent(params.address) + "&data=" + encodeURIComponent(params.data) + "&hash=" + encodeURIComponent(params.hash || "") 
           const res = await axios.post(url, AUTH_HEADERS())
           console.log(res)
           if(res.status) {
               return res.data
           }
           else {
               //network error
               return false
           }
       }
       else {return 2}
   } catch (error) { console.log(error)
       return false;
   }
}
//get campaign info 
export const getCampaign = async (campaignId = "") => {
    try{ 
        const res = await axios.post(API_URL + `?type=campaign&cid=${campaignId}&id=` + Math.random() * 100,
            AUTH_HEADERS()
        )
        if(res.status) { 
            //get its onchain info
            const chainInfo = await getCampaignChain(campaignId)
            if(chainInfo !== false) {
                return { ...res.data['data'], ...chainInfo }
            }
            return false
        }
        else {
            //network error
            return false
        }
    }
    catch(e) {return false}   
}
//get all campaign  
export const getAllCampaign = async (user_id = null) => {
    try{ 
        const res = await axios.post(API_URL + `?type=campaigns&contract=${ContractId}${(user_id != null) ? '&user_id=' + user_id : ''}&id=` + Math.random() * 100,
            AUTH_HEADERS()
        )
        if(res.status) { 
            //get its onchain info
            let idArr=[]
            if(res.data['data']){
                if(res.data['data'].length > 0){
                    for(let i=0;i<res.data['data'].length;i++){
                        idArr.push(res.data['data'][i].cid * 1)
                    }
                    const chainInfo = await getAllCampaignsChain(idArr); 
                    if(chainInfo !== false) {
                        let resp = []
                        //filter through
                        for(let i=0;i<chainInfo.length;i++) {
                            resp.push({...chainInfo[i], ...res.data['data'][idArr.indexOf(Number(chainInfo[i].id))]})
                        }
                        return resp
                    }
                }
            }
            return []
        }
        else {
            //no results
            return []
        }
    }
    catch(e) {console.log(e);return false}   
}
//get campaign comments 
export const getCampaignComments = async (campaignId) => {
    try{ 
        const res = await axios.post(API_URL + '?type=campaign_comments&cid='+ campaignId + '&id=' + Math.random() * 100,
        AUTH_HEADERS()
        )
        if(res.status) { 
            return res.data
        }
        else {
            //network error
            return false
        }
    }
    catch(e) {return false}   
}
//get admin profile details
export const getAdminProfile = async () => {
    try{ 
        const res = await axios.post(ADMIN_API_URL + '?type=admin&id=' + Math.random() * 100,
        AUTH_HEADERS()
        )
        if(res.status) { 
            return res.data
        }
        else {
            //network error
            return false
        }
    }
    catch(e) {return false}   
}
//get admin stats 
export const getAdminStats = async () => {
    try{ 
        const res = await axios.post(ADMIN_API_URL + '?type=stats&id=' + Math.random() * 100,
        AUTH_HEADERS()
        )
        if(res.status) { 
            return res.data
        }
        else {
            //network error
            return false
        }
    }
    catch(e) {return false}   
}
//get all admin campaign 
export const getAllAdminCampaign = async () => {
    try{ 
        const res = await axios.post(ADMIN_API_URL + '?type=campaigns&id=' + Math.random() * 100,
        AUTH_HEADERS()
        )
        if(res.status) { 
            return res.data
        }
        else {
            //network error
            return false
        }
    }
    catch(e) {return false}   
}
//to approve campaign
export const approveCampaign = async (cid="") => {
    try{ 
        const res = await axios.post(ADMIN_API_URL + '?type=approve&cid=' + cid,
        AUTH_HEADERS()
        )
        if(res.status) { 
            return res.data
        }
        else {
            //network error
            return false
        }
    }
    catch(e) {return false}   
}
//to reject campaign
export const rejectCampaign = async (cid="") => {
    try{ 
        const res = await axios.post(ADMIN_API_URL + '?type=reject&cid=' + cid,
        AUTH_HEADERS()
        )
        if(res.status) { 
            return res.data
        }
        else {
            //network error
            return false
        }
    }
    catch(e) {return false}   
}
//to delete campaign
export const deleteCampaign = async (cid="") => {
    try{ 
        const res = await axios.post(ADMIN_API_URL + '?type=delete&cid=' + cid,
        AUTH_HEADERS()
        )
        if(res.status) { 
            return res.data
        }
        else {
            //network error
            return false
        }
    }
    catch(e) {return false}   
}