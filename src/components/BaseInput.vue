<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name:"BaseInput",
    props:{
        modelValue:String,
        placeholder:{
            type:String,
            required:false
        },
        labelForInput:{
            type:String,
            required:false
        },
        customClassLabel:{
            type:String,
            required:false
        },
        customClassInput:{
            type:String,
            required:true
        }
    },
    emits:['update:modelValue']
})
</script>

<template>
    <label v-if="labelForInput" :class="customClassLabel">{{labelForInput}}</label>
    <input 
    type="text"
    :class="customClassInput" 
    :placeholder="placeholder?placeholder:'Insert Text'"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)">
</template>