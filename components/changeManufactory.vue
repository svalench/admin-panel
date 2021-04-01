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
      :src="factory.img"
    >
    <v-file-input
  hide-input
  chips
  v-model="files"
  :value="factory.img"
  truncate-length="15"
></v-file-input>
    </v-img>
    </v-col>
    <v-col>
 
    <v-card-title  v-if="changeRow.name">{{factory.name}}<v-icon @click="changeRow.name=false">mdi-lead-pencil</v-icon></v-card-title>
        <v-card-title v-else>
            <v-text-field v-model="factory.name" :value="factory.name" label="название"></v-text-field>
        <v-icon @click="changeRow.name=true">mdi-check-bold</v-icon>
        </v-card-title>

    <v-card-text>

<div v-if="changeRow.description">
    <v-textarea
          outlined
          name="input-7-4"
          label="description"
           v-model="factory.description"
          :value="factory.description"
        ></v-textarea>
      <v-icon @click="changeRow.description=false">mdi-check-bold</v-icon>
     </div>

      <div v-else>{{factory.description?factory.description:'No description'}}  <v-icon @click="changeRow.description=true">mdi-lead-pencil</v-icon></div>
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
        @click="save()"
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
            loading:false,
             changeRow:{name:true, description:false, nikname:false, email:false},
        }
    },
    props:['factory','rightDrawer'],
    mounted(){
    },
    watch:{
        rightDrawer(newval){
           if(newval && this.factory=={}){
                for(let i in this.changeRow){
                    this.changeRow[i] = !this.changeRow[i];
                }
           }
        },
        files(newval){
               console.log(newval);
           }
    },
    methods:{
        async save(){
            if(this.factory.id==undefined){
                let formData = new FormData();
                 formData.append('img', this.files);
                 formData.append('name', this.factory.name);
                 formData.append('description', this.factory.description);
               await this.$axios.post(`/admin/catalog/manufacturers/`,formData,{headers: {'Content-Type': 'multipart/form-data'}});
            }else{
                delete this.factory.img;
                let formData = new FormData();
                if(this.files.name!=undefined){
                    formData.append('img', this.files);
                }
                 formData.append('name', this.factory.name);
                 formData.append('description', this.factory.description);
                this.$axios.put(`/admin/catalog/manufacturers/${this.factory.id}/`,formData,{headers: {'Content-Type': 'multipart/form-data'}});
            
            }
            this.$emit('update:rightDrawer', false)
        },
        close(){
            this.$emit('update:rightDrawer', false)
        },

    },
}
</script>