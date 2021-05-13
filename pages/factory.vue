<template>
    <div>
        <v-data-table
      :headers="headers"
      :items="manufacturers"
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
          <v-btn @click="showFactory({})" class="primary"><v-icon>mdi-plus-box</v-icon></v-btn>
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
      <template v-slot:item.img="{ item }">
          <v-img
          width="80"
      :src="item.img"
    ></v-img>
      </template>
      <template v-slot:item.actions="{ item }">
     <v-btn @click="deleteFactory(item)" class="error"> <v-icon light>
              mdi-delete-forever
            </v-icon></v-btn>
      <v-btn @click="showFactory(item)" class="accent" >
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
    <changeManufactory :rightDrawer.sync="rightDrawer" :factory.sync="factory"  />
    </v-navigation-drawer>
    </div>
</template>

<script>
import changeManufactory from '@/components/changeManufactory.vue'
export default {
    components:{
        changeManufactory,
    },
    data(){
        return{
            rightDrawer:false,
            right:true,
            manufacturers:[],
            page:1,
            count:0,
            options:{},
            offset:10,
            loading:false,
            search:'',
            factory:{},
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
          { text: 'изображение', value: 'img' },
          { text: 'производитель', value: 'manufacturer' },
          { text: 'действия', value: 'actions' },
        ]
      },
    },
    mounted(){
        this.getManufactory();
    },
     watch:{
        search(newval){
          if(newval==''){
            if(this.timer!=null){clearTimeout(this.timer)}
            this.getManufactory()
          }else{
            if(this.timer!=null){clearTimeout(this.timer)}
            this.timer = setTimeout( this.searchFactory,700,newval);
          }
        },
        options: {
        handler () {
            
          this.getManufactory()
        },
        deep: true,
      },
    },
    methods:{
        async deleteFactory(item){
             if(!confirm('Вы уверены?')){return}
            await this.$axios.delete(`/admin/catalog/manufacturers/${item.id}/`);
            const index = this.manufacturers.indexOf(item);
            if (index > -1) {
                this.manufacturers.splice(index, 1);
            }
            this.count = this.count - 1;
        },
        async showFactory(item){
            this.factory = item;
            this.rightDrawer = !this.rightDrawer;
        },

        async getManufactory(){
            this.loading = true;
            const { sortBy, sortDesc, page, itemsPerPage } = this.options;
             this.offset = itemsPerPage*(page-1);
           let data = await this.$axios.get(`/admin/catalog/manufacturers/?limit=${itemsPerPage}&offset=${this.offset}`);
           this.manufacturers = data.data.results;
           this.count = data.data.count;
           this.loading = false;
        },
        async searchFactory(search){
            this.loading = true;
            const { sortBy, sortDesc, page, itemsPerPage } = this.options;
             this.offset = itemsPerPage*(page-1);
           let data = await this.$axios.get(`/admin/catalog/manufacturers/?limit=${itemsPerPage}&offset=${this.offset}&search=${search}`);
           this.manufacturers = data.data.results;
           this.count = data.data.count;
           this.loading = false;
        }
    }
}
</script>