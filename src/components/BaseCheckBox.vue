<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name:"BaseCheckBox",
    props:{
        checked:Boolean,
        customClassCheckBox:{
            type:String,
            required:false
        },
        labelForCheckBox:{
            type:String,
            required:false
        },
        customClassLabel:{
            type:String,
            required:false
        },
    },
    emits:['update:checked']
})
</script>

<template>
    <div class=" justify-self-end mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
        <input 
        type="checkbox" 
        :class="customClassCheckBox"
        :checked="checked"
        @input="$emit('update:checked', ($event.target as HTMLInputElement).checked)">
        <label :class="customClassLabel">{{ labelForCheckBox }}</label>
    </div>
    
</template>