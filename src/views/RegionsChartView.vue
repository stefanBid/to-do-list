<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import { RegionItemKeys, TitleStyle} from '@/types';
import { useRegionStore} from '@/stores/region';
import { storeToRefs} from 'pinia';
import BaseTitle from '@/components/BaseTitle.vue';
import DxPieChart, {
  DxLegend,
  DxSeries,
  DxTooltip,
  DxFormat,
  DxLabel,
  DxConnector,
  DxExport,
} from 'devextreme-vue/pie-chart';

//STORE OF BOOKS
const store = useRegionStore();
const {regions} = storeToRefs(store);
const {loadAllRegions} = store;

//WINDOW WIDTH
const windowWidth = ref<number>(window.innerWidth);

//DEFINE TITLE AND SUBTITLE OF PIE CHART 
const titleChart = computed(()=>{
    return 'Population for Italy Regions' 
});

const subtitleChart = computed(()=>{
    return 'Green(More then 150000 people)/Red(Less then 150000 people)' 
});

//DEFINE LEGEND VISIBILITY
const showLegend = computed(()=>{
    return (windowWidth.value>1200)? true:false;
})

//FUNCTIONS
const customizeLabel = function(pointInfo:any){
    return pointInfo.value > 1500000 ? {backgroundColor:'green', color:'white'} : {backgroundColor:'red'}
};

const customizeTooltip = function(pointInfo:any){
    return pointInfo.value > 1500000 ? {color: 'green', }: {color:'red'}
};

const onPointClick= function(e:any){
    const point = e.target;
    point.showTooltip();
};



//COMPONENT LIFE-CYCLE
onMounted(()=>{
    loadAllRegions();
    window.addEventListener('resize', ()=>{
        windowWidth.value = window.innerWidth;
    })
});
</script>

<template>
<div class="section-container">
    <BaseTitle :title-style="TitleStyle.CLASSIC_BIGGEST" :orientation="'center'" enable-sub  :sub-title-style="TitleStyle.CLASSIC_MEDIUM">
        Italian population by region
        <template #sub>
            (Green => more than 1500000 people) / (Red => less than 1500000)
        </template>
    </BaseTitle>
    <DxPieChart
    class=" chart dxc-title dx-export-menu-button"
    :data-source="regions"
    type="doughnut"
    :customize-label="customizeLabel"
    resolve-label-overlapping="shift"
    @point-click="onPointClick"
    >
        <DxSeries :argument-field="RegionItemKeys.R_NAME" :value-field="RegionItemKeys.R_POPULATION">
            <!-- Setup Label of chart -->
            <DxLabel
            :visible="true"
            position="columns"
            >
                <!-- Setup connector label-value -->
                <DxConnector :visible="true"/>
            </DxLabel>
        </DxSeries>
        
        <DxExport :enabled="true"/>
        <DxLegend
        :visible="showLegend"
        :column-count="2"
        orientation="vertical"
        horizontal-alignment="left"
        vertical-alignment="bottom"
        />
        <!-- Setup ToolTip -->
        <DxTooltip
        :customize-tooltip="customizeTooltip"
        >
        <DxFormat
            type="decimal"
        />
        </DxTooltip>
    </DxPieChart>
</div>
</template>