<script lang="ts">
import {defineComponent} from 'vue';
export default defineComponent({
    name:'BaseButton',
    props:{
        disabled:{
            type:Boolean,
            required:true
        },
        type:{
            type:String,
            required:true
        },
        custom:{
            type:String,
            required:false,
            default: ''
        }
        
    },

})
</script>

<template>
    <button 
        :class="
            [
                custom,
                type==='text'?'bg-inherit hover:bg-inherit':'',
                type==='outline'?'bg-inherit border border-current':'',
                type==='solid'?'border-inherit':'',
                'duration-500 ease-in-out cursor-pointer disabled:bg-inherit disabled:opacity-20 disabled:cursor-not-allowed disabled:text-inherit'
            ]
        "
        :disabled="disabled"
    >
     <slot></slot>
    </button>
</template>