<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import type {LinkItem} from '../types'
export default defineComponent({
    name: "BaseHeader",
    data(){
        return{
            links:[] as LinkItem[],
            isOpen:true
        }
    },
    mounted(){
        this.links = [
            {label:'Home', destination:'home', customClass:'text-xl font-mono hover:text-green-500'}
        ]
        
    },
    methods:{
        openCloseMenu(){
            this.isOpen = !this.isOpen
        }
    }
})
</script>

<template>
    <div class="bg-gray-900 text-gray-100 py-3.5 px-6 shadow md:flex justify-between items-center">
        <div class="flex items-center">
            <span class="text-green-500 md:text-4xl text-2xl mr-3">
                <i class="bi bi-hand-thumbs-up-fill"></i>
            </span>
            <h1 class="text-2xl font-mono font-extrabold">To Do List</h1>
        </div>
        <span class="absolute md:hidden right-6 top-1.5 cursor-pointer text-4xl hover:text-green-500  animate-pulse" @click="openCloseMenu">
            <i :class="[isOpen? 'bi bi-x':'bi bi-filter-left']"></i>
        </span>
        <ul class="md:flex md:item-center md:px-0 px-10 md:pb-0 pb-10 md:static absolute  bg-gray-900 md:w-auto w-full md:h-auto h-[92.5vh] top-14 duration-700 ease-in-out"
        :class="[isOpen ? 'left-0' : 'left-[-100%]']">
            <template v-for="link in links">
                <li class="md:mx-4 md:my-0 my-6">
                    <RouterLink :to="{name:link.destination}" :class=link.customClass>{{ link.label }}</RouterLink>
                </li>
            </template>
        </ul>
    </div>
</template>