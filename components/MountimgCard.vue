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
    <v-col cols="6">
      <div>
    <v-img
      :src="mantazhnik!=undefined?mantazhnik.whoiam.img:''"
    >
    <v-file-input
  hide-input
  chips
  v-model="files"
  truncate-length="15"
></v-file-input>
    </v-img>
    </div>
    <div>
      <v-card-text>
      <v-chip-group
        v-model="sex"
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip>неопределен</v-chip>
        <v-chip>мужской</v-chip>
        <v-chip>женский</v-chip>
      </v-chip-group>
    </v-card-text>
    </div>
    </v-col>
    <v-col>
 
    <v-card-title v-if="!changeRow.name" >{{mantazhnik!=undefined?mantazhnik.whoiam.first_name:''}} {{mantazhnik!=undefined?mantazhnik.whoiam.last_name:''}}<v-icon @click="changeRow.name=true">mdi-lead-pencil</v-icon></v-card-title>
        <v-card-title v-else>
            <v-text-field v-model="mantazhnik.whoiam.first_name" :value="mantazhnik.whoiam.first_name" label="имя"></v-text-field>
            <v-text-field v-model="mantazhnik.whoiam.last_name" :value="mantazhnik.whoiam.last_name" label="фамилия"></v-text-field>
        <v-icon @click="changeRow.name=false">mdi-check-bold</v-icon>
        </v-card-title>
    <v-card-title>
         <v-text-field v-model="mantazhnik.price" type="number" :value="mantazhnik.price" label="цена"></v-text-field>
    </v-card-title>
    <v-card-text>
<div v-if="changeRow.description">
    <v-textarea
          outlined
          name="input-7-4"
          label="description"
          v-model="mantazhnik.description"
          :value="mantazhnik.description"
        ></v-textarea>
      <v-icon @click="changeRow.description=false">mdi-check-bold</v-icon>
     </div>

      <div v-else>{{mantazhnik!=undefined?mantazhnik.description?mantazhnik.description:'Нет описания':''}}  <v-icon @click="changeRow.description=true">mdi-lead-pencil</v-icon></div>
    </v-card-text>
    <v-card-text>
    <div v-if="changeRow.about">
    <v-textarea
          outlined
          name="input-7-4"
          label="description"
          v-model="mantazhnik.about"
          :value="mantazhnik.about"
        ></v-textarea>
      <v-icon @click="changeRow.about=false">mdi-check-bold</v-icon>
     </div>

      <div v-else>{{mantazhnik!=undefined?mantazhnik.about?mantazhnik.about:'Нет описания дейтельности':''}}  <v-icon @click="changeRow.about=true">mdi-lead-pencil</v-icon></div>
    </v-card-text>
    </v-col>
    </v-row>

    <v-divider class="mx-4"></v-divider>
   

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
        @click="save"
      >
        сохранить
      </v-btn>
    </v-card-actions>
  </v-card>
    </div>
</template>

<script>
export default {
    data(){
        return{
        files:[],
        file1:'',
        sex:0,
        imagePreview:null,
        loading:false,
        changeRow:{name:false, description:false, about:false, nikname:false, email:false, phone:false,},
        }
    },
     props:['rightDrawer','mantazhnik','newuserid'],
    methods:{
        async save(){
             let formData = new FormData();
             let formDataUser = new FormData();
             if(this.files.name!=undefined){
                formDataUser.append('img',  this.files);
                this.changeImg();
             }
             if(this.newuserid!=null){
               this.mantazhnik.user = this.newuserid;
               formDataUser.append('is_active', true);
             }
            formDataUser.append('first_name', this.mantazhnik.whoiam.first_name);
            formDataUser.append('sex', this.sex);
            formDataUser.append('last_name', this.mantazhnik.whoiam.last_name);
            formData.append('description', this.mantazhnik.description!=undefined? this.mantazhnik.description:'');
            formData.append('about', this.mantazhnik.about!=undefined?this.mantazhnik.about:'');
            formData.append('price', this.mantazhnik.price);
            formData.append('user', this.mantazhnik.user);
            if(this.mantazhnik.tag!=undefined && this.mantazhnik.tag.length>0){
              for(let i of this.mantazhnik.tags){
                formData.append('tags', i);
            }
            }
            
            
            let resUser = await this.$axios.put(`users/users/${this.mantazhnik.user}/`,formDataUser);
            if(this.mantazhnik.id!=undefined){
              let res = await this.$axios.put(`/users/mounting/${this.mantazhnik.id}/`,formData);
            }else{
               let res = await this.$axios.post(`/users/mounting/`,formData);
            }
            
            this.$emit('update:newuserid',  null);
            
        },
        close(){
            console.log(this.mantazhnik);
            this.$emit('update:rightDrawer', false);
        },
        changeImg(){
                    var reader = new FileReader();
                    reader.addEventListener("load", function () {
                      this.imagePreview = reader.result;
                      this.mantazhnik.whoiam.img = this.imagePreview;
                    }.bind(this), false);
                     reader.readAsDataURL( this.files );
        }
    },
    watch:{

    }
}
</script>