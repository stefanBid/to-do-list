/**
 * With this service you go and retrieve data from a fake db 
 */

import axios from 'axios'

const baseBooksDBurl:string = 'https://my-json-server.typicode.com/stefanBid/booksDB'
const bookDBName:string = 'books'
const bookClient = axios.create({
    baseURL:baseBooksDBurl,
    withCredentials:false,
    timeout:1000,
    headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
    }
})


export default{
    async getAllBooks(){
        return await bookClient.get(`/${bookDBName}`)
    }
}