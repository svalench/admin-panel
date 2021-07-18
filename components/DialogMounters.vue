<template>
      <v-dialog
      v-model="dialog"
        transition="dialog-bottom-transition"
        max-width="800"
      >
          <v-card >
              <div v-if="adduser">
                   <v-toolbar
              color="primary"
              dark
            >Введите данные</v-toolbar>
             <v-card-text>
        <v-text-field v-model="newuser.username" label="Email пользователя"></v-text-field>
        <v-text-field v-model="newuser.password" label="пароль пользователя"></v-text-field>
        <div v-if="newuser.password.length<8">Пароль не должен быть меньше 8 символов</div>
        <div v-for="e in errors" :key="e[0]">{{e[0]}}</div>
             </v-card-text>
              </div>
            <div v-else-if="addmantazhfromisset">
               <v-toolbar color="primary" dark>Добавить возможности монтажника пользователю</v-toolbar>
          <v-card-text>
            <v-data-table
      :headers="headers"
      :items="listUser"
      :page.sync="page"
      :server-items-length="count"
       :options.sync="options"
      :loading ="loading"
      :footer-props="footerProps"
      class="elevation-1">
               <template v-slot:item.img="{ item }">
                 <v-badge bordered :color="item.is_maunter?'error':'success'" :icon="item.is_maunter?'mdi-lock':'mdi-plus'" overlap>
                    <v-img width="60" :src="item.img"></v-img>
                 </v-badge>
                </template>
              <template v-slot:item.is_maunter="{ item }">
                    <v-icon :color="item.is_maunter?'error':'success'">{{item.is_maunter?'mdi-lock':'mdi-plus'}}</v-icon>
              </template>
              <template v-slot:item.action="{ item }">
                <v-btn @click="checKrealUser(item)" :disabled="item.is_maunter">выбрать</v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </div>
              <div v-else>
            <v-toolbar
              color="primary"
              dark
            >Выберите действие</v-toolbar>
            <v-card-text>
              <div class="text-h5 pa-12">Для создание и мантажника и пользователя сисетмы выберите 1. Для создания только мантажника с выбором уже зарегистрированного пользотваеля нажмите 2. </div>
            </v-card-text>
            </div>
            <v-card-actions class="justify-end">
                <v-btn v-if="adduser && !addmantazhfromisset" :disabled="newuser.password.length<8?true:false" @click="addUser">Добавить</v-btn>
                <v-btn @click="adduser=!adduser;addmantazhfromisset=false;">{{ (adduser)?'назад':1}}</v-btn>
                <v-btn v-if="addmantazhfromisset" @click="addmantazhfromisset=!addmantazhfromisset">назад</v-btn>
                <v-btn v-if="!addmantazhfromisset" @click="addMAntazh">2</v-btn>
              <v-btn
                text
                @click="close"
              >Отмена</v-btn>
            </v-card-actions>
          </v-card>

      </v-dialog>
</template>
<script>
export default {
    data(){
        return{
            adduser:false,
            addmantazhfromisset:false,
            errors:{},
            listUser:[],
            options:{},
            footerProps: {'items-per-page-options': [10, 25, 50, 100]},
            page:1,
            count:0,
            loading:false,
            limitUser:10,
            offsetUser:0,
            newuser:{username:'',password:'',password2:''},
        }
    },
    props:['dialog','rightDrawer','newuserid'],
    computed:{
      headers(){
              return[
                {text:'ID',value:'id'},
                { text: 'изображение', value: 'img' },
                {text:'имя',value:'first_name'},
                {text:'фамилия',value:'last_name'},
                {text:'статус',value:'is_maunter'},
                {text:'указать',value:'action'}
              ]
            },
    },
    methods:{
        async addUser(){
            this.newuser.password2 = this.newuser.password;
            if(this.newuser.password==''){
                alert("Введите пароль");
                return;
            }else if(this.newuser.password.length<8){
                alert("Пароль должен быть не меньше 8 символов");
                return;
            }
            let users;
               await this.$axios.post('/registration/backend/registration/', this.newuser).then(
                    response=>users=response
                ).catch(
                    error=>this.errors=error.response.data
                );
                 if(users != undefined && users.status==201){
                        this.$emit('update:dialog', false);
                        this.adduser = false;
                        this.$emit('update:rightDrawer', true);
                        this.$emit('update:newuserid',  users.data.id);
                 }
        },
      checKrealUser(item){
          this.$emit('update:dialog', false);
                        this.addmantazhfromisset = false;
                        this.$emit('update:rightDrawer', true);
                        this.$emit('update:userid',  item);
      },
        async addMAntazh(){
          this.adduser = false;
            this.getListUser();
            this.addmantazhfromisset= true;
        },
      async getListUser(){
          this.loading = true;
            const { sortBy, sortDesc, page, itemsPerPage } = this.options;
             this.offsetUser = itemsPerPage*(page-1);
            let data = await this.$axios.get(`/users/users/?limit=${this.limitUser}&offset=${this.offsetUser}`);
            this.listUser = data.data.results;
        this.count = data.data.count;
        this.loading = false;
      },
        close(){
            this.adduser = false;
            this.dialog = false;
        }
    },
    watch:{
        dialog(newval){
            if(!newval){
                this.$emit('update:dialog', false);
            }
        },
      options: {
        handler () {
          this.getListUser()
        },
        deep: true,
      },
    }
}
</script>
