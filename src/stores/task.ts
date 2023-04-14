import { defineStore } from 'pinia'
import type { TaskItem } from '../types'

export const useTaskStore = defineStore({
  id:'taskStore',
  state: ()=>(
    {
      tasks:[] as TaskItem[],
      count: 0
    }
  ),
  getters:{
    updateCount: (state) => {
      state.count = 0
      state.tasks.forEach(task => {
        if(task.isComplete===false){
          state.count++
        }
      });
    }

  },
  actions:{
    loadTasks(){
      localStorage.getItem("Tasks") !=null? this.tasks = JSON.parse(localStorage.getItem("Tasks") || '[]') : this.tasks = []
      this.updateCount
    },
    persisteTasks(){
      localStorage.setItem("Tasks", JSON.stringify(this.tasks))
    },
    addTask(description:string){
      let task:TaskItem = {
        description:description,
        isComplete:false
      }
      this.tasks.push(task)
      this.persisteTasks()
    },
    deleteTask(task:TaskItem){
      this.tasks.splice(this.tasks.indexOf(task), 1)
      this.updateCount
      this.persisteTasks()
    }

  }
})
