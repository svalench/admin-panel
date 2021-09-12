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
            <v-file-input
    v-model="filesDocs"
    placeholder="Загрузите документы"
    label="Сертификаты"
    multiple
    prepend-icon="mdi-paperclip"
  >
    <template v-slot:selection="{ text }">
      <v-chip
        small
        label
        color="primary"
      >
        {{ text }}
      </v-chip>
    </template>
  </v-file-input>
    </v-col>
    <v-col>

    <v-card-title  v-if="!changeRow.name">{{factory.name}}<v-icon @click="changeRow.name=false">mdi-lead-pencil</v-icon></v-card-title>
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
    <div>
      <v-checkbox
      v-model="factory.show_in_start"
      :label="`Показывать на главной -  ${factory.show_in_start?'да':'нет'}`"
    ></v-checkbox>
    </div>
    </v-card-text>
      <v-card-title >
        <v-select
        v-model="factory.cats"
        :items="cats"
          item-text="name"
          item-value="id"
          label="Категории"
          chips
            multiple
          outlined
        ></v-select>
    </v-card-title>
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
          cats:[],
            files:[],
          filesDocs:[],
            loading:false,
             changeRow:{name:false, description:false, nikname:false, email:false},
        }
    },
    props:['factory','rightDrawer'],
    mounted(){
    },
    watch:{
        rightDrawer(newval){
          if(newval){
            this.getCats();
            console.log(this.factory)
          }
           if(newval && this.factory['id']==undefined){
                for(let i in this.changeRow){
                    this.changeRow[i] = true;
                }

           }else{
             for(let i in this.changeRow){
                    this.changeRow[i] = false;
                }
           }
        },
      // factory(n,o){
      //   if(n['id']==undefined){
      //     for(let i in this.changeRow){
      //               this.changeRow[i] = !this.changeRow[i];
      //           }
      //   }
      // },
        files(newval){
           }
    },
    methods:{
        async save(){

            if(this.factory.id==undefined){
                let formData = new FormData();
                 formData.append('img', this.files);
                 formData.append('show_in_start', this.factory.show_in_start==undefined?false:this.factory.show_in_start);
                 formData.append('name', this.factory.name);
                 if(this.factory.cats!==undefined){
                    for(let i of this.factory.cats){
                      formData.append('cats', i);
                    }
                 }

                 formData.append('description', this.factory.description);
              let d = await this.$axios.post(`/admin/catalog/manufacturers/`,formData,{headers: {'Content-Type': 'multipart/form-data'}});
               if(this.filesDocs.length>0){
              for(let i in this.filesDocs){
                let simgForm = new FormData();
                simgForm.append('doc', this.filesDocs[i]);
                simgForm.append('parent', d.data.id);
              await this.$axios.post('/admin/catalog/docs/factory/admin/',simgForm);
              }
           }
            }else{
                delete this.factory.img;
                let formData = new FormData();
                if(this.files.name!=undefined){
                    formData.append('img', this.files);
                }
                 formData.append('name', this.factory.name);
                for(let i of this.factory.cats){
                   formData.append('cats', i);
                 }
                 if(this.filesDocs.length>0){
              for(let i in this.filesDocs){
                let simgForm = new FormData();
                simgForm.append('doc', this.filesDocs[i]);
                simgForm.append('parent', this.factory.id);
              await this.$axios.post('/admin/catalog/docs/factory/admin/',simgForm);
              }
           }
                 formData.append('show_in_start', this.factory.show_in_start==undefined?false:this.factory.show_in_start);
                 formData.append('description', this.factory.description);
                this.$axios.put(`/admin/catalog/manufacturers/${this.factory.id}/`,formData,{headers: {'Content-Type': 'multipart/form-data'}});

            }
            this.$emit('update:rightDrawer', false)
        },
        close(){
            this.$emit('update:rightDrawer', false)
        },
      async getCats(){
        let data = await this.$axios('/admin/catalog/category_first/?limit=99999999');
        console.log(data);
        this.cats = data.data.results;
      }

    },
}
</script>
