<template>
    <div class="w-full">
        <h2 class="text-xl sm:text-3xl font-bold text-center mb-2">Preview</h2>
        <p class="text-center text-gray-900 mb-4 font-light">
            Basic Details of the Campaign
        </p>
        <div class="grid grid-cols-1 gap-4 mt-4">
            <div class="relative">
                <label for="name" class=" -top-2 left-2 inline-block px-1 text-xs font-medium text-gray-900">
                    Title of your Fundraising Campaign</label>
                <input type="text" id="name" name="name" readonly :value="title"
                    class="w-full px-4 py-2 border border-gray-100 shadow rounded-lg focus:ring-1 focus:ring-primary focus:outline-none placeholder:font-light text-sm"
                    placeholder="William" required />
            </div>
        </div>
        <div class="mt-4 relative">
            <label for="name" class=" -top-2 left-2 inline-block  px-1 text-xs font-medium text-gray-900">Campaign
                Description</label>
            <textarea id="bio" :value="bio" rows="4" readonly class="mt-1 block w-full rounded-lg border-gray-100 shadow"></textarea>
        </div>
        <div class="mt-4">
            <h2 class="text-lg font-semibold text-left">Campaign Goals</h2>
        </div>
        <div>
            <label for="goal" class="-top-2 left-2 inline-block  px-1 text-xs font-medium text-gray-900">Fundraising
                Goals</label>
            <div class="relative pt-4">
                <input type="range" min="0" readonly max="25000" step="100" :value="goal"
                    class="slider w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
                <div class="flex justify-between text-xs font-medium text-gray-500 mt-2">
                    <span>$0</span>
                    <span>$12.5k</span>
                    <span>$25k</span>
                </div>
            </div>
        </div>

        <!-- Date Fields -->
        <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label for="start-date" class="-top-2 left-2 inline-block  px-1 text-xs font-medium text-gray-900">Start
                    Date</label>
                <input type="date"  readonly :value="startDate"
                    class="text-gray-500 w-full px-4 py-2 border border-gray-100 rounded-lg shadow focus:ring-1 focus:ring-primary focus:outline-none placeholder:font-extralight text-xs">
            </div>
            <div>
                <label for="end-date" class="-top-2 left-2 inline-block  px-1 text-xs font-medium text-gray-900">End
                    Date</label>
                <input type="date" readonly :value="endDate"
                    class="font-extralight text-gray-500  w-full px-4 py-2 border border-gray-100 shadow rounded-lg focus:ring-1 focus:ring-primary focus:outline-none placeholder:font-light text-xs">
            </div>
        </div>

        <!-- Categories -->
        <div class="mt-6">
            <label class="-top-2 left-2 inline-block  px-1 text-xs font-medium text-gray-900">Categories</label>
            <div class="flex flex-wrap mt-2 gap-2 bg-white w-full rounded-xl border  border-gray-100 shadow p-4">
                <button v-for="category in categories" :key="category"  
                    :class="{ 'bg-gradient-to-r from-purple-400 via-blue-500 to-indigo-500 text-white': selectedCategories.includes(category), 'border border-gray-200 text-gray-500': !selectedCategories.includes(category) }"
                    class="px-4 py-1 rounded-full focus:outline-none text-xs font-extralight">
                    {{ category }}
                </button>
            </div>
        </div>
        <div class="mt-4">
            <h2 class="text-lg font-semibold text-left">Social Media and Websites Links</h2>
           </div>
        <div class="grid grid-cols-1 gap-4 mt-4">
            <div class="relative">
                <div class="col-span-full">
                    <label for="cover-photo" class="block text-sm font-extralight leading-6 text-gray-900">Cover
                        photo</label>
                    <div id='main_cover_photo' style="background-position: center; background-size: cover;"
                        class="mt-2 flex justify-center rounded-xl shadow border border-dashed border-gray-900/25 px-6 py-5 bg-white">
                        <div class="text-center">
                            <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor"
                                aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div class="relative">
                <label for="name" class=" -top-2 left-2 inline-block px-1 text-xs font-extralight text-gray-900">Youtube
                    Link</label>
                <input type="text" :value="youtube" readonly
                    class="w-full px-4 py-2 border border-gray-100 shadow rounded-lg focus:ring-1 focus:ring-primary focus:outline-none placeholder:font-light text-sm"
                    placeholder="" required />
            </div>
            <div class="relative">
                <label for="name"
                    class=" -top-2 left-2 inline-block  px-1 text-xs font-extralight text-gray-900">Facebook
                    Link</label>
                <input type="text"  readonly :value="facebook"
                    class="w-full px-4 py-2 border border-gray-100 shadow rounded-lg focus:ring-1 focus:ring-primary focus:outline-none placeholder:font-light text-sm"
                    placeholder="" required />
            </div>
            <div class="relative">
                <label for="name"
                    class=" -top-2 left-2 inline-block  px-1 text-xs font-extralight text-gray-900">Twitter Link</label>
                <input type="text" readonly :value="twitter"
                    class="w-full px-4 py-2 border border-gray-100 shadow rounded-lg focus:ring-1 focus:ring-primary focus:outline-none placeholder:font-light text-sm"
                    placeholder="" required />
            </div>
            <div class="relative">
                <label for="name"
                    class=" -top-2 left-2 inline-block  px-1 text-xs font-extralight text-gray-900">Linkedin
                    Link</label>
                <input type="text" readonly :value="linkedin"
                    class="w-full px-4 py-2 border border-gray-100 shadow rounded-lg focus:ring-1 focus:ring-primary focus:outline-none placeholder:font-light text-sm"
                    placeholder="" required />
            </div>
        </div>
        <div class="w-full">
            <div class='mt-4'>
             <h2 class="text-lg font-semibold text-left">Legal Compliance</h2>
           </div>
        <!-- <p class="text-center text-gray-900 mb-4 font-light">
            There are many variations of passages.
        </p> -->
        <div class="grid grid-cols-1 gap-4 mt-4">
            <div class="relative">
                <div class="col-span-full">
                    <div id="legal_cover_photo" style='background-position: center;background-size: cover;'
                        class="mt-2 flex justify-center rounded-xl border border-dashed border-gray-900/25 px-6 py-5 bg-white">
                        <div class="text-center">
                            <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor"
                                aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
        <div class="grid grid-cols-1 gap-4 mt-4">
            Terms and Conditions Agreement:
            <div class="relative">
                <label class="flex items-start">
                    <input id="check_1" readonly :checked="check_1" aria-describedby="comments-description" name="comments" type="checkbox"
                        class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary mt-1">
                    <span class="ml-2 text-gray-900 text-sm font-extralight"><span class="text-gray-950">Terms and Conditions Agreement:</span> <br> I agree to FundBlock's Terms and Conditions.</span>
                </label>
            </div>
            <div class="relative">
                <label class="flex items-start">
                    <input id="check_2" readonly :checked="check_2" aria-describedby="comments-description" name="comments" type="checkbox"
                        class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary mt-1">
                    <span class="ml-2 text-gray-900 text-sm font-extralight"> <span class="text-gray-950">Compliance with Laws:</span>  <br> I certify that my fundraising campaign complies with all applicable local, state, and federal laws and regulations.                   
                    </span>
                </label>
            </div>
            <div class="relative">
                <label class="flex items-start">
                    <input id="check_3" readonly :checked="check_3" aria-describedby="comments-description" name="comments" type="checkbox"
                        class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary mt-1">
                    <span class="ml-2 text-gray-900 text-sm font-extralight"> <span class="text-gray-950">Truthfulness and Accuracy: </span> <br> I affirm that all information provided in my campaign description, goals, and updates is truthful, accurate, and not misleading.</span>
                </label>
            </div>
        </div>
        </div>
         <div class="flex justify-start space-x-4 mt-4 w-full max-w-xs mr-auto mt-5">
            <Button v-if="!saveStatus" type="button" @click="previous">Previous</Button>
            <Button :disabled="!check_1 || !check_2 || !check_3" v-if="!saveStatus"  @click="publish" class="w-full" InnerBgColor="bg-gradient-to-r from-primary to-secondary" classBg="bg-gradient-to-r from-primary to-secondary" bgColor="text-white">
                Publish
            </Button>
            <Button v-else disabled class="w-full" InnerBgColor="bg-gradient-to-r from-primary to-secondary" classBg="bg-gradient-to-r from-primary to-secondary" bgColor="text-white">
                Publishing...
            </Button>
        </div>
    </div>
</template>
<script setup>
import { ref , defineProps} from 'vue';
import Button from '@components/General/Button.vue';
import { E,  onRender} from '../../../utils/utils';

const props = defineProps({
    title: {
      type: String,
      required: true
    },
    bio: {
      type: String,
      required: true
    },
    goal: {
        type: Number,
        required: true
    },
    startDate: {
        type: Number,
    },
    endDate: {
        type: Number,
    },
    selectedCategories : {
        type: Array,
    },
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
    },
    legalImg: {
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
const saveStatus = ref(false)
const legal = ref(true)
const categories = [
    'Animals', 'Business', 'Community', 'Creative', 'Education', 'Emergencies',
    'Environment', 'Events', 'Faith', 'Family', 'Funerals & Memorials'
];

/* hears */
hear('x-publish', (e) => {
    saveStatus.value = e 
})
//handles the form submit
onRender('main_cover_photo', () => {
  //show the background image
  if(props.img != "") {
    E('main_cover_photo').style.backgroundImage = `url(${props.img})` 
  }
  if(props.legalImg != "") {
    E('legal_cover_photo').style.backgroundImage = `url(${props.legalImg})` 
  }
})
//handles the form submit
const publish = () => {  
    speak('x-submit-step', {type:'publish', step:4,}) 
  }
//handles the previos
const previous = () => {
  speak('x-submit-step', {
      type:'previous', step:4,
  }) 
}
</script>

<style scoped>
.slider-container {
    width: 300px;
    margin: 50px auto;
}

.slider {
    -webkit-appearance: none;
    /* Remove default appearance */
    width: 100%;
    height: 5px;
    /* Custom height */
    background: #ddd !important;
    /* Track background color */
    outline: none;
    /* Remove outline */
    opacity: 0.7;
    /* Transparency */
    transition: opacity 0.2s;
    /* Transition for opacity */
}

.slider:hover {
    opacity: 1;
    /* Full opacity on hover */
}

/* Thumb (handle) styles */
.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    /* Remove default appearance */
    appearance: none;
    width: 25px;
    /* Thumb width */
    height: 25px;
    /* Thumb height */
    background: #9D4CFF;
    /* Thumb color */
    cursor: pointer;
    /* Pointer cursor on hover */
    border-radius: 50%;
    /* Rounded thumb */
    border: 5px solid white;
    position: relative;
    top: -9px;
    /* Border around thumb */
}

.slider::-moz-range-thumb {
    width: 25px;
    /* Thumb width */
    height: 25px;
    /* Thumb height */
    background: #9D4CFF;
    /* Thumb color */
    cursor: pointer;
    /* Pointer cursor on hover */
    border-radius: 50%;
    /* Rounded thumb */
    border: 2px solid #555;
    /* Border around thumb */
}

/* Styles for track before the thumb */
.slider::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    background: linear-gradient(to right, #9D4CFF, white);
    /* Gradient track */
    border-radius: 5px;
    /* Rounded track */
}

.slider::-moz-range-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    background: linear-gradient(to right, #9D4CFF, #ddd);
    /* Gradient track */
    border-radius: 5px;
    /* Rounded track */
}
</style>