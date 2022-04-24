<template>
    <div>
    <v-data-table
      :headers="headers"
      :items="users"
      :page.sync="page"
      :server-items-length="count"
       :options.sync="options"
      :loading ="loading"
      class="elevation-1"

    >
      <template v-slot:top>
        <v-row>
              <v-col cols="1">
          <v-btn @click="updateUser({})" class="primary"><v-icon>mdi-plus-box</v-icon></v-btn>
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
       <template v-slot:item.is_superuser="{ item }">
         <v-icon v-if="item.is_superuser">mdi-check</v-icon>
         <v-icon v-if="!item.is_superuser">mdi-minus</v-icon>
       </template>
      <template v-slot:item.date_joined="{ item }">
          {{new Date(item.date_joined).toLocaleString()}}
    </template>
       <template v-slot:item.birth_date="{ item }">
          {{item.birth_date?new Date(item.birth_date).toLocaleString():"Не указано"}}
    </template>
     <template v-slot:item.img="{ item }">
          <v-img
          width="80"
      :src="item.img"
    ></v-img>
      </template>
    <template v-slot:item.action="{ item }">
     <v-btn class="error" v-if="!item.is_superuser" @click="deleteUser(item)"> <v-icon light>
              mdi-delete-forever
            </v-icon></v-btn>
      <v-btn class="accent" @click="updateUser(item)">
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
      width="40%"
    >
    <cartUserChange :userList.sync="users"  :rightDrawer.sync="rightDrawer"  :user.sync="active_user" />
    </v-navigation-drawer>
  </div>
</template>
<script>
import cartUserChange from '@/components/cartChangeUser.vue'
 export default {
  middleware: 'auth',
     components:{
         cartUserChange
     },
     async asyncData({ params, $axios }) {

     },
    data () {
      return {
          rightDrawer:false,
          right:true,
          page:1,
          limit:10,
          offset:0,
          count:0,
          pageCount:1,
          loading:false,
        search: '',
        calories: '',
        users: [],
        options: {},
        active_user:{}
      }
    },
    mounted(){
         this.getMoreUsers()
    },
    watch:{
        search(newval){
          if(newval===''){
            if(this.timer!=null){clearTimeout(this.timer)}
            this.getMoreUsers()
          }else{
            if(this.timer!=null){clearTimeout(this.timer)}
            this.timer = setTimeout( this.serchUser,700,newval);
          }
        },
        options: {
        handler () {

          this.getMoreUsers()
        },
        deep: true,
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
          {
            text: 'email',
            value: 'email',
            filter: value => {
              if (!this.email.length) return true

              return value < this.email
            },
          },
          {
            text: 'username',
            value: 'username',
          },
          { text: 'админ', value: 'is_superuser' },
          // { text: 'Ник пользователя', value: 'username' },
           { text: 'изображение', value: 'img' },
          { text: 'имя', value: 'first_name' },
          { text: 'фамилия', value: 'last_name' },
          { text: 'Дата регистрации', value: 'date_joined' },
          { text: 'Дата рождения', value: 'birth_date' },
           { text: 'телефон', value: 'phone_number' },
           // { text: 'пол', value: 'sex' },
           { text: 'действия', value: 'action' },
        ]
      },
    },
    methods: {
        deleteUser(item){
            if(!confirm('Вы уверены?')){return}
            this.$axios.delete(`users/users/${item.id}/`);
            const index = this.users.indexOf(item);
            if (index > -1) {
                this.users.splice(index, 1);
            }
        },
        updateUser(item){
            this.rightDrawer=!this.rightDrawer;
            this.active_user = item;
            console.log(item);
        },
        async serchUser(search){
            const { sortBy, sortDesc, page, itemsPerPage } = this.options
            this.loading = true;
            this.offset = itemsPerPage*(page-1);
        let data_user = await this.$axios.get(`/users/users/?limit=${itemsPerPage}&offset=${this.offset}&search=${search}`);
         this.users = data_user.data.results;
         this.count = data_user.data.count;
         this.loading = false;
        },
        async getMoreUsers(){
            const { sortBy, sortDesc, page, itemsPerPage } = this.options
            this.loading = true;
            this.offset = itemsPerPage*(page-1);
        let data_user = await this.$axios.get(`/users/users/?limit=${itemsPerPage}&offset=${this.offset}`);
         this.users = data_user.data.results;
         this.count = data_user.data.count;
         this.loading = false;
        },
      filterOnlyCapsText (value, search, item) {
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(search) !== -1
      },
    },
  }
</script>
