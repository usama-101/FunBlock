<template>
    <div class="w-full">
        <h2 class="text-xl sm:text-3xl font-bold text-center mb-2">Basic Details of the Campaign</h2>
        <!-- <p class="text-center text-gray-900 mb-4 font-light">
            There are many variations of passages.
        </p> -->
        <div class="flex items-center mb-3" style='display:none;'>
            <div class="relative w-fit rounded-full">
                <img class="w-24 h-24 rounded-full border"
                    src="https://www.shutterstock.com/image-vector/confident-smiling-coach-man-wearing-600nw-2304634725.jpg"
                    alt="Profile Picture" />
                <button
                    class="absolute top-1 right-1 bg-white text-primary w-6 h-6 flex items-center justify-center rounded-full text-2xl shadow border border-gray-50">
                    +
                </button>
            </div>
        </div>
        <form @submit="submitForm" id='step2Form'>
            <div class="grid grid-cols-1 gap-4 mt-4">
                <div class="relative">
                    <label for="name"
                        class=" -top-2 left-2 inline-block px-1 text-xs font-medium text-gray-900">First
                        Title of your Fundraising Campaign</label>
                    <input :value="title" type="" id="title" name="name"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none placeholder:font-light text-sm"
                        placeholder="Name" required />
                </div>
            </div>
            <div class="mt-4 relative">
                <label for="name"
                    class=" -top-2 left-2 inline-block  px-1 text-xs font-medium text-gray-900">Campaign Description</label>
                <textarea :value="bio" id="bio" rows="4" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
            </div>
            <div class="flex justify-start space-x-4 mt-4 w-full max-w-xs mr-auto mt-5">
                <Button type='submit' class="w-full" InnerBgColor="bg-gradient-to-r from-primary to-secondary" classBg="bg-gradient-to-r from-primary to-secondary" bgColor="text-white">
                        Continue
                </Button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Button from '@components/General/Button.vue';
import { E,  onRender} from '../../../utils/utils';

onRender('step2Form', () => { 
  E('step2Form').onsubmit = async (event) => {  
    event.preventDefault();  
    speak('x-submit-step', {
        type:'next', step:1,
        data : {
            title:E('title').value, bio:E('bio').value
        }
    }) 
  }
})


</script>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    bio: {
      type: String,
      required: true
    }
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