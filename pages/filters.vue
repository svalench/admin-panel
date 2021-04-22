<template>
      <div>
        <v-data-table
      :headers="headers"
      :items="filters"
      :page.sync="page"
      :server-items-length="count"
       :options.sync="options"
      :loading ="loading"
      :footer-props="footerProps"   
      class="elevation-1"

    >
      <template v-slot:top>
          <v-row>
              <v-col cols="1">
          <v-btn @click="showFilter({})" class="primary"><v-icon>mdi-plus-box</v-icon></v-btn>
          </v-col>
          <v-col>
        <v-text-field
          v-model="search"
          label="Поиск"
          class="mx-4"
        ></v-text-field>
        </v-col>
        </v-row>
      </template>
      <template v-slot:item.actions="{ item }">
     <v-btn @click="deleteFilter(item)" class="error"> <v-icon light>
              mdi-delete-forever
            </v-icon></v-btn>
      <v-btn @click="showFilter(item)" class="accent" >
          <v-icon light>
              mdi-update
            </v-icon>
      </v-btn>
    </template>
    </v-data-table>

     <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
      width="50%"
    >
    <cardFilterChange :rightDrawer.sync="rightDrawer" :item.sync="filter" :cats_first="cats_first" :cats="cats"  />
    </v-navigation-drawer>
    </div>
</template>

<script>
import cardFilterChange from '@/components/cardFilterChange.vue'
export default {
    components:{
       cardFilterChange,
    },
    data(){
        return{
            rightDrawer:false,
            right:true,
            filters:[],
            page:1,
            count:0,
            options:{},
            offset:10,
            loading:false,
            search:'',
            filter:{},
            cats:[],
            cats_first:[],
            footerProps: {'items-per-page-options': [10, 25, 50, 100]},
        }
    },
     computed: {
      headers () {
        return [
          {
            text: 'id',
            align: 'start',
            sortable: true,
            value: 'id',
          },
          {
            text: 'название',
            value: 'name',
          },
          { text: 'описание', value: 'description' },
          { text: 'категории', value: 'list_cats' },
          { text: 'max', value: 'filter_max' },
          { text: 'min', value: 'filter_min' },
          { text: 'действия', value: 'actions' },
        ]
      },
    },
    watch:{
      search(newval){
          if(newval==''){
            if(this.timer!=null){clearTimeout(this.timer)}
            this.getFilterCats()
          }else{
            if(this.timer!=null){clearTimeout(this.timer)}
            this.timer = setTimeout( this.searchFilter,700,newval);
          }
        },
        options: {
        handler () {
            
          this.getFilterCats()
        },
        deep: true,
      },
    },
    mounted(){
        this.getFilterCats();
        this.getCat();
    },
    methods:{
      async deleteFilter(item){
         if(!confirm('Вы уверены?')){return}
            
            const index = this.filters.indexOf(item);
            if (index > -1) {
                this.filters.splice(index, 1);
            }
            this.count = this.count - 1;
      },
      async getCat(){
        let data = await this.$axios.get(`/admin/catalog/category_second/?limit=99999999`); 
            this.cats = data.data.results;
            let data1 = await this.$axios.get(`/admin/catalog/category_first/?limit=99999999`); 
            this.cats_first = data1.data.results;
      },
      async searchFilter(str1){
        this.loading = true;
            const { sortBy, sortDesc, page, itemsPerPage } = this.options;
             this.offset = itemsPerPage*(page-1);
             let data = await this.$axios.get(`/admin/catalog/filter_card_group/?limit=${itemsPerPage}&offset=${this.offset}&search=${str1}`);
           this.filters = data.data.results;
           this.count = data.data.count;
           this.loading = false;
      },
        async getFilterCats(){
            this.loading = true;
            const { sortBy, sortDesc, page, itemsPerPage } = this.options;
             this.offset = itemsPerPage*(page-1);
           let data = await this.$axios.get(`/admin/catalog/filter_card_group/?limit=${itemsPerPage}&offset=${this.offset}`);
           this.filters = data.data.results;
           this.count = data.data.count;
           this.loading = false;
        },
        showFilter(item){
            this.filter = item;
            this.rightDrawer = !this.rightDrawer;
        }
    }
}
</script>