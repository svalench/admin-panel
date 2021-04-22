<template>
    <div>
        <v-data-table
      :headers="headers"
      :items="cardproducts"
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
            <v-btn :href="$axios.defaults.baseURL+'/download/product/'" class="primary"><v-icon>mdi-file-download</v-icon></v-btn>
          </v-col>
          <v-col>
        <v-text-field
          v-model="search"
          label="Поиск по базе"
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
      <template v-slot:item.description="{ item }">
          {{item.description.length>300?item.description.substring(0,300):item.description}}
      </template>
      <template v-slot:item.actions="{ item }">
     <v-btn @click="deleteCard(item)" class="error"> <v-icon light>
              mdi-delete-forever
            </v-icon></v-btn>
      <v-btn @click="showCard(item)" class="accent" >
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
      width="60%"
    >
    <changeCard :rightDrawer.sync="rightDrawer" :card.sync="card" :manufacturers="manufacturers" :currentCat="currentCat" :currentFirstCat="currentFirstCat" :cats_first="cats_first" :cats="cats" />
    </v-navigation-drawer>
    </div>
</template>

<script>
import changeCard from '@/components/changeCard.vue'
export default {
    components:{
        changeCard,
    },
    data(){
        return{
            rightDrawer:false,
            right:true,
            cardproducts:[],
            currentCat:{},
            currentFirstCat:{},
            cats:[],
            cats_first:[],
            manufacturers:[],
            page:1,
            count:0,
            options:{},
            timer:null,
            offset:10,
            loading:false,
            search:'',
            card:{},
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
          { text: 'категория', value: 'cat_name' },
          { text: 'изображение', value: 'img' },
          { text: 'производитель', value: 'manufacturer_name' },
          { text: 'действия', value: 'actions' },
        ]
      },
    },
    mounted(){
        this.getCardProducts();
        this.getCatAll();
    },
     watch:{
        search(newval){
          if(newval==''){
            if(this.timer!=null){clearTimeout(this.timer)}
            this.getCardProducts()
          }else{
            if(this.timer!=null){clearTimeout(this.timer)}
            this.timer = setTimeout( this.searchLoadData,700,newval);
          }
        },
        options: {
        handler () {
            
          this.getCardProducts()
        },
        deep: true,
      },
    },
    methods:{
        async deleteCard(item){
             if(!confirm('Вы уверены?')){return}
            await this.$axios.delete(`/admin/catalog/cardproduct_admin/${item.id}/`);
            const index = this.cardproducts.indexOf(item);
            if (index > -1) {
                this.cardproducts.splice(index, 1);
            }
            this.count = this.count - 1;
        },
        async showCard(item){
            this.card = item;
            await this.getCat();
            this.rightDrawer = !this.rightDrawer;
        },
        async getCat(){
            if(this.card.cat!=null){
                 this.currentCat = this.cats.find(x=>x.id==this.card.cat);
                 this.currentFirstCat = this.cats_first.find(x=>x.id==this.currentCat.parent);
            }else{
                 this.currentCat = null; 
                 this.currentFirstCat = null;
            }
           
        },
        async searchLoadData(newval){
           this.loading = true;
            const { sortBy, sortDesc, page, itemsPerPage } = this.options;
             this.offset = itemsPerPage*(page-1);
           let data = await this.$axios.get(`/admin/catalog/cardproduct_admin/?limit=${itemsPerPage}&offset=${this.offset}&search=${newval}`);
           this.cardproducts = data.data.results;
           this.count = data.data.count;
           this.loading = false;
        },
        async getCatAll(){
            let data = await this.$axios.get(`/admin/catalog/category_second/?limit=99999999`); 
            this.cats = data.data.results;
            let data1 = await this.$axios.get(`/admin/catalog/category_first/?limit=99999999`); 
            this.cats_first = data1.data.results;
            let data2 = await this.$axios.get(`/admin/catalog/manufacturers/?limit=99999999`); 
            this.manufacturers = data2.data.results;
            let data3 = await this.$axios.get(`/admin/catalog/manufacturers/?limit=99999999`); 
        },
        async getCardProducts(){
            this.loading = true;
            const { sortBy, sortDesc, page, itemsPerPage } = this.options;
             this.offset = itemsPerPage*(page-1);
           let data = await this.$axios.get(`/admin/catalog/cardproduct_admin/?limit=${itemsPerPage}&offset=${this.offset}`);
           this.cardproducts = data.data.results;
           this.count = data.data.count;
           this.loading = false;
        }
    }
}
</script>