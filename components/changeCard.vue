<template>
    <div>
        <v-card
    :loading="loading"
    style="margin-top:2%;"
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

    <v-card>
        <v-carousel v-model="actualImage">
    <v-carousel-item
      v-for="(item,i) in card.images"
      v-bind:key="i"
      v-bind:src="item.img"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>
  <v-btn @click="deleteImageSlider"> <v-icon>mdi-delete</v-icon></v-btn>
    </v-card>
     <v-file-input
    v-model="files_slider"
    placeholder="Загрузите фото"
    label="Фото в карусель"
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
        <li :ref="`docs__${d.id}`"  v-for="(d,k) in card.docs" :key="k">
          <a :href="d.doc" target="_blank">{{d.doc}}</a> <span @click="deleteDoc(d)" class="list">X</span>
        </li>
      </ul>
    </v-col>
    <v-col>
    <v-card-title  v-if="changeRow.name">{{card.name}}<v-icon @click="changeRow.name=false">mdi-lead-pencil</v-icon>
     <v-checkbox style="margin-left: 30px;" v-model="card.is_active" label="Скрыть"></v-checkbox>
    </v-card-title>
        <v-card-title v-else>
            <v-text-field v-model="card.name" :value="card.name" label="название"></v-text-field>
        <v-icon @click="changeRow.name=true">mdi-check-bold</v-icon>

        </v-card-title>
        <v-card-title>
            <v-text-field v-model="card.position" :value="card.position" label="Позиция в каталоге"></v-text-field>
        </v-card-title>
      <v-card-title>
            <v-text-field v-model="card.discont" :value="card.discont?card.discont:card.discont=0" label="Скидка"></v-text-field>
        </v-card-title>
          <v-card-title>
        <v-select
        v-model="card.filter_id_show"
          :items="raw_check"
          item-text="name"
          item-value="parent"
          label="Что выводим в чекбоксах"
          dense
          outlined
        ></v-select>
    </v-card-title>
        <v-card-title>
        <v-select
        v-model="select_manuf"
          :items="manufacturers"
          item-text="name"
          item-value="id"
          label="Производитель"
          dense
          outlined
        ></v-select>
    </v-card-title>
      <v-card-text>
        <v-text-field label="укажите кратность" v-model="card.multiplicity" type="intager"></v-text-field>
        <v-text-field label="едеинцы измерения" v-model="card.units" type="text"></v-text-field>
      </v-card-text>
    <v-card-title>
        <v-select
        v-model="card.cat"
          :items="cats_first"
          item-text="name"
          item-value="id"
          label="Родительская категория"
          dense
        multiple
          outlined
        ></v-select>
    </v-card-title>
    <v-card-title>
        <v-select
        v-model="card.filters_new"
          v-bind:items="filters"
          item-text="value"
          item-value="id"
          label="фильтра"
          chips
            multiple
          outlined
        ></v-select>
    </v-card-title>

    <v-card-text>
     <quill-editor
        ref="editor"
        v-model="card.description"
        :options="editorOption"
      ></quill-editor>
 </v-card-text>

    </v-col>
    </v-row>
          <v-divider class="mx-4"></v-divider>
        <v-card-text>
          <chackbox-card :id="card.id" :list="card.product"></chackbox-card>
        </v-card-text>

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

     <v-navigation-drawer
      v-model="leftDrawer"
      :right="false"
      temporary
      fixed
      width="60%"
    >
   </v-navigation-drawer>
    </div>
</template>
<script>
import chackboxCard from "~/components/chackboxCard";
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
          editorOption: {
              modules:{
                  toolbar: {
                   container:  toolbarOptions,
                  }
              },
              theme: 'snow'
        },
          leftDrawer:false,
          files:[],
          filesDocs:[],
          file1:'',
          select_raw_check:null,
          filters:[],
          raw_check:[],
          files_slider: [],
          filters_value:[],
          group_filter:[],
          filters_select:[],
          imagePreview:null,
          actualImage:0,
          select_manuf:undefined,
            select_cat:undefined,
            second_arr:[],
            select_cat_second:null,
            loading:false,
             changeRow:{name:true, description:false, nikname:false, email:false},
        }
    },
  components:{
      chackboxCard,
      textEditor,
  },
    props:['card','currentCat','cats','currentFirstCat', 'cats_first','rightDrawer','manufacturers'],
    mounted(){
      this.getValuesFilters()
    },
    watch:{
      group_filter(newval){
        if(Array.isArray(newval) && newval.length>0){
           this.filters_value = [];
          for(let i of newval){
            let a = this.filters.find(x=>x.id==i);
             this.filters_value.push({values:a.filter_value,name:a.name});
          }
        }
      },
        select_cat(newval){
            this.second_arr = this.cats.filter(x=>x.parent==newval);

        },
        rightDrawer(newval){
            console.log(this.card)
            if(!newval){
              this.raw_check=[];
              this.select_raw_check=null;
               this.filters_select =[];
               this.group_filter = [];
                this.files_slider =[];
                this.select_cat = undefined;
                this.select_cat_second={};
                this.select_manuf = undefined;
                this.imagePreview = null;
            }else{
                this.select_manuf = this.card.manufacturer;
                if(this.card.product && this.card.product.length){
                    this.raw_check = this.card.product[0].filter_dict;

                  }
                if(this.currentCat!=null){
                    this.second_arr = this.cats.filter(x=>x.parent===this.currentFirstCat.id);
                  this.filters_select = this.card.filters;

                    this.select_cat_second=this.currentCat.id;
                    let a = this.cats.filter(x=>x.id===newval)[0];
                    a!==undefined? this.filters =  a.filters_list:[];
                    // this.filters =  this.cats.filter(x=>x.id==newval)[0].filters_list;

                }else{
                    this.select_cat_second=undefined;
                }
                this.currentFirstCat!=null?this.select_cat=this.currentFirstCat:this.select_cat=undefined;
            }

        }
    },
    methods:{
      deleteDoc(d){
        if(!confirm("Вы уверены? удалить документ?")){return;}
        this.$axios.delete(`/admin/catalog/docs/admin/${d.id}/`);
           this.card.docs.splice( this.card.docs.findIndex(x=>x.id===d.id),1)
      },
      async getValuesFilters(){
      let data = await this.$axios.get(`/admin/catalog/new_chice/?limit=9999999999`);
      this.filters = data.data.results;

    },
      /**
       * удоляет по одной фотки из слайдера
       * @returns {Promise<void>}
       */
      async deleteImageSlider(){
        await this.$axios.delete(`/admin/catalog/cardproduct_img_admin/${this.card.images[this.actualImage].id}/`);
        this.card.images.splice(this.actualImage,1);
      },
      /**
       * сохроняет данные
       * @returns {Promise<void>}
       */
       async save(){
            let formData = new FormData();
                if(this.files.name!=undefined){
                    formData.append('img', this.files);
                    var reader = new FileReader();
                    reader.addEventListener("load", function () {
                      this.imagePreview = reader.result;
                      this.card.img = this.imagePreview;
                    }.bind(this), false);
                     reader.readAsDataURL( this.files );

                }else{
                 // delete this.card.img;
                }
                 if(this.select_manuf!==undefined){
                  formData.append('manufacturer', this.select_manuf);
                  this.card.manufacturer = this.select_manuf;
                   this.card.manufacturer_name = this.manufacturers.filter(x=>x.id==this.select_manuf)[0].name ;
                }
                 if(this.filters_select===undefined){this.filters_select=[]}
                for(let i in this.filters_select){
                    formData.append('filters',  this.filters_select[i]);
                }
                 formData.append('name', this.card.name);
                 formData.append('is_active', this.card.is_active===undefined?false:this.card.is_active);

                 formData.append('discont', this.card.discont);
                 formData.append('filter_id_show', this.card.filter_id_show?this.card.filter_id_show:0);
                 formData.append('position', this.card.position);
                 if( this.card.filters_new===undefined){ this.card.filters_new=[]}
                 for(let i of this.card.filters_new){
                   formData.append('filters_new', i);
                 }
                 if(this.card.cat===undefined){alert("Не выбрана категория"); return;}
                 for(let i of this.card.cat){
                   formData.append('cat', i);
                 }

                 formData.append('description', this.card.description);
                 formData.append('multiplicity', this.card.multiplicity);
                 formData.append('units', this.card.units);
                 if (this.card.id){
                   await this.$axios.patch(`/admin/catalog/cardproduct_admin/${this.card.id}/`,formData,{headers: {'Content-Type': 'multipart/form-data'}});
                 }else{

                  let d =  await this.$axios.post(`/admin/catalog/cardproduct_admin/`,formData,{headers: {'Content-Type': 'multipart/form-data'}}).catch(function(err){
                     if (err.response) {
                       let str = "";
                       for(let i in err.response.data){
                         str+= `${i} - ${err.response.data[i][0]}`
                       }
                       alert(str);
                       return;
                     }
                   });
                  if(d===undefined){return ;}else{this.card = d.data; this.$emit('add_to_arr', d.data)}
                 }

            if(this.files_slider.length>0){
              let parent = this.card.id
              for(let i in this.files_slider){
                let imgForm = new FormData();
                imgForm.append('img', this.files_slider[i]);
                imgForm.append('parent', parent);
              await this.$axios.post('/admin/catalog/cardproduct_img_admin/',imgForm);
              }
           }
           if(this.filesDocs.length>0){
              for(let i in this.filesDocs){
                let simgForm = new FormData();
                simgForm.append('doc', this.filesDocs[i]);
                simgForm.append('parent', this.card.id);
              await this.$axios.post('/admin/catalog/docs/admin/',simgForm);
              }
           }
            this.$emit('update:rightDrawer', false)
        },
      /**
       * закрытие компонента
       */
        close(){
            this.$emit('update:rightDrawer', false)
        },

    },
}
</script>
<style>
 .list{
  content: "x";
  border-radius: 5px;
  border: #333333 solid;
  margin-left: 5px;
  margin-right: 10px;
   padding: 2px;

}
.list:hover{
  cursor: pointer;
  background-color: #e82d7d;
}
</style>
