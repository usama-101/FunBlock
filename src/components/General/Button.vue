<template>
    <button @click="click" :class="buttonClass">
        <div :class="innerDivClass">
            <div :class="textClass">
                <slot></slot>
            </div>
        </div>
    </button>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    classBg: {
        type: String,
        default: 'bg-gradient-to-r from-primary to-secondary'
    },
    bgColor: {
        type: String,
        default: 'text-transparent bg-clip-text'
    },
    InnerBgColor: {
        type: String,
        default: 'bg-white'
    },
    click : {
        type: Function,
        default : () => {}
    }
});

const buttonClass = `${props.classBg} p-0.5 rounded-full whitespace-nowrap`;
const innerDivClass = `${props.InnerBgColor} px-3 sm:px-5 py-1 sm:py-2 rounded-full`;
const textClass = `text-xs sm:text-base ${props.classBg} ${props.bgColor}`;
</script>
