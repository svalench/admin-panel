<template>
    <div>
        <v-card
    :loading="loading"
    style="margin-top:3%; padding: 4%"
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
      <ul>
        <li :ref="`docs__${d.id}`"  v-for="(d,k) in factory.docs_factories" :key="k">
          <a :href="d.doc" target="_blank">{{d.doc}}</a> <span @click="deleteDoc(d)" class="list">X</span>
        </li>
      </ul>
    </v-col>
    <v-col>

    <v-card-title  v-if="!changeRow.name">{{factory.name}}<v-icon @click="changeRow.name=false">mdi-lead-pencil</v-icon></v-card-title>
        <v-card-title v-else>
            <v-text-field v-model="factory.name" :value="factory.name" label="название"></v-text-field>
        <v-icon @click="changeRow.name=true">mdi-check-bold</v-icon>
        </v-card-title>
       <v-checkbox style="margin-left: 30px;" v-model="factory.is_active" label=" показать в каталоге"></v-checkbox>
    <v-card-text>

<div v-if="changeRow.description">
    <quill-editor
        ref="editor"
        v-model="factory.description"
        :options="editorOption"
      ></quill-editor>
      <v-icon @click="changeRow.description=false">mdi-check-bold</v-icon>

     </div>

      <div v-else>{{factory.description?factory.description:'No description'}}  <v-icon @click="changeRow.description=true">mdi-lead-pencil</v-icon></div>
    <v-card-title>
        <v-text-field v-model="factory.kirilica_name" label="url кирилица"></v-text-field>
      </v-card-title>
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
      <v-row style="margin-top: 150px;">
        <hr>
       <v-textarea label="SEO писание" v-model="factory.description_seo"></v-textarea>
     </v-row>
      <v-row style="margin-top: 150px;">
        <hr>
       <v-text-field label="Страна производитель" v-model="factory.country"></v-text-field>
     </v-row>
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
import textEditor from "~/components/global/textEditor";
var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],
  [{'container': ['image']}],
  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{'image':[]}],
  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['image'],
  ['clean']                                         // remove formatting button
];
export default {
    data(){
        return{
          cats:[],
            files:[],
          filesDocs:[],
            loading:false,
             changeRow:{name:false, description:false, nikname:false, email:false, description_seo: '', country: ''},
          editorOption: {
              modules:{
                  toolbar: {
                   container:  toolbarOptions,
                  }
              },
              theme: 'snow'
        },
        }
    },
  components:{
      textEditor
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
      deleteDoc(d){
        if(!confirm("Вы уверены? удалить документ?")){return;}
        this.$axios.delete(`/admin/catalog/docs/factory/admin/${d.id}/`);
           this.factory.docs_factories.splice( this.factory.docs_factories.findIndex(x=>x.id===d.id),1)
      },
        async save(){
            if(this.factory.id==undefined){
                let formData = new FormData();
                 formData.append('img', this.files);
                 formData.append('show_in_start', this.factory.show_in_start==undefined?false:this.factory.show_in_start);
                 formData.append('name', this.factory.name);
                 formData.append('is_active', this.factory.is_active);
                 if(this.factory.cats!==undefined){
                    for(let i of this.factory.cats){
                      formData.append('cats', i);
                    }
                 }
                 formData.append('kirilica_name', this.factory.kirilica_name);
                 formData.append('description', this.factory.description);
                 formData.append('country', this.factory.country);
                 formData.append('description_seo', this.factory.description_seo);
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
                formData.append('is_active', this.factory.is_active);
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
                 formData.append('country', this.factory.country);
                  formData.append('kirilica_name', this.factory.kirilica_name);
                 formData.append('description_seo', this.factory.description_seo);
              console.log(this.factory.kirilica_name)
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
