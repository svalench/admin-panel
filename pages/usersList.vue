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
        <v-text-field
          v-model="search"
          label="Search (UPPER CASE ONLY)"
          class="mx-4"
        ></v-text-field>
      </template>
      <template v-slot:item.sex="{ item }">
      <v-chip
        :color="item.sex==0?'red':item.sex==1?'blue':'yellow'"
        dark
      >
        {{ item.sex==0?'неопределен':item.sex==1?'мужской':'женский' }}
      </v-chip>
    </template>
    <template v-slot:item.action="{ item }">
     <v-btn class="error" @click="deleteUser(item)"> <v-icon light>
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
    <cartUserChange :user="active_user" />
    </v-navigation-drawer>
  </div>
</template>
<script>
import cartUserChange from '@/components/cartChangeUser.vue'
 export default {
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
              if (!this.calories) return true

              return value < parseInt(this.calories)
            },
          },
          { text: 'Ник пользователя', value: 'username' },
          { text: 'имя', value: 'first_name' },
          { text: 'фамилия', value: 'last_name' },
          { text: 'Дата регистрации', value: 'date_joined' },
          { text: 'Дата рождения', value: 'birth_date' },
           { text: 'телефон', value: 'phone_number' },
           { text: 'пол', value: 'sex' },
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