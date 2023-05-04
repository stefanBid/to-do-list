import {defineStore} from 'pinia';
import type {RegionItem} from '@/types';
import DataService from '@/services/FakeDataService';

export const useRegionStore = defineStore({
    id:'regionStore',
    state:()=>(
        {
            regions:[] as RegionItem[],
        }
    ),
    actions:{
        loadAllRegions(){
            DataService.getAllRegions()
            .then(response=>{
                this.regions = response.data
            })
            .catch(er => console.log(er))
        }
    }
})