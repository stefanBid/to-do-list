<script setup lang="ts">
import { computed, onMounted,ref} from 'vue';
import { BookItemKeys} from '@/types'
import { useBookStore } from '@/stores/book';
import { storeToRefs } from 'pinia';
import {DxDataGrid,DxPaging,DxPager, DxSearchPanel} from 'devextreme-vue/data-grid';

//STORE OF BOOKS
const store = useBookStore();
const {books} = storeToRefs(store);
const {loadAllBooks} = store;

//DATA FOR PAGINATION
const pageSizeStart = ref<number>(10);
const pageSizes = ref<any[]>([5,10,'all'])

// DEFINE HEADER SETTINGS FOR DX-DATA-GRID-COMPONENT
const headers = computed(()=>{
    return [
        {
            slotId:BookItemKeys.B_ISBN,
            textCaption:'ISBN Code',
            iconCaption:'bi bi-upc'
        },
        {
            slotId:BookItemKeys.B_TITLE,
            textCaption:'Title of book',
            iconCaption:'bi bi-book-half'
        },
        {
            slotId:BookItemKeys.B_AUTHORS,
            textCaption:'Authors of book',
            iconCaption:'bi bi-vector-pen'
        },
        {
            slotId:BookItemKeys.B_PAGE,
            textCaption:'Number of page',
            iconCaption:'bi bi-blockquote-left'
        },
        {
            slotId:BookItemKeys.B_NOBEL_AWARD,
            textCaption:'Nobel Award',
            iconCaption:'bi bi-award-fill'
        }
    ]
});

//DEFINE CELL SETTINGS FOR DX-DATA-GRID-COMPONENT
const cells = computed(()=>{
    return [`${BookItemKeys.B_NOBEL_AWARD}-cell-template`]
})

// DEFINE COLUMNS SETTINGS FOR DX-DATA-GRID-COMPONENT
const columns = computed(()=>{
    return [
        {
            dataField:BookItemKeys.B_ISBN,
            headerCellTemplate:BookItemKeys.B_ISBN,
            visible:true,
            alignment:'center',
            allowSearch:false,
        },
        {
            dataField:BookItemKeys.B_TITLE,
            headerCellTemplate:BookItemKeys.B_TITLE,
            visible:true,
            alignment:'left',
            allowSearch:true,
        },
        {
            dataField:BookItemKeys.B_AUTHORS,
            headerCellTemplate:BookItemKeys.B_AUTHORS,
            visible:true,
            alignment:'center',
            allowSearch:true
        },
        {
            dataField:BookItemKeys.B_PAGE,
            headerCellTemplate:BookItemKeys.B_PAGE,
            visible:true,
            alignment:'center',
            customizeText:pageCustom,
            allowSearch:false
        },
        {
            dataField:BookItemKeys.B_NOBEL_AWARD,
            headerCellTemplate:BookItemKeys.B_NOBEL_AWARD,
            cellTemplate:`${BookItemKeys.B_NOBEL_AWARD}-cell-template`,
            visible:true,
            alignment:'center',
            allowSearch:false,
        }
    ]
});
//FUNCTIONS
const cellPrepared = function(e:any){
    if(e.rowType === 'data'){
        if(e.column.dataField === BookItemKeys.B_NOBEL_AWARD && e.data[BookItemKeys.B_NOBEL_AWARD] === true){
            e.cellElement.classList.add("award");
        }
    }
};

const pageCustom = function(cellInfo:any){
    return cellInfo.value + " pages";
}
//COMPONENT LIFE-CYCLE
onMounted(()=>{
    loadAllBooks();
});

</script>

<template>
   <div class="section-container nero">
        <DxDataGrid
        class="tbl dx-datagrid dx-datagrid-headers dx-data-row dx-widget dx-datagrid-pager dx-page-sizes dx-page-size dx-toolbar .dx-datagrid-nodata dx-datagrid-rowsview dx-texteditor-input dx-field-item-label-text "
        :data-source="books"
        :columns="columns"
        :key-expr="BookItemKeys.B_ISBN"
        :column-auto-width="true"
        :column-hiding-enabled="true"
        @cell-prepared="cellPrepared"
        >

        <!--Define Header Style of Grid-->
        <template v-for="header of headers" #[header.slotId]>
            <span class="tbl-header">
                <h1>{{header.textCaption}}</h1>
                <i :class="header.iconCaption"></i>
            </span>
        </template>

        <!--Define Cell Style of Grid-->
        <template v-for="cell of cells" #[cell]="{data}">
            <span v-if="data.value === true">
                <i class="bi bi-award-fill"></i>
            </span>
            <span v-else>
                <i class="bi bi-dash"></i>
            </span>
        </template>

        <!--Search Setup -->
        <DxSearchPanel
        :visible="true" 
        placeholder="Search through the books..."
        :width="240"
        />

        <!--Pager Setup-->
        <DxPaging :pageSize="pageSizeStart"/>
        <DxPager
        :visible="true"
        :show-page-size-selector="true"
        :allowed-page-sizes="pageSizes"
        :show-navigation-buttons="true"
        :show-info="true"
        />
        </DxDataGrid>
   </div> 
</template>