<template>
    <div class="w-full">
        <h2 class="text-xl sm:text-3xl font-bold text-center mb-2">Social Media and Websites Links</h2>
        <!-- <p class="text-center text-gray-900 mb-4 font-light">
            There are many variations of passages.
        </p> -->
        <form id="stepForm4">
            <div class="grid grid-cols-1 gap-4 mt-4">
                <div class="relative">
                    <div class="col-span-full">
                    <label for="cover-photo" class="block text-sm font-extralight leading-6 text-gray-900">Cover
                            photo</label>
                        <div id='coverphoto' style='background-position: center; background-size: cover;' class="mt-2 flex justify-center rounded-xl border border-dashed border-gray-900/25 px-6 py-5 bg-white">
                            <div class="text-center">
                                <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor"
                                    aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <div id="file-upload" class="mt-4 flex text-sm leading-6 text-gray-600"
                                >
                                   <label for="file-upload" style="margin:auto"
                                        class="relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-indigo-500">
                                        <span>Upload a file</span>
                                    </label>
                                    <p class="pl-1" style="display: none;">or drag and drop</p>
                                </div>
                                <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div class="relative">
                    <label for="name"
                        class=" -top-2 left-2 inline-block px-1 text-xs font-extralight text-gray-900">Youtube Link</label>
                    <input type="text" id="youtube"  :value="youtube"  @input="validateLinks($event)"
                        class="w-full px-4 py-2 border border-gray-100 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none placeholder:font-light text-sm"
                        placeholder="" req uired />
                </div>
                <div class="relative">
                    <label for="name"
                        class=" -top-2 left-2 inline-block  px-1 text-xs font-extralight text-gray-900">Facebook Link</label>
                    <input type="text" id="facebook" :value="facebook"  @input="validateLinks($event)"
                        class="w-full px-4 py-2 border border-gray-100 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none placeholder:font-light text-sm"
                        placeholder="" requ ired />
                </div>
                <div class="relative">
                    <label for="name"
                        class=" -top-2 left-2 inline-block  px-1 text-xs font-extralight text-gray-900">Twitter Link</label>
                    <input type="text" id="twitter" :value="twitter"  @input="validateLinks($event)"
                        class="w-full px-4 py-2 border border-gray-100 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none placeholder:font-light text-sm"
                        placeholder="" req uired />
                </div>
                <div class="relative">
                    <label for="name"
                        class=" -top-2 left-2 inline-block  px-1 text-xs font-extralight text-gray-900">Linkedin Link</label>
                    <input type="text" id="linkedin" :value="linkedin"  @input="validateLinks($event)"
                        class="w-full px-4 py-2 border border-gray-100 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none placeholder:font-light text-sm"
                        placeholder="" req uired />
                </div>
            </div>
            <div class="flex justify-start space-x-4 mt-4 w-full max-w-xs mr-auto mt-5">
                <Button type="button"@click="previous">Previous</Button>
                <Button  type='submit' class="w-full" InnerBgColor="bg-gradient-to-r from-primary to-secondary" classBg="bg-gradient-to-r from-primary to-secondary" bgColor="text-white">
                    Continue
                </Button>
            </div>
        </form>
    </div>
</template>
<script setup>
import { ref, defineProps } from 'vue';
import Button from '@components/General/Button.vue';
import { E,  onRender, selectImage, isURL} from '../../../utils/utils';

const props = defineProps({
  img: {
    type: String,
    required: true
  },
  youtube: {
    type: String,
    required: true
  },
  facebook: {
    type: String,
    required: true
  },
  twitter : {
    type: String,
    required: true
  },
  linkedin : {
    type: String,
    required: true
  }
}); 
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
        E('coverphoto').style.backgroundImage = `url(${url})` 
        imgObj.value.img = url;
        imgObj.value.imgObj = res;
      }
  })
}

//handles the form submit
onRender('stepForm4', () => {
  E('stepForm4').onsubmit = async (event) => {  
    event.preventDefault();  
    speak('x-submit-step', {
        type:'next', step:3,
        data : {
            img:imgObj.value.img,
            imgObj:imgObj.value.imgObj,
            youtube:E('youtube').value,
            facebook:E('facebook').value,
            linkedin:E('linkedin').value,
            twitter:E('twitter').value
        }
    }) 
  }
  //show the background image
  if(props.img != "") {
    E('coverphoto').style.backgroundImage = `url(${props.img})` 
  }
  else{
    E('coverphoto').style.backgroundImage = "" 
  }

  E('file-upload').onclick = () => {
    imgObj.value.obj.click()
  }
})
const validateLinks = (event) => {  
  const elem = event.target
  if(elem.value.trim() != "") {
    if(isURL(elem.value.trim())) { 
        //show the green border
        elem.style.borderColor = 'limegreen'
        return true
    }
    else {
      elem.style.borderColor = 'red'
      return false
    }
  }
  else {
    elem.style.borderColor = ''
    return 1
  }
}
//handles the previos
const previous = () => {
  speak('x-submit-step', {
      type:'previous', step:3,
  }) 
}

setUpProfilePic()
</script>