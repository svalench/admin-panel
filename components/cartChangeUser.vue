<template>
    <div>
    <v-card
    :loading="loading"
    style="margin-top:3%;"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>
<v-row>
    <v-col>
    <v-img
      height="250"
      
      v-bind:src="user.img"
    >
        <v-file-input
            hide-input
            chips
            v-model="files"
            @change="previewLoad"
            truncate-length="15"
      ></v-file-input>
    </v-img>
    </v-col>
    <v-col>
 
    <v-card-title v-if="!changeRow.nikname">{{user.username}} <v-icon v-if="user.id==undefined" @click="changeRow.nikname=true">mdi-lead-pencil</v-icon></v-card-title>
    <v-card-title v-else>
      <v-text-field v-model="user.username" :value="user.username" label="nikname пользоателя (желательно email)"></v-text-field>
      <v-icon @click="changeRow.nikname=false">mdi-check-bold</v-icon>
    </v-card-title>
    <v-card-title v-if="user.id==undefined">
      <v-text-field v-model="user.password" :value="user.password" label="пароль"></v-text-field>
    </v-card-title>
    <v-card-text>
        <div class="my-4 subtitle-1" v-if="changeRow.username">
            <v-text-field v-model="user.first_name" :value="user.first_name" label="first name"></v-text-field>
            <v-text-field v-model="user.last_name" :value="user.last_name" label="last name"></v-text-field>
            <v-icon @click="changeRow.username=false">mdi-check-bold</v-icon>
        </div>
      <div v-else class="my-4 subtitle-1">
        {{user.first_name}} {{user.last_name}} <v-icon @click="changeRow.username=true">mdi-lead-pencil</v-icon>
      </div>
      <div  v-if="changeRow.email" class="my-4 subtitle-1">
       <v-text-field v-model="user.email" :value="user.email" label="email"></v-text-field>
        <v-icon @click="changeRow.email=false">mdi-check-bold</v-icon>
      </div>
       <div v-else class="my-4 subtitle-1">
        {{user.email?user.email:'no email'}}<v-icon  @click="changeRow.email=true">mdi-lead-pencil</v-icon>
      </div>
<div v-if="changeRow.description">
    <v-textarea
          outlined
          name="input-7-4"
          label="description"
          v-model="user.description"
          :value="user.description"
        ></v-textarea>
      <v-icon @click="changeRow.description=false">mdi-check-bold</v-icon>
     </div>

      <div v-else>{{user.description?user.description:'No description'}}  <v-icon @click="changeRow.description=true">mdi-lead-pencil</v-icon></div>
    </v-card-text>
    </v-col></v-row>

    <v-divider class="mx-4"></v-divider>
    <v-row>
    <v-col>
        
    <v-row>
        <v-card-title>Дата регистрации</v-card-title>
        <v-card-text> {{user.date_joined}}</v-card-text>
    </v-row>

        <v-row>
    <v-card-title>Укажите пол</v-card-title>
    <v-card-text>
      <v-chip-group
        v-model="user.sex"
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip>неопределен</v-chip>
        <v-chip>мужской</v-chip>
        <v-chip>женский</v-chip>
      </v-chip-group>
    </v-card-text>
    </v-row>
    </v-col>
<v-col>
 <v-card-title>Дата рождения</v-card-title>
    <v-card-text>
      <v-date-picker v-model="user.birth_date"></v-date-picker>
    </v-card-text>
</v-col></v-row>

    <v-divider class="mx-4"></v-divider>
    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
        @click="close"
      >
        отмена
      </v-btn>
       <v-btn
        color="teal darken-1"
        text
        @click="save(user.id)"
      >
        сохранить
      </v-btn>
    </v-card-actions>
  </v-card>
    </div>
</template>

<script>
export default {
    props:['user','rightDrawer','userList'],
    data(){
        return{
            changeRow:{username:false, description:false, nikname:false, email:false},
            loading:false,
            selection:1,
            files:{},
            imagePreview:undefined,
            birth_date:null,
        }
    },
    watch:{
         rightDrawer(newval){
         if(!newval){
            this.birth_date = null;
            this.selection = 1;
            this.changeRow = {username:false, description:false, nikname:false, email:false};
         }else{
           if(this.user.id==undefined){
             for(let a in this.changeRow){
               this.changeRow[a] = true;
             }
           }
         }
         },
    },
    methods:{
      previewLoad(){
        if(this.user.id==undefined){
          this.user.img= URL.createObjectURL(this.files)              
                    // var reader = new FileReader();
                    // reader.addEventListener("load", function () {
                    //   console.log(reader);
                    //   this.imagePreview = reader.result;
                    //   this.user.img = this.imagePreview;
                    // }.bind(this), false);
                    // try{
                    //      reader.readAsDataURL( this.files );
                    // }catch{

                    // }
                    
            }
      },
        close(){
             this.$emit('update:rightDrawer', false)
        },
        async save(id){
          
           let formData = new FormData();
           if(this.files.name!=undefined){
                    formData.append('img', this.files);
                    var reader = new FileReader();
                    reader.addEventListener("load", function () {
                      this.imagePreview = reader.result;
                      this.user.img = this.imagePreview;
                    }.bind(this), false);
                     reader.readAsDataURL( this.files );
                    
                }else{
                   delete this.user.img;
                }
            
            formData.append('username', this.user.username);
            formData.append('is_staff', this.user.is_staff?this.user.is_staff:false);
            formData.append('is_superuser', this.user.is_superuser?this.user.is_superuser:false);
             formData.append('sex', this.user.sex?this.user.sex:1);
            formData.append('is_active', true);
            formData.append('first_name', this.user.first_name?this.user.first_name:'');
            formData.append('last_name', this.user.last_name?this.user.last_name:'');
            formData.append('email', this.user.email?this.user.email:'');
            formData.append('description', this.user.description?this.user.description:'');
             formData.append('birth_date', this.user.birth_date?this.user.birth_date:'');
           if(id==undefined){
             let adata = {username:this.user.username,  password:this.user.password, password2:this.user.password}
             console.log(adata);
             let users = await this.$axios.post('/registration/backend/registration/', adata);
             console.log(users);
             if(users.data.id!=undefined){
               let res = await this.$axios.put(`users/users/${users.data.id}/`,formData);
               this.userList.unshift(res.data)
             }
             
           }else{
              this.$axios.put(`users/users/${id}/`,formData);
           }
            
             this.$emit('update:rightDrawer', false)
        },
    },
}
</script>