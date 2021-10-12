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
         <v-text-field ref="price" v-model="mantazhnik.price" type="number" :value="mantazhnik.price" label="скидка"></v-text-field>
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
      <v-card-text>
        <v-select
            v-model="mantazhnik.tags"
            :items="tags"
            attach
            item-value="id"
            item-text="name"
            chips
            label="Тэги"
            multiple
          ></v-select>
      </v-card-text>
      <v-card-text >
        <v-btn @click="addPhone"><v-icon>mdi-plus</v-icon></v-btn>
        <div  v-for="(phone,k) in phone_s" :key="k" >
          <v-text-field label="телефон" v-model="phone.phone_number"></v-text-field>
        </div>

      </v-card-text>
      <v-card-text v-if="this.mantazhnik.id">
        <div>
          количество работ - {{mantazhnik.portfolio!==undefined?mantazhnik.portfolio.length:0}} <v-btn @click="dialog=true">Редактировать</v-btn>
        </div>
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
        ref="save_btn"
        :disabled="save_btn_disabled"
        @click="save"
      >
        сохранить
      </v-btn>
    </v-card-actions>
  </v-card>
       <v-dialog v-model="dialog">
         <v-card v-if="edit">
           <v-card-title>Добавить работу</v-card-title>
           <v-row>
             <v-col cols="6">
           <v-card-text>
             <v-text-field v-model="portfolio.title"></v-text-field>
             <v-textarea v-model="portfolio.description"></v-textarea>
           </v-card-text>
               </v-col>
             <v-col cols="6">
               <v-btn @click="deleteImageSlider"><v-icon>mdi-delete</v-icon></v-btn>
                  <v-carousel  v-model="portfolio.model">
                          <v-carousel-item
                            v-for="(img, key) in portfolio.images"
                            :key="key"
                          >
                            <v-img :src="img.img" :aspect-ratio="16/9"></v-img>
                          </v-carousel-item>
                        </v-carousel>
                          <v-file-input
                            v-model="portfolio.images1"
                          multiple
                          truncate-length="6"
                        ></v-file-input>
             </v-col>
             </v-row>
           <v-card-actions>
             <v-btn @click="backToList">Отмена</v-btn>
             <v-btn @click="addPortfolio">Сохранить</v-btn>
           </v-card-actions>
         </v-card>
            <v-card v-else>
              <v-card-title>
                Список работ монтажника
              </v-card-title>
              <v-card-text>

                  <v-card v-for="(i,k) in mantazhnik.portfolio" :key="k">
                    <v-row >
                  <v-col cols="6">
                    <v-card-title>{{i.title}}</v-card-title>
                    <v-card-text>{{i.description}}</v-card-text>
                    </v-col>
                      <v-col cols="6">
                        <v-carousel  v-model="model[k]">
                          <v-carousel-item
                            v-for="(img, key) in i.images"
                            :key="key"
                          >
                            <v-img :src="img.img" :aspect-ratio="16/9"></v-img>
                          </v-carousel-item>
                        </v-carousel>

                  </v-col>
                  </v-row>
                    <v-card-actions>
                      <v-btn @click="deletePortfolio(i)" color="red"><v-icon>mdi-delete</v-icon></v-btn>
                      <v-btn @click="startUpdate(i)" color="blue"><v-icon>mdi-update</v-icon></v-btn>
                    </v-card-actions>
                  </v-card>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="dialog=false">Отмена</v-btn>
                <v-btn @click="edit=true">Добавить</v-btn>
              </v-card-actions>
            </v-card>
       </v-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
          save_btn_disabled:false,
          files:[],
          file1:'',
          sex:0,
          model:Array(),
          dialog:false,

          imagePreview:null,
          loading:false,
          tags:[],
          changeRow:{name:false, description:false, about:false, nikname:false, email:false, phone:false,},
          edit:false,
          mantazhnik:JSON.parse(JSON.stringify(this.mantaz)),
          phone_s:this.mantazhnik!==undefined?this.mantazhnik.phone_s?this.mantazhnik.phone_s:[]:[],
          portfolio:{description:'',title:'',images:[],images1:[],model:0}
        }
    },
     props:['rightDrawer','mantaz','newuserid', 'userid'],
  mounted() {
      this.getTags();
  },
  methods:{
      async deleteImageSlider(){
        await this.$axios.delete(`/portfolio/images/${this.portfolio.images[this.portfolio.model].id}/`);
        this.portfolio.images.splice(this.actualImage,1);
      },
      backToList(){
        this.portfolio={description:'',title:'',images1:[],images:[],model:0};
            this.edit = false;
      },
    startUpdate(item){
        this.edit = true;
        this.portfolio.title = item.title;
        this.portfolio.description = item.description;
        this.portfolio.images = item.images;
        this.portfolio.model = 0;
        this.portfolio['id'] = item.id;
    },
    async addPortfolio(){
        let formData = new FormData();
        formData.append('description', this.portfolio.description)
        formData.append('title', this.portfolio.title)
        formData.append('user', this.mantazhnik.whoiam.id)
      let dss;
      if(this.portfolio.id!==undefined){
           dss = await this.$axios.patch(`/portfolio/user/${this.portfolio.id}/`,formData);
      }else{
         dss = await this.$axios.post('/portfolio/user/',formData);
      }
      let formDataImg = new FormData();
        for(let i of this.portfolio.images1){
          formDataImg = new FormData();
          formDataImg.append('img',i)
          formDataImg.append('parent',dss.data.id)
          let d = await this.$axios.post('/portfolio/images/',formDataImg)
        }
        this.backToList()
    },
      async getTags(){
        let data = await this.$axios.get(`mounters/all_tags/?limit=9999999`);
        this.tags = data.data.results;
      },
        async save(){
        if(this.mantazhnik.price===undefined){
            this.mantazhnik.price = 0;
            return;
        }
        this.save_btn_disabled = true;
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
            if(this.mantazhnik.tags!==undefined && this.mantazhnik.tags.length>0){
              for(let i of this.mantazhnik.tags){
                formData.append('tags', i);
            }
            }
             if(this.userid!=null){
               formDataUser.append('is_active', true);
             }
            let res={}
            let resUser = await this.$axios.patch(`users/users/${this.mantazhnik.user}/`,formDataUser);
            if(this.mantazhnik.id!=undefined){
             res  = await this.$axios.patch(`/users/mounting/${this.mantazhnik.id}/`,formData);
             res['thisisnew'] = false;
            }else{
              res = await this.$axios.post(`/users/mounting/`,formData);
              res['thisisnew'] = true;
            }
            if(Array.isArray(this.phone_s)){
               for(let i of this.phone_s){
               try {
                 if(i.id==undefined){
                 await this.$axios.post(`/mounters/phones/`,{"phone_number":i.phone_number, "user":res.data.id})
               }else{
                 await this.$axios.patch(`/mounters/phones/${i.id}/`,{phone_number:i.phone_number,user:res.data.id})
               }
               }catch (e){
                 alert("Не верно введен номер телефона");
                 return;
               }
             }
             }

            this.$emit('update:newuserid',  null);
            this.save_btn_disabled = false;
            this.$emit('updarrayUser',res)
            this.close()
        },
        close(){
            this.$emit('update:rightDrawer', false);
        },
        changeImg(){
                    var reader = new FileReader();
                    reader.addEventListener("load", function () {
                      this.imagePreview = reader.result;
                      this.mantazhnik.whoiam.img = this.imagePreview;
                    }.bind(this), false);
                     reader.readAsDataURL( this.files );
        },
    async deletePortfolio(item){
          await this.$axios.delete(`/portfolio/user/${item.id}/`)
      const index = this.mantazhnik.portfolio.indexOf(item);
           if (index > -1) {
                this.mantazhnik.portfolio.splice(index, 1);
            }
    },
    addPhone(){
        if(this.mantazhnik.phone_s===undefined){this.mantazhnik.phone_s=[]}
        this.phone_s.push({phone_number:''})
    }
    },
    watch:{
        rightDrawer(nn){
          if(!nn){
            this.mantazhnik={};
          }
          this.$refs.price.focus();
          this.mantazhnik=JSON.parse(JSON.stringify(this.mantaz))
          if(this.mantazhnik.phone_s===undefined){
            this.mantazhnik.phone_s = [];

          }else{
            this.phone_s = this.mantazhnik.phone_s;
          }

          if(this.userid!=null){
            // this.mantazhnik.price = 0;
               this.mantazhnik.user = this.userid.id;
               this.mantazhnik.phone_s = [];
               this.mantazhnik.whoiam.img = this.userid.img?this.userid.img:'';
               this.mantazhnik['whoiam']['first_name'] =  this.userid.first_name;
               this.mantazhnik['whoiam']['last_name'] =  this.userid.last_name;
             }
        }
    }
}
</script>
