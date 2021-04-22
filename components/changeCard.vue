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
    <v-card-title>
        <v-select
        v-model="group_filter"
          v-bind:items="filters"
          item-text="name"
          item-value="id"
          label="Группы филтров"
          chips
            multiple
          :disabled="select_cat==undefined?true:false"
          outlined
        ></v-select>
    </v-card-title>
    <v-card-title v-for="val in filters_value" :key="val.name">
        <v-select
        v-model="filters_select"
          v-bind:items="val.values"
          item-text="value"
          item-value="id"
          :label="'Фильтр '+val.name"
          chips
            multiple
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
          file1:'',
          filters:[],
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
    props:['card','currentCat','cats','currentFirstCat', 'cats_first','rightDrawer','manufacturers'],
    mounted(){
    },
    watch:{
      group_filter(newval){
        console.log(newval);
        if(Array.isArray(newval) && newval.length>0){
           this.filters_value = [];
          for(let i of newval){
            let a = this.filters.find(x=>x.id==i);
             this.filters_value.push({values:a.filter_value,name:a.name});
          }
        }
       // this.filters_value = 
      },
        select_cat(newval){
            this.second_arr = this.cats.filter(x=>x.parent==newval);
            
        },
        select_cat_second(newval){
           let a = this.cats.filter(x=>x.id==newval)[0];
           a!=undefined? this.filters =  a.filters_list:[];
        },
        rightDrawer(newval){
           
            if(!newval){
               this.filters_select =[];
               this.group_filter = [];
                this.files_slider =[];
                this.select_cat = undefined;
                this.select_cat_second={};
                this.select_manuf = undefined;
                this.imagePreview = null;
            }else{
                if(this.currentCat!=null){
                  this.filters_select = this.card.filters;                  
                    this.second_arr = this.cats.filter(x=>x.parent==this.currentFirstCat.id);
                    this.select_cat_second=this.currentCat.id;
                    let a = this.cats.filter(x=>x.id==newval)[0];
                    a!=undefined? this.filters =  a.filters_list:[];
                    this.filters =  this.cats.filter(x=>x.id==newval)[0].filters_list;
                   if(this.card.filters.length>0){
                      for(let a of this.card.filters){
                        console.log(this.filters.find(x=>x.filter_value.find(c=>c.id==a)));
                        try{
                            this.group_filter.push(this.filters.find(x=>x.filter_value.find(c=>c.id==a)).id);
                        }catch{
                             this.group_filter=[];
                        }
                        
                        this.group_filter = [... new Set(this.group_filter)]
                      }
                    }
                }else{
                    this.select_cat_second=undefined;
                }
                this.currentFirstCat!=null?this.select_cat=this.currentFirstCat:this.select_cat=undefined;  
            }
           
        }
    },
    methods:{
      async deleteImageSlider(){
        await this.$axios.delete(`/admin/catalog/cardproduct_img_admin/${this.card.images[this.actualImage].id}/`);
        this.card.images.splice(this.actualImage,1);
      },
       async save(){
            this.card.cat = this.select_cat_second!=undefined?this.select_cat_second:'';
           if (this.select_cat_second!=undefined){
             this.card.cat_name= this.cats.filter(x=>x.id==this.select_cat_second)[0].name;
           }
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
                 formData.append('s1_id', this.card.s1_id);
                 formData.append('description', this.card.description);
           await this.$axios.put(`/admin/catalog/cardproduct_admin/${this.card.id}/`,formData,{headers: {'Content-Type': 'multipart/form-data'}});
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
        close(){
            this.$emit('update:rightDrawer', false)
        },

    },
}
</script>