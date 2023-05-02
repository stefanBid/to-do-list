import { defineStore } from "pinia";
import type {BookItem} from '@/types'
import BookServices from "@/services/BookServices";

export const useBookStore = defineStore({
    id:'bookStore',
    state: () =>(
        {
            books:[] as BookItem[],
        }
    ),
    actions:{
        loadAllBooks(){
            BookServices.getAllBooks()
            .then(response => {
                this.books = response.data
            })
            .catch(er => console.log(er))
        }
    }
})