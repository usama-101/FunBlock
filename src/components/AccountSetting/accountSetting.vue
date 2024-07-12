<template>
    <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row min-h-[80vh] gap-4">
            <!-- Sidebar -->
            <div class="md:w-1/4 bg-white shadow rounded-xl p-8 cursor-pointer border border-gray-100/50">
                <h2 class="text-xl font-bold mb-5">Account Settings</h2>
                <ul>
                    <li @click="setActiveTab('profile')" :class="{ 'text-purple-600': activeTab === 'profile' }"
                        class="cursor-pointer mb-3">
                        Profile Settings
                    </li>
                    <li @click="setActiveTab('security')" :class="{ 'text-purple-600': activeTab === 'security' }"
                        class="cursor-pointer">
                        Security Settings
                    </li>
                </ul>
            </div>
            <!-- Main Content -->
            <div class="md:w-3/4">
                <div v-if="activeTab === 'profile'">
                    <div class="bg-white shadow rounded-xl p-8 cursor-pointer border border-gray-100/50">
                        <div class="flex items-center mb-6">
                            <div class="relative w-fit rounded-full">
                                <img id="profileImg" class="w-48 h-48 rounded-full border"
                                    :src="userProfile"
                                    alt="Profile Picture">
                                <button @click="updateImg"
                                    class="absolute top-2 right-4 bg-white text-primary  w-8 h-8 flex items-center justify-center rounded-full text-2xl shadow border border-gray-50">
                                    +
                                </button>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                            <div class="relative">
                                <label for="name"
                                    class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">First
                                    Name</label>
                                <input type="email" v-model="firstname"  
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none placeholder:font-light text-sm"
                                    placeholder="johnsmith@gmail.com" required />
                            </div>
                            <div class="relative">
                                <label for="name"
                                    class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">Last
                                    Name</label>
                                <input type="email" v-model="lastname"  
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none placeholder:font-light text-sm"
                                    placeholder="johnsmith@gmail.com" required />
                            </div>
                        </div>
                        <div class="mt-8 relative">
                            <label for="name"
                                class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">Bio</label>
                            <textarea id="bio" rows="4" v-model="bio"  
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
                        </div>
                        <div class="flex items-center justify-start gap-3 my-3">
                            <a href=""><img class="w-10 h-10 object-contain shadow rounded-md" :src="Link1" alt=""></a>
                            <a href=""><img class="w-10 h-10 object-contain shadow rounded-md" :src="Link2" alt=""></a>
                            <a href=""><img class="w-10 h-10 object-contain shadow rounded-md" :src="Link3" alt=""></a>
                            <a href=""><img class="w-10 h-10 object-contain shadow rounded-md" :src="Link4" alt=""></a>
                            <a href=""><img class="w-10 h-10 object-contain shadow rounded-md" :src="Link5" alt=""></a>
                        </div>
                        <div class="flex items-center justify-start gap-3 my-3">
                            <button @click="saveProfile" v-if="!savingStatus"  class="w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white py-2 rounded-lg shadow-lg">
                                Save
                            </button>
                            <button v-else disabled class="w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white py-2 rounded-lg shadow-lg">
                                Saving...
                            </button>
                        </div>
                    </div>
                </div>
                <div v-if="activeTab === 'security'">
                    <div class="bg-white shadow rounded-xl p-4 md:p-8 cursor-pointer border border-gray-100/50">
                        <div class="grid grid-cols-1 gap-4">
                            <div class="">
                                <div class="relative md:max-w-[50%]">
                                    <label for="name"
                                        class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">Change
                                        Password</label>
                                    <input type="password" v-model="oldPassword"
                                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none placeholder:font-light text-sm"
                                        placeholder="********" required />
                                </div>
                            </div>
                            <div class="">
                                <div class="relative md:max-w-[50%] mt-4">
                                    <label for="name"
                                        class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">New
                                        Password</label>
                                    <input @input="validPass" id="newPassword" type="password" v-model="newPassword"
                                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none placeholder:font-light text-sm"
                                        placeholder="********" required />
                                </div>
                            </div>
                            <div id='pass_edit_verify' class="flex text-sm text-gray-400 font-light">
                                Must be minimum of 8 characters <br>
                                Must contain an uppercase letter <br>
                                Must contain a lowercase letter <br>
                                Must contain at least one number eg 1234 <br>
                                Must contain at least one symbol eg. “@>+-/* <br>
                            </div>
                            <button v-if="!passwordStatus" @click="savePasswordProfile"
                                class="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-12 py-1 md:py-3 rounded-full w-fit max-w">
                                Change password
                            </button>
                            <button v-else disabled
                                class="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-12 py-1 md:py-3 rounded-full w-fit max-w">
                                Saving
                            </button>
                        </div>
                        <div class="mt-6">
                            <h2 class="text-xl font-bold mb-2">Two Factor Authentication (2FA)</h2>
                            <p class="text-gray-400 mb-4 font-light">After entering your password, verify your identity
                                with an authentication method.</p>

                            <div class="flex flex-col sm:flex-row items-center mb-4 gap-4">
                                <div class="w-24 flex items-center justify-center rounded-full">
                                    <img :src="Group" alt="">
                                </div>
                                <div class="sm:ml-4">
                                    <p class="sm:text-lg sm:font-medium text-gray-900">2FA adds a layer of security to your
                                        account by using more than just your password to log in.</p>
                                </div>
                            </div>

                            <div v-if="!isGottenCode && !faStatus">
                                <h3 class="text-xl font-bold mb-2 mt-6">How it works</h3>
                                <p class="text-gray-400 mb-4 font-light">
                                    When you log in to Propellus, you’ll need to:
                                </p>
                                <ol class="list-decimal list-inside text-gray-400 font-light mb-4">
                                    <li class="font-light">Enter your email and password</li>
                                    <li class="font-light">Complete a second step to prove that it’s you logging in. You can
                                        enter a verification
                                        code, use a security key, or confirm your login on a trusted device.</li>
                                </ol>

                                <p class="text-gray-400 font-light mb-4">Turn on 2FA</p>
                                <button v-if="!codeStatus" @click="setUp2Fa"
                                    class="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-4 sm:px-8 rounded-full shadow hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                                    Two Factor Authentication (2FA)
                                </button>
                                <button v-else disabled
                                    class="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-4 sm:px-8 rounded-full shadow hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                                    Turning on..
                                </button>
                            </div>
                            <div v-else-if="!faStatus">
                                <div id='2fa_code'>
                                    <QRCodeVue3
                                        :width="150"
                                        :height="150"
                                        :value="faUri"
                                    />
                                    <br>
                                    <p class="text-gray-400 mb-4 font-light">
                                        Scan the code with Authy app or any Authentication app of your choice
                                        and input the auth code
                                    </p>
                                </div>
                                <input type="text" v-model="authCode" style="margin-bottom: 20px;"
                                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none placeholder:font-light text-sm"
                                        placeholder="AUTH CODE HERE..." required />
                                <br>
                                <button v-if="!codeSaving" @click="verify2Fa"
                                    class="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-4 sm:px-8 rounded-full shadow hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                                    Verify
                                </button>
                                <button v-else disabled 
                                    class="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-4 sm:px-8 rounded-full shadow hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                                    Verifing..
                                </button>
                                <button v-if="!codeSaving" style="background: none; color:black" @click="cancel2Fa"
                                    class="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-4 sm:px-8 rounded-full shadow hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                                    Cancel
                                </button>
                            </div>
                            <div v-else>
                                <p class="text-gray-400 font-light mb-4">Turn of 2FA</p>
                                <button v-if="!faSaving" @click="turnOff2Fa"
                                    class="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-4 sm:px-8 rounded-full shadow hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                                    Turn off Two Factor Authentication (2FA)
                                </button>
                                <button v-else disabled
                                    class="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-4 sm:px-8 rounded-full shadow hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                                    Turning off..
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <div
        class="bg-gradient-to-r from-primary to-secondary sm:rounded-t-full border-t py-4 sm:py-10 text-center col-span-5 mt-12">
        <p class="text-lg font-normal text-white text-center">© 2024 BlockFund - Built on stellar</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Link1 from '@assets/Frame 15.png';
import Link2 from '@assets/Frame 16.png';
import Link3 from '@assets/Frame 17.png';
import Link4 from '@assets/Frame 18.png';
import Link5 from '@assets/Frame 19.png';
import Group from '@assets/Group.png';
import axios from 'axios' 
import QRCodeVue3 from "qrcode-vue3";
import {getProfile} from '../../utils/api'
import { AUTH_HEADERS, E, msg, selectImage, validatePass } from '../../utils/utils';
import { API_URL, PROFILE_LOGO } from '../../utils/constant';

const activeTab = ref('profile');
const setActiveTab = (tab) => {
    activeTab.value = tab;
};
const userProfile = ref(PROFILE_LOGO)
const firstname = ref("")
const lastname = ref("")
const bio = ref("")
const imgObj = ref({
    obj:null,
    img:''
})
const oldPassword = ref("")
const newPassword = ref("")
const faUri = ref("")
const authCode = ref("")
const authKey = ref("")
const savingStatus = ref(false)
const canSavePic = ref(false)
const faStatus = ref(false)
const passwordStatus = ref(false)
const isGottenCode = ref(false)
const codeStatus = ref(false)
const codeSaving = ref(false)
const faSaving = ref(false)
const userDet = ref({})


//to setup the profile image
const setUpProfilePic = () => {
  imgObj.value.obj = selectImage((res) => {
      if(res === 1) {
        //max file size
        msg('Max size allowed is 10mb', 'error')
      }
      else if(res == ""){ console.log(canSavePic)
        //user selected none
        canSavePic.value = false
      }
      else {
        canSavePic.value = true
        E('profileImg').src = URL.createObjectURL(res)
        imgObj.value.img = res;
      }
  })
}
const updateImg = () => {
    imgObj.value.obj.click()
}
//to validate pass
const validPass = () => { 
    const flg = validatePass("newPassword")
    if(!flg) {
        //show warning
        E('pass_edit_verify').style.color = "red"
    }
    else {
        E('pass_edit_verify').style.color = "limegreen"
    }
}
//to get 2fa_uri
const setUp2Fa = async () => {
    codeStatus.value = true
    axios.post(`${API_URL}?type=2fa`, AUTH_HEADERS())
      .then((resp) => { 
        codeStatus.value = false
        if(resp.data.status === true) { console.log(resp.data)
            faUri.value =  resp.data.uri
            authKey.value = resp.data.secret
            isGottenCode.value = true
        }
        else if(resp.data['AUTH'] === false) {
            msg('Session has expired', 'error')
            setTimeout(() => {
                window.location = '/login'
            }, 2000)
        }
        else {
            msg('Something went wrong', 'error')
        }
      })
      .catch((error) => {
        codeStatus.value = false
        msg('Something went wrong', 'error')
        console.error(error); // Log the error to the console for debugging
      });
}
//to cancel 2Fa
const cancel2Fa = () => {
    isGottenCode.value = false
    codeStatus.value = false
}
//to verify 2fa
const verify2Fa = async () => {
    //handles profile saving
    codeSaving.value = true
    const formData = new FormData();
    formData.append('code', authCode.value);
    formData.append('key', authKey.value);
    axios.post(`${API_URL}?type=verify_2fa`, AUTH_HEADERS(formData))
      .then((resp) => {
        codeSaving.value = false
        if(resp.data.status === true) {
            msg('2 Factor authentication setup successfully')
            userDet['2fa'] = true;
            faStatus.value = true
        }
        else if(resp.data['AUTH'] === false) {
            msg('Session has expired', 'error')
            setTimeout(() => {
                window.location = '/login'
            }, 2000)
        }
        else {
            msg('Something went wrong', 'error')
        }
      })
      .catch((error) => {
        codeSaving.value = false
        msg('Something went wrong', 'error')
        console.error(error); // Log the error to the console for debugging
      });
} 
//to turn of 2fa
const turnOff2Fa = async () => {  
    //handles profile saving
    faSaving.value = true
    axios.post(`${API_URL}?type=off_2fa`, AUTH_HEADERS())
      .then((resp) => {
        faSaving.value = false
        if(resp.data.status === true) {
            msg('Two factor authentication turned off')
            userDet['2fa'] = false;
            faStatus.value = false
            isGottenCode.value = false
        }
        else if(resp.data['AUTH'] === false) {
            msg('Session has expired', 'error')
            setTimeout(() => {
                window.location = '/login'
            }, 2000)
        }
        else {
            msg('Something went wrong', 'error')
        }
      })
      .catch((error) => {
        faSaving.value = false
        msg('Something went wrong', 'error')
        console.error(error); // Log the error to the console for debugging
      });
} 
//to save profile
const saveProfile = async () => {
    //handles profile saving
    savingStatus.value = true
    const formData = new FormData();
    formData.append('firstname', firstname.value);
    formData.append('lastname', lastname.value);
    formData.append('bio', bio.value);
    if(canSavePic.value) {  
      formData.append('image', imgObj.value.img)
    }
    axios.post(`${API_URL}?type=modify_user`, AUTH_HEADERS(formData))
      .then((resp) => {
        savingStatus.value = false
        if(resp.data.status === true) {
            msg('Profile saved successfully')
            //save user datato localstorage
            userDet.value['firstname'] = firstname.value
            userDet.value['lastname'] = lastname.value
            userDet.value['bio'] = bio.value
            if(canSavePic.value) {
                if(resp.data['img_status']) {
                    userDet.value['img'] = resp.data['img']
                }
                else {
                    msg('Unable to update profile image', 'fail')
                }
            }
            localStorage.setItem('x-users', JSON.stringify(userDet.value))
            speak('x-users',  userDet.value)
        }
        else if(resp.data['AUTH'] === false) {
            msg('Session has expired', 'error')
            setTimeout(() => {
                window.location = '/login'
            }, 2000)
        }
        else {
            msg('Something went wrong', 'error')
        }
      })
      .catch((error) => {
        savingStatus.value = false
        msg('Something went wrong', 'error')
        console.error(error); // Log the error to the console for debugging
      });
} 
//to save password
const savePasswordProfile = async () => {
    //handles profile saving
    if(validatePass('newPassword')) {  
        passwordStatus.value = true
        const formData = new FormData();
        formData.append('oldPassword', oldPassword.value);
        formData.append('newPassword', newPassword.value);
        axios.post(`${API_URL}?type=modify_user`, AUTH_HEADERS(formData))
        .then((resp) => {
            passwordStatus.value = false
            if(resp.data.status === true) {
                msg('Password updated successfully')
            }
            else if(resp.data['AUTH'] === false) {
                msg('Session has expired', 'error')
                setTimeout(() => {
                    window.location = '/login'
                }, 2000)
            }
            else {
                msg('Something went wrong', 'error')
            }
        })
        .catch((error) => {
            passwordStatus.value = false
            msg('Something went wrong', 'error')
            console.error(error); // Log the error to the console for debugging
        });
    }
}
const setUp = async () => {
    //load profile details
    const user = await getProfile()
    if(user['token']) { 
        //there is info
        localStorage.setItem('x-users', JSON.stringify(user))
        firstname.value = user['firstname']
        lastname.value = user['lastname']
        bio.value = user['bio']
        userProfile.value = user['img'] || PROFILE_LOGO
        faStatus.value = user['2fa']
        userDet.value = user
        setUpProfilePic()
        //update all components of new changes
        speak('x-user', user)
    }
    else if(!user['AUTH']) {
        //show logout error
        msg('Session has expired', 'error')
        setTimeout(() => {
            window.location = '/login'
        }, 2000)
    }
}

setUp()
</script>