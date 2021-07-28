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
<div v-if="changeRow.description">
    <v-textarea
          outlined
          name="input-7-4"
          label="description"
          v-model="card.description"
          :value="card.description"
        ></v-textarea>
      <v-icon @click="changeRow.description=false">mdi-check-bold</v-icon>
     </div>

      <div v-else>{{card.description?card.description:'No description'}}  <v-icon @click="changeRow.description=true">mdi-lead-pencil</v-icon></div>
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
export default {
    data(){
        return{
          leftDrawer:false,
          files:[],
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
                if(this.card.product.length){
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
      async getValuesFilters(){
      let data = await this.$axios.get(`/admin/catalog/new_chice/?limit=9999999999`);
      this.filters = data.data.results;
        console.log(this.filters)
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
                 if(this.select_manuf!=undefined){
                  formData.append('manufacturer', this.select_manuf);
                  this.card.manufacturer = this.select_manuf;
                   this.card.manufacturer_name = this.manufacturers.filter(x=>x.id==this.select_manuf)[0].name ;
                }
                for(let i in this.filters_select){
                    formData.append('filters',  this.filters_select[i]);
                }
                 formData.append('name', this.card.name);
                 formData.append('cat', this.card.cat);
                 formData.append('discont', this.card.discont);
                 formData.append('filter_id_show', this.card.filter_id_show?this.card.filter_id_show:0);
                 formData.append('s1_id', this.card.s1_id);
                 for(let i of this.card.filters_new){
                   formData.append('filters_new', i);
                 }

                 formData.append('description', this.card.description);
                 formData.append('multiplicity', this.card.multiplicity);
                 formData.append('units', this.card.units);
           await this.$axios.patch(`/admin/catalog/cardproduct_admin/${this.card.id}/`,formData,{headers: {'Content-Type': 'multipart/form-data'}});
           if(this.files_slider.length>0){
              for(let i in this.files_slider){
                let imgForm = new FormData();
                imgForm.append('img', this.files_slider[i]);
                imgForm.append('parent', this.card.id);
              await this.$axios.post('/admin/catalog/cardproduct_img_admin/',imgForm);
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
