<template>
      <v-dialog
      v-model="dialog"
        transition="dialog-bottom-transition"
        max-width="600"
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
                <v-btn v-if="adduser" :disabled="newuser.password.length<8?true:false" @click="addUser">Добавить</v-btn>
                <v-btn @click="adduser=!adduser">{{adduser?'назад':1}}</v-btn>
                <v-btn @click="addMAntazh">2</v-btn>
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
           errors:{},
           newuser:{username:'',password:'',password2:''},
        }
    },
    props:['dialog','rightDrawer','newuserid'],
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
                 console.log(users);
                 console.log(this.errors);
                 if(users != undefined && users.status==201){
                        this.$emit('update:dialog', false);
                        this.adduser = false;
                        this.$emit('update:rightDrawer', true);
                        this.$emit('update:newuserid',  users.data.id);
                 }
        },
        addMAntazh(){

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
        }
    }
}
</script>