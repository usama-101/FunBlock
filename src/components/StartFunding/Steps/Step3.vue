<template>
  <div class="">
    <h2 class="text-xl sm:text-3xl font-bold text-center mb-2">Campaign Goals</h2>
    <!-- <p class="text-center text-gray-900 mb-4 font-light">
      There are many variations of passages.
    </p> -->
    <!-- Fundraising Goals -->
    <form id="stepForm3">
    <div>
      <label for="goal" class="-top-2 left-2 inline-block  px-1 text-xs font-medium text-gray-900">Fundraising
        Goals</label>
      <div class="relative pt-4">
        <input id="goal" type="range" min="0" max="25000" step="100" v-model="goals"
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
        <input type="date" id="start-date" v-model="startDates" :min="DATE_MAX" required
          class="text-gray-500 w-full px-4 py-2 border border-gray-100 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none placeholder:font-extralight text-xs">
      </div>
      <div>
        <label for="end-date" class="-top-2 left-2 inline-block  px-1 text-xs font-medium text-gray-900">End
          Date</label>
        <input type="date" id="end-date" v-model="endDates" :min="DATE_MAX_OTHER" required
          class="font-extralight text-gray-500  w-full px-4 py-2 border border-gray-100 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none placeholder:font-light text-xs">
      </div>
    </div>

    <!-- Categories -->
    <div class="mt-6">
      <label class="-top-2 left-2 inline-block  px-1 text-xs font-medium text-gray-900">Categories</label>
      <div class="flex flex-wrap mt-2 gap-2 bg-white w-full rounded-xl border  border-gray-100 shadow-sm p-4">
        <button type="button" v-for="category in categories" :key="category" @click="toggleCategory(category)"
          :class="{ 'bg-gradient-to-r from-purple-400 via-blue-500 to-indigo-500 text-white': selectedCategories.includes(category), 'border border-gray-200 text-gray-500': !selectedCategories.includes(category) }"
          class="px-4 py-1 rounded-full focus:outline-none text-xs font-extralight">
          {{ category }}
        </button>
      </div>
    </div>
    <div class="flex justify-start space-x-4 mt-4 w-full max-w-xs mr-auto mt-5">
        <Button @click="previous">Previous</Button>
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
import { E,  onRender} from '../../../utils/utils';
const DATE_MAX =  (new Date()).toISOString().split('T')[0];
const DATE_MAX_OTHER =  (new Date((new Date()).getTime() + 86400000)).toISOString().split('T')[0];
const categories = [
  'Animals', 'Business', 'Community', 'Creative', 'Education', 'Emergencies',
  'Environment', 'Events', 'Faith', 'Family', 'Funerals & Memorials'
];
const props = defineProps({
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
  category : {
    type: Array,
  }
}); 
const goals = ref(props.goal)
const startDates = ref(props.startDate)
const endDates = ref(props.endDate)
const selectedCategories = ref(props.category)
const toggleCategory = (category) => {  
  if (selectedCategories.value.includes(category)) {
    selectedCategories.value = selectedCategories.value.filter(c => c !== category);
  } else {
    selectedCategories.value.push(category);
  }
};

//handles the form submit
onRender('stepForm3', () => {
  E('stepForm3').onsubmit = async (event) => {  
    event.preventDefault();  
    speak('x-submit-step', {
        type:'next', step:2,
        data : {
            goal:E('goal').value * 1, 
            startDate:new Date(E('start-date').value).getTime() / 1E3,
            endDate:new Date(E('end-date').value).getTime() / 1E3,
            categories:selectedCategories.value
        }
    }) 
  }
})
//handles the previos
const previous = () => {
  speak('x-submit-step', {
      type:'previous', step:2,
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