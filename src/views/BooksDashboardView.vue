<script lang="ts">
    import { defineComponent } from 'vue';
    import { useBookStore } from '@/stores/book';
    import {DxDataGrid,DxColumn, DxPaging,DxPager, DxScrolling, DxFilterRow, DxSearchPanel} from 'devextreme-vue/data-grid';
    import { BookItemKeys} from '@/types'
    export default defineComponent({
        name:'BookList',
        components:{DxDataGrid,DxColumn, DxPager, DxPaging, DxScrolling, DxFilterRow, DxSearchPanel},
        data() {
            return{
                BookItemKeys,
                columnsCaption:[] as string[],
                iconsCaptions:[] as string[],
                dt:'' as string
            }
        },
        setup() {
            const storeBook = useBookStore()
            return{storeBook}
        },
        mounted() {
            this.storeBook.loadAllBooks()
            this.columnsCaption= ['ISBN Code', 'Title of book', 'Authors of book', 'Number of page', 'Nobel Award']
            this.iconsCaptions=['bi bi-upc', 'bi bi-book-half', 'bi bi-vector-pen', 'bi bi-list-ol', 'bi bi-award-fill']
            this.dt = 'string'
            
        },
        methods:{
            isAwarded(e:any) {
            if (e.rowType === "data") {
                    if (e.column.dataField === BookItemKeys.B_NOBEL_AWARD && e.data[BookItemKeys.B_NOBEL_AWARD] === true) {
                        e.cellElement.classList.add("award");
                    }
                }
            }
        }
    })
</script>

<template>
    <div class="section-container">
        <DxDataGrid 
        class="tbl dx-row dx-data-row"
        :show-borders="false"
        :data-source=storeBook.books
        :key-expr="BookItemKeys.B_ISBN"
        :column-auto-width="true"
        @cell-prepared="isAwarded"
        >
        <!--Scrolling Setup-->
        <DxScrolling row-rendering-mode="virtual"/>
        <!--Search Setup-->
        <DxSearchPanel :visible="true" placeholder="search through the books..." :width="240"  class="dx-datagrid-header-panel dx-toolbar "/>
        <!--Paginator Setup-->
        <DxPaging :pageSize="10"/>
        <DxPager
        class="dx-texteditor dx-texteditor-container dx-pager dx-page-sizes dx-page-size"
        :visible="true"
        :show-page-size-selector="true"
        :allowed-page-sizes="[5,10, 'all']"
        :show-navigation-buttons="true"
        :show-info="true"
        />
        <!--Columns Setup-->
        <DxColumn
        :data-field="BookItemKeys.B_ISBN"
        :header-cell-template="BookItemKeys.B_ISBN"
        :data-type = "dt"
        :allow-search="false"
        />
        <DxColumn
        :data-field="BookItemKeys.B_TITLE"
        :header-cell-template="BookItemKeys.B_TITLE"
        :data-type="dt"
        :allow-search="false"
        />
        <DxColumn
        :data-field="BookItemKeys.B_AUTHORS"
        :header-cell-template="BookItemKeys.B_AUTHORS"
        :data-type="dt"
        :allow-search="true"
        />
        <DxColumn
        :data-field="BookItemKeys.B_PAGE"
        :header-cell-template="BookItemKeys.B_PAGE"
        :data-type="dt"
        :allow-search="false"
        />
        <DxColumn
        :data-field="BookItemKeys.B_NOBEL_AWARD"
        :header-cell-template="BookItemKeys.B_NOBEL_AWARD"
        cell-template="nobel-cell-tmpl"
        :data-type="dt"
        :allow-search="false"
        />

        <!--Columns Header Setup-->
        <template v-for="(key,index) of [BookItemKeys.B_ISBN, BookItemKeys.B_TITLE, BookItemKeys.B_AUTHORS, BookItemKeys.B_PAGE, BookItemKeys.B_NOBEL_AWARD]"  #[key]>
            <span class="tbl-header">
                <h1>{{columnsCaption[index]}}</h1>
                <i :class="[iconsCaptions![index]]"></i>
            </span>
        </template>

        <!--Columns Cell Setup-->
        <template #nobel-cell-tmpl = {data}>
            <span v-if="data.value === true">
                <i class="bi bi-award-fill"></i>
            </span>
            <span v-else>
            </span>
        </template>
        </DxDataGrid>
    </div>
</template>

