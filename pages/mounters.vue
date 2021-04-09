<template>
    <div>
          <v-data-table
      :headers="headers"
      :items="mounters"
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
            <v-btn @click="dialog=!dialog" class="primary"><v-icon>mdi-plus-box</v-icon></v-btn>
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
       <template v-slot:item.whoiam.img="{ item }">
          <v-img
          width="80"
      :src="item.whoiam.img"
    ></v-img>
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
      width="50%"
    >
    <MountingCard :newuserid.sync="newuserid" :rightDrawer.sync="rightDrawer" :mantazhnik.sync="mounter" />
    <ModalChoise :newuserid.sync="newuserid"  :rightDrawer.sync="rightDrawer" :dialog.sync="dialog" />
    </v-navigation-drawer>
    </div>
</template>

<script>
import MountingCard from '@/components/MountimgCard.vue'
import ModalChoise from '@/components/DialogMounters.vue'
export default {
    components:{
       MountingCard,
       ModalChoise
    },
    data(){
        return{
             rightDrawer:false,
            right:true,
            page:1,
            count:0,
            options:{},
            dialog:false,
            timer:null,
            offset:0,
            newuserid:null,
            loading:false,
            search:'',
            mounters:[],
            mounter:{whoiam:{}, newuserid:this.newuserid},
            footerProps: {'items-per-page-options': [10, 25, 50, 100]},
        }
    },
    
    mounted(){
        this.getUserMounter();
    },
    methods:{
        async getUserMounter(){
            this.loading = true;
            const { sortBy, sortDesc, page, itemsPerPage } = this.options;
             this.offset = itemsPerPage*(page-1);
            let data = await this.$axios.get(`/mounters/mounters/?limit=${itemsPerPage}&offset=${this.offset}`);
            this.mounters = data.data.results;
            this.count = data.data.count;
            this.loading = false;
        },
        showCard(mounter){
            this.mounter = mounter;
            this.rightDrawer = true;
        },
        async searchMounters(newval){
             this.loading = true;
            const { sortBy, sortDesc, page, itemsPerPage } = this.options;
             this.offset = itemsPerPage*(page-1);
             let data = await this.$axios.get(`/mounters/mounters/?limit=${itemsPerPage}&offset=${this.offset}&search=${newval}`);
           this.mounters = data.data.results;
           this.count = data.data.count;
           this.loading = false;
        },
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
          { text: 'имя', value: 'whoiam.first_name' },
          { text: 'фамилия', value: 'whoiam.last_name' },
         // { text: 'email', value: 'email' },
          { text: 'изображение', value: 'whoiam.img' },
          { text: 'описание', value: 'description' },
          { text: 'действия', value: 'actions' },
        ]
      },
    },
    watch:{
        search(newval){
          if(newval==''){
            if(this.timer!=null){clearTimeout(this.timer)}
            this.getUserMounter()
          }else{
            if(this.timer!=null){clearTimeout(this.timer)}
            this.timer = setTimeout( this.searchMounters,700,newval);
          }
        },
    },
}
</script>