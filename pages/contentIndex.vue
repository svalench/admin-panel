<template>
<div>
    <v-row>
    <section class="container">
    <client-only>
      <text-editor @updateText="updateData" :content.sync="content" ></text-editor>
    </client-only>
    </section>
    </v-row>
    <hr height="80" style="margin-top:1%;">
  <div v-for="i in data" :key="i.id">
    <v-row >

    <v-col>
        <card-component @updateData="setData" :title="'Название'" :inObj="'title'" :text.sync="i.title" :btns="cardBtns"/>
    </v-col>
    <v-col>
      <card-component @updateData="setData" :title="'H1 текст'" :inObj="'h1'" :text.sync="i.h1"  :btns="cardBtns"/>
    </v-col>
    </v-row>
    <v-row>
    <v-col>
      <card-component @updateData="setData" :title="'H5 текст'" :inObj="'h5'" :text.sync="i.h5" :btns="cardBtns"/>
    </v-col>
      </v-row>
    <v-row>
      <v-col>
        <v-card-text >
        <v-btn @click="addPhone"><v-icon>mdi-plus</v-icon></v-btn>
        <div  v-for="(phone,k) in phones" :key="k" >
          <v-text-field label="телефон" v-model="phone.phone_number"></v-text-field>
          <v-btn v-show="phone.id" @click="deletePhone(k)"><v-icon>mdi-delete</v-icon></v-btn>
           <v-btn v-show="!phones[k].id" @click="savePhone(k)"><v-icon>mdi-content-save</v-icon></v-btn>
        </div>

      </v-card-text>
      </v-col>
    </v-row>
    <v-row>
      <contentPreview @updateImg="updateImg" @updateData="setData" :action="'updateData'" :title.sync="i.title_block" :text.sync="i.description" :img="i.img" />
    </v-row>
    </div>
    </div>
</template>

<script>

import textEditor from "~/components/global/textEditor";
import cardComponent from "~/components/cardComponent";
import contentPreview from "~/components/contentPreview";
export default {
  middleware: 'auth',
  components:{
    textEditor,
    cardComponent,
    contentPreview,
  },
    data(){
        return{
          cardBtns:[{text: 'Изменить', action: 'updateData',key:'text', color: 'orange'}],
          data:[],
          activeKey:null,
          content: '',
          phones:[],

        }
    },
  computed:{
    watchId(){
      return this.phones.map(x=>x.id?x.id:undefined)
    }
  },
  mounted() {
      this.getData();
      this.getAllPhones();
  },
  methods: {
        addPhone(){
        this.phones.push({phone_number:''})
    },
    async savePhone(k){
          let data = await this.$axios.post(`/users/phones/`,this.phones[k]);
          this.phones[k] = data.data;
          this.phones.push({});
          this.phones.splice(this.phones.length,1);
    },
    async getAllPhones(){
          let data = await this.$axios.get(`/users/phones/?limit=9999`);
          this.phones = data.data.results;
    },
    async deletePhone(k){
          if(!confirm('Вы уверены что хотите удлаить номер?')){return}
          let data = await this.$axios.delete(`/users/phones/${this.phones[k].id}`);
          this.phones.splice(k,1);
    },
    /**
     *  получение данных с сервера
     */
      async getData() {
        let data = {}
        try {
         data = await this.$axios.get('/admin/pages/pages/1');
      }catch(e){
          console.log(await this.$axios.post('/admin/pages/pages/',
            {"title": "First Start",
                  "h1": "First Start",
                  "h5": "First Start",
                  "bg_color": "#000000",
                  "title_block": "First Start",
                  "description": "First Start"
            }));
           data = await this.$axios.get('/admin/pages/pages/1');
        }
        console.log(data)
        this.data = [data.data];
      },
    setData(data,args){
      this.content=data;
      this.activeKey = args;
    },
    /**
     * бнолвение данных по изменению картинки
     */
    async updateImg(form){
        form.append('title',this.data[0].title)
        form.append('h1',this.data[0].h1)
        form.append('h5',this.data[0].h5)
        form.append('title_block',this.data[0].title_block)
        form.append('description',this.data[0].description)
      let res = await this.$axios.put('/admin/pages/pages/1/',form);
    },
    /**
     * бновление даныых на сервере
     * @param data даннве поля
     * @returns {Promise<void>}
     */
    async updateData(data){
      console.log(this.activeKey)
      this.data[0][this.activeKey] = data;
      try {
        delete(this.data[0].img)
        let res = await this.$axios.put('/admin/pages/pages/1/',this.data[0]);
      }catch (e){
        alert(e);
      }
    }
    }
}
</script>
