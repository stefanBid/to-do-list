/**
 * With this service you go and retrieve data from a fake db
 */

import axios from 'axios';
const baseUrl:string = 'https://my-json-server.typicode.com/stefanBid';

const urls:string[] = [
    `${baseUrl}/booksDB`,
    `${baseUrl}/regionsDB`
    
];

const bookClient = axios.create({
    baseURL:urls[0],
    withCredentials:false,
    timeout:1000,
    headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
    }
});

const regionClient = axios.create({
    baseURL:urls[1],
    withCredentials:false,
    timeout:1000,
    headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
    }
});


export default{
    async getAllBooks(){
        return await bookClient.get('/books')
    },
    async getAllRegions(){
        return await regionClient.get('/regions')
    }
}