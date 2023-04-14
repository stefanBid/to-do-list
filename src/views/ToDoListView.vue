<script lang="ts">
import {defineComponent} from 'vue'
import BaseButton from '../components/BaseButton.vue'
import BaseInput from "../components/BaseInput.vue"
import BaseCheckBox from '@/components/BaseCheckBox.vue'
import {useTaskStore} from '../stores/task'
import type { TaskItem } from '@/types'
export default defineComponent({
    name:'ToDoList',
    components:{BaseButton, BaseInput, BaseCheckBox},
    data(){
        return{
            description:'',
            filter:0,
            data:[] as TaskItem[]
            
        }
    },
    computed:{
        disableButton(){
            if(this.description===''){
                return true
            }else{
                return false
            }
        },
        filterData(){
            if(this.filter === 0){
                this.data = this.storeTask.tasks
                return this.data
            }else if(this.filter === 1){
                this.data = this.storeTask.tasks.filter((task) => task.isComplete === true)
                return this.data
            }else{
                this.filter === null? this.data = this.storeTask.tasks: this.data=this.storeTask.tasks.filter((task) => task.isComplete === false)
                return this.data
            }
        }
    },
    setup(){
        const storeTask = useTaskStore();
        return {storeTask}
    },
    methods:{
        onSubmit(e:Event){
            if (!this.description) {
                return;
            }
            
            this.storeTask.addTask(this.description)
            this.description = ''
            e.preventDefault()
        },
        executeOperation(data:TaskItem){
            this.storeTask.deleteTask(data)
        }
    },
    mounted(){
        this.storeTask.loadTasks()
    },
    updated(){
        this.storeTask.updateCount
        console.log(this.storeTask.count)
        this.storeTask.persisteTasks()
    }
})
</script>
<template>
    <div class="flex md:flex-row flex-col mx-11 my-7 h-5/6 shadow-black shadow-lg bg-gray-900 p-10 md:overflow-y-hidden overflow-y-scroll">
        <div class="flex flex-col justify-between  md:h-full h-auto basis-1/2 bg-gray-700  p-5 md:text-left text-center md:mr-2 md:mb-0 mb-2">
            <h1 class="text-white text-2xl font-mono font-semibold">Add Task to List</h1>
            <div class="border h-96 grid content-center border-white mt-11 p-11">
                <form @submit.prevent="onSubmit" class="mt-5 flex flex-col space-y-7">

                    <BaseInput
                    :custom-class-input="'p-5 font-mono text-xl placeholder-green-400 text-green-800'"
                    :custom-class-label="'text-white font-mono font-semibold text-xl -mb-4'"
                    :label-for-input="'Task Description'"
                    :placeholder="'Insert Task Description'"
                    v-model="description"
                    />
                    
                    <BaseButton
                    :custom="'p-2 bg-green-800 hover:bg-white text-xl font-semibold font-mono text-white hover:text-green-800'"
                    :disabled="disableButton"
                    type="solid"
                    >
                    Add Task <i class="bi bi-plus-circle-fill"></i>
                    </BaseButton>
                </form>
            </div>
        </div>
        <div class=" flex flex-col space-y-7 justify-center  md:h-full h-auto basis-1/2 bg-gray-700  p-5 md:text-right text-center md:ml-2 md:mt-0 mt-2">
            <h1 class="text-white text-2xl font-mono font-semibold">List of Task</h1>
            <div class="inline-block m3 ">
                <BaseButton
                :custom="'p-2 hover:bg-white focus:bg-white text-xl font-semibold font-mono text-white hover:text-red-800 focus:text-red-800 mx-1'"
                :disabled="false"
                type="outline"
                @click="filter=2">
                To complete <i class="bi bi-funnel-fill"></i>
                </BaseButton>

                <BaseButton
                :custom="'p-2 hover:bg-white focus:bg-white text-xl font-semibold font-mono text-white hover:text-green-800 focus:text-green-800 mx-1'"
                :disabled="false"
                type="outline"
                @click="filter=1">
                Complete <i class="bi bi-funnel-fill"></i>
                </BaseButton>

                <BaseButton
                :custom="'p-2 hover:bg-white focus:bg-white text-xl font-semibold font-mono text-white hover:text-green-800 focus:text-green-800 mx-1'"
                :disabled="false"
                type="outline"
                @click="filter=0">
                All <i class="bi bi-funnel-fill"></i>
                </BaseButton>
            </div>

            <!--ADD List of items-->
            <div class="md:overflow-y-scroll md:h-96 h-auto border border-white p-3">
                <template v-if="storeTask.tasks.length != 0">
                    <template v-for="task in filterData">
                        <div class=" grid grid-cols-1 gap-1 justify-items-start border border-white p-3 mb-5" :class="[task['isComplete']?'bg-green-700':'']">
                            <h1 class="font-mono font-semibold md:text-2xl text-lg text-white md:text-left text-center my-5">{{ task['description'] }}</h1>
                            <BaseButton
                            :custom="'p-2  text-xl font-semibold font-mono text-white hover:text-red-500'"
                            :disabled="false"
                            type="text"
                            @click="executeOperation(task)">
                            Elimina <i class="bi bi-trash-fill"></i>
                            </BaseButton>
                            <BaseCheckBox v-if="filter===0"
                            :custom-class-check-box="'mr-2 accent-green-600 active:accent-red-700 hover:accent-green-600 hover:cursor-pointer h-4 w-4 rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none'"
                            :label-for-check-box="task['isComplete']?'Complete':'To complete'"
                            :custom-class-label="'inline-block  font-mono font-semibold md:text-xl text-md text-white'"
                            v-model:checked="task['isComplete']"
                            />
                        </div>
                    </template>
                    <h4 class="text-red-400 text-2xl font-mono font-semibold">Active Tasks: {{ storeTask.count }}</h4>
                </template>
                <template v-else>
                    <h1 class="font-mono font-semibold text-2xl text-white md:text-left text-center">Void </h1>
                </template>
            </div>

        </div>
    </div>
</template>