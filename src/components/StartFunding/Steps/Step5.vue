<template>
    <div class="w-full">
        <h2 class="text-xl sm:text-3xl font-bold text-center mb-2">Legal Compliance</h2>
        <!-- <p class="text-center text-gray-900 mb-4 font-light">
            There are many variations of passages.
        </p> -->
        <div class="grid grid-cols-1 gap-4 mt-4">
            <div class="relative">
                <div class="col-span-full">
                    <label for="legal-cover-photo" class="block text-sm font-extralight leading-6 text-gray-900">Cover
                        photo</label>
                    <div id="legal-cover-photo" style='background-position: center;background-size: cover;'
                        class="mt-2 flex justify-center rounded-xl border border-dashed border-gray-900/25 px-6 py-5 bg-white">
                        <div class="text-center">
                            <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor"
                                aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                    clip-rule="evenodd" />
                            </svg>
                            <div id="file-legal-upload" class="mt-4 flex text-sm leading-6 text-gray-600">
                                <label for="file-legal-upload" style="margin:auto"
                                        class="relative cursor-pointer rounded-md bg-white font-semibold text-primary text-gray-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-indigo-500">
                                        <span>Upload a file</span>
                                </label>
                                <!-- <p class="pl-1">or drag and drop</p> -->
                            </div>
                            <p class="text-xs leading-5 font-bold text-primary">Upload required verification documents (optional)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
        <div class="grid grid-cols-1 gap-4 mt-4">
            Terms and Conditions Agreement:
            <div class="relative">
                <label class="flex items-start">
                    <input id="check_1" v-model="checks_1" aria-describedby="comments-description" name="comments" type="checkbox"
                        class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary mt-1">
                    <span class="ml-2 text-gray-900 text-sm font-extralight"><span class="text-gray-950">Terms and Conditions Agreement:</span> <br> I agree to FundBlock's Terms and Conditions.</span>
                </label>
            </div>
            <div class="relative">
                <label class="flex items-start">
                    <input id="check_2" v-model="checks_2" aria-describedby="comments-description" name="comments" type="checkbox"
                        class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary mt-1">
                    <span class="ml-2 text-gray-900 text-sm font-extralight"> <span class="text-gray-950">Compliance with Laws:</span>  <br> I certify that my fundraising campaign complies with all applicable local, state, and federal laws and regulations.                   
                    </span>
                </label>
            </div>
            <div class="relative">
                <label class="flex items-start">
                    <input id="check_3" v-model="checks_3" aria-describedby="comments-description" name="comments" type="checkbox"
                        class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary mt-1">
                    <span class="ml-2 text-gray-900 text-sm font-extralight"> <span class="text-gray-950">Truthfulness and Accuracy: </span> <br> I affirm that all information provided in my campaign description, goals, and updates is truthful, accurate, and not misleading.</span>
                </label>
            </div>
        </div>        
        <div class="flex justify-start space-x-4 mt-4 w-full max-w-xs mr-auto mt-5">
                <Button type="button"@click="previous">Previous</Button>
                <Button :disabled="!checks_1 || !checks_2 || !checks_3" @click="next" class="w-full" InnerBgColor="bg-gradient-to-r from-primary to-secondary" classBg="bg-gradient-to-r from-primary to-secondary" bgColor="text-white">
                    Continue
                </Button>
        </div>
    </div>
</template>
<script setup>
import {ref, defineProps} from 'vue'
import Button from '@components/General/Button.vue';
import { E,  onRender, selectImage} from '../../../utils/utils';

const props = defineProps({
  img: {
    type: String,
    required: true
  },
  check_1: {
    type: Boolean,
    required: true
  },
  check_2: {
    type: Boolean,
    required: true
  },
  check_3: {
    type: Boolean,
    required: true
  }
}); 
const checks_1 = ref(props.check_1)
const checks_2 = ref(props.check_2)
const checks_3 = ref(props.check_3)
const imgObj = ref({
    obj:null, img:props.img, imgObj : null,
})
//to setup the profile image
const setUpProfilePic = () => {
  imgObj.value.obj = selectImage((res) => {
      if(res === 1) {
        //max file size
        msg('Max size allowed is 10mb', 'error')
      }
      else if(res != ""){ 
        //user selected img
        const url = URL.createObjectURL(res)
        E('legal-cover-photo').style.backgroundImage = `url(${url})` 
        imgObj.value.img = url;
        imgObj.value.imgObj = res;
      }
  })
}
onRender('legal-cover-photo', () => {
  //show the background image
  if(props.img != "") {
    E('legal-cover-photo').style.backgroundImage = `url(${props.img})` 
  }
  else{
    E('legal-cover-photo').style.backgroundImage = "" 
  }
  E('file-legal-upload').onclick = () => {    
    imgObj.value.obj.click()
  }
  
})
//handles the previos
const previous = () => {
  speak('x-submit-step', {
      type:'previous', step:4,
  }) 
}
const next = async (event) => {  
    speak('x-submit-step', {
        type:'next', step:4,
        data : {
            img:imgObj.value.img,
            imgObj:imgObj.value.imgObj, 
            check_1:E('check_1').checked,
            check_2:E('check_2').checked,
            check_3:E('check_3').checked
        }
    }) 
}
setUpProfilePic()
</script>