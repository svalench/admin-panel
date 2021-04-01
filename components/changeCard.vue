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
    <v-img
      :src="card.img"
    >
    <v-file-input
  hide-input
  chips
  v-model="files"
  truncate-length="15"
></v-file-input>
    </v-img>
    </v-col>
    <v-col>
 
    <v-card-title  v-if="changeRow.name">{{card.name}}<v-icon @click="changeRow.name=false">mdi-lead-pencil</v-icon></v-card-title>
        <v-card-title v-else>
            <v-text-field v-model="card.name" :value="card.name" label="название"></v-text-field>
        <v-icon @click="changeRow.name=true">mdi-check-bold</v-icon>
        </v-card-title>
        <v-card-title>
            <v-text-field v-model="card.s1_id" :value="card.s1_id" label="id в 1С"></v-text-field>
        </v-card-title>
    <v-card-title>
        <v-select
        v-model="select_cat"
          :items="cats_first"
          item-text="name"
          item-value="id"
          label="Родительская категория"
          dense
          outlined
        ></v-select>
    </v-card-title>
    <v-card-title>
        <v-select
        v-model="select_cat_second"
          v-bind:items="currentFirstCat!=null?cats.filter(x=>x.parent==currentFirstCat.id):second_arr"
          item-text="name"
          item-value="id"
          label="Категория"
          dense
          :disabled="select_cat==undefined?true:false"
          outlined
        ></v-select>
    </v-card-title>
    <v-card-text>

<div v-if="changeRow.description">
    <v-textarea
          outlined
          name="input-7-4"
          label="description"
          :value="card.description"
        ></v-textarea>
      <v-icon @click="changeRow.description=false">mdi-check-bold</v-icon>
     </div>

      <div v-else>{{card.description?card.description:'No description'}}  <v-icon @click="changeRow.description=true">mdi-lead-pencil</v-icon></div>
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
        @click="save(card.id)"
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
            select_cat:undefined,
            second_arr:[],
            select_cat_second:null,
            loading:false,
             changeRow:{name:true, description:false, nikname:false, email:false},
        }
    },
    props:['card','currentCat','cats','currentFirstCat', 'cats_first','rightDrawer'],
    mounted(){
    },
    watch:{
        select_cat(newval){
            this.second_arr = this.cats.filter(x=>x.parent==newval);

        },
        rightDrawer(newval){
           
            if(!newval){
                this.select_cat = undefined;
                this.select_cat_second={};
            }else{
                if(this.currentCat!=null){
                    this.second_arr = this.cats.filter(x=>x.parent==this.currentFirstCat.id);
                    this.select_cat_second=this.currentCat;
                   
                }else{
                    this.select_cat_second=undefined;
                }
                this.currentFirstCat!=null?this.select_cat=this.currentFirstCat:this.select_cat=undefined;  
                 console.log(this.second_arr,'asd');
            }
           
        }
    },
    methods:{
        save(){
            this.card.cat = this.select_cat_second.id==undefined?this.select_cat_second:this.select_cat_second.id;
            if(this.card.img.name==undefined){
               delete this.card.img;
            }
            let formData = new FormData();
                if(this.card.name!=undefined){
                    formData.append('img', this.files);
                }
                 formData.append('name', this.card.name);
                 formData.append('cat', this.card.cat);
                 formData.append('s1_id', this.card.s1_id);
                 formData.append('description', this.card.description);
            this.$axios.put(`/admin/catalog/cardproduct_admin/${this.card.id}/`,formData,{headers: {'Content-Type': 'multipart/form-data'}});
            this.$emit('update:rightDrawer', false)
        },
        close(){
            this.$emit('update:rightDrawer', false)
        },

    },
}
</script>