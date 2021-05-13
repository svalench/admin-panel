<template>
    <div>
        <v-data-table
      :headers="headers"
      :items="sliders"
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
          <v-btn @click="showItem({})" class="primary"><v-icon>mdi-plus-box</v-icon></v-btn>
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
     <v-btn @click="deleteItem(item)" class="error"> <v-icon light>
              mdi-delete-forever
            </v-icon></v-btn>
      <v-btn @click="showItem(item)" class="accent" >
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
    <sliderChange :slider="slider" :rightDrawer="rightDrawer" />
    </v-navigation-drawer>
    </div>
</template>

<script>
import sliderChange from '@/components/sliderChange.vue'
export default {
    components:{
        sliderChange,
    },
    data(){
        return{
            rightDrawer:false,
            right:true,
            sliders:[],
            page:1,
            count:0,
            options:{},
            offset:10,
            loading:false,
            search:'',
            slider:{},
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
            text: 'заголовок',
            value: 'title',
          },
          { text: 'описание', value: 'description' },
          { text: 'изображение', value: 'img' },
          { text: 'действия', value: 'actions' },
        ]
      },
    },
    mounted(){
        this.getSliders();
    },
     watch:{
        search(newval){
          if(newval==''){
            if(this.timer!=null){clearTimeout(this.timer)}
            this.getSliders()
          }else{
            if(this.timer!=null){clearTimeout(this.timer)}
            this.timer = setTimeout( this.searchSliders,700,newval);
          }
        },
        options: {
        handler () {
            
          this.getSliders()
        },
        deep: true,
      },
    },
    methods:{
        async deleteItem(item){
             if(!confirm('Вы уверены?')){return}
            await this.$axios.delete(`/admin/pages/slider/${item.id}/`);
            const index = this.sliders.indexOf(item);
            if (index > -1) {
                this.sliders.splice(index, 1);
            }
            this.count = this.count - 1;
        },
        showItem(item){
            this.slider = item;
            this.rightDrawer = !this.rightDrawer;
        },
        async searchSliders(search){
            this.loading = true;
            const { sortBy, sortDesc, page, itemsPerPage } = this.options;
             this.offset = itemsPerPage*(page-1);
             let data = await this.$axios.get(`/admin/pages/slider/?limit=${itemsPerPage}&offset=${this.offset}&search=${search}`);
           this.sliders = data.data.results;
           this.count = data.data.count;
           this.loading = false;
        },
        async getSliders(){
            this.loading = true;
            const { sortBy, sortDesc, page, itemsPerPage } = this.options;
             this.offset = itemsPerPage*(page-1);
           let data = await this.$axios.get(`/admin/pages/slider/?limit=${itemsPerPage}&offset=${this.offset}`);
           this.sliders = data.data.results;
           this.count = data.data.count;
           this.loading = false;
        }
    }
}
</script>