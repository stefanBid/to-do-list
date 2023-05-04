import { defineStore } from "pinia";
import type {BookItem} from '@/types'
import DataService from "@/services/FakeDataService";

export const useBookStore = defineStore({
    id:'bookStore',
    state: () =>(
        {
            books:[] as BookItem[],
        }
    ),
    actions:{
        loadAllBooks(){
            DataService.getAllBooks()
            .then(response => {
                this.books = response.data
            })
            .catch(er => console.log(er))
        }
    }
})