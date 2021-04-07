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
            <v-btn  class="primary"><v-icon>mdi-plus-box</v-icon></v-btn>
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
    </div>
</template>

<script>
export default {
    data(){
        return{
             rightDrawer:false,
            right:true,
            page:1,
            count:0,
            options:{},
            timer:null,
            offset:10,
            loading:false,
            search:'',
            mounters:[],
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
            let data = await this.$axios.get(`/mounters/mounters/?limit=${itemsPerPage}&offset=${this.offset}`);
            this.mounters = data.data.results;
            this.count = data.data.count;
            this.loading = false;
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
          { text: 'имя', value: 'first_name' },
          { text: 'фамилия', value: 'last_name' },
          { text: 'email', value: 'email' },
          { text: 'изображение', value: 'img' },
          { text: 'описание', value: 'description' },
          { text: 'действия', value: 'actions' },
        ]
      },
    },
}
</script>