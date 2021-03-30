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
      :src="user.img"
    ></v-img>
    </v-col>
    <v-col>
 
    <v-card-title>{{user.username}}</v-card-title>

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
    props:['user'],
    data(){
        return{
            changeRow:{username:false, description:false, nikname:false, email:false},
            loading:false,
            selection:1,
            birth_date:null,
        }
    },
    methods:{
        close(){
            console.log(this.$parent);
            this.$parent.rightDrawer = !this.$parent.rightDrawer;
        },
        save(id){
            delete this.user.password;
            delete this.user.img;
            this.$axios.put(`users/users/${id}/`, this.user)
        },
    },
}
</script>