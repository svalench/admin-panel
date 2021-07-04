<template>
  <div>
  <v-row style="margin-bottom: 5%; margin-top: 2%;">

    <v-dialog
    v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="blue lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Добавить
        </v-btn>
      </template>
      <v-card>
        <v-card-title >Добавление тега</v-card-title>
        <v-card-text>
              <v-text-field  v-model="tag.name" label="Название"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="orange lighten-3" @click="otmena">Отмена</v-btn>
          <v-btn color="green lighten-3" @click="addTag">сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
    <v-row>
      <v-col cols="3" v-for="(t,k) in tags" :key="k">
<v-card

  elevation="9"
>
  <v-card-title>{{t.name}}</v-card-title>
  <v-card-text >{{t.count}} - количество пользователей у тега
  </v-card-text>
  <v-card-subtitle>{{new Date(t.date_add).toLocaleString('ru')}}</v-card-subtitle>
  <v-card-actions>
    <v-btn @click="deleteTag(t)" color="red lighten-3">del</v-btn>
    <v-btn color="blue lighten-3" @click="updTag(t)">upd</v-btn>
  </v-card-actions>
  </v-card>
        </v-col>
      </v-row>
    </div>
</template>

<script>
export default {
  name: "tags",
  data(){
    return{
      dialog:false,
      tag:{name:'',id:null},
      tags:[],
      lastVal:'',
    }
  },
  methods:{
    updTag(item){
      this.lastVal = item.name;
      this.tag = item;
      this.dialog = true;
    },
    otmena(){
      this.tag.name = this.lastVal;
       this.tag = {name:'',id:null};
      this.dialog = false;
    },
    async addTag(){
      if(this.tag.name.length<2){
        alert('Длинна должна быть больше 3 символов '+this.tag.name.length);
        return;
      }
      if(this.tag.id===null){
        let data = await this.$axios.post('/mounters/tags/',this.tag);
        this.tags.push(data.data)
      }else{
        let data = await this.$axios.patch(`/mounters/tags/${this.tag.id}/`,this.tag);
      }
      this.tag = {name:'',id:null};
      this.dialog = false;
    },
    async getAllTags(){
      let data = await this.$axios.get('/mounters/tags/?limit=9999999');
      console.log(data)
      this.tags = data.data.results;
    },
    async deleteTag(item){
      let data = await this.$axios.delete(`/mounters/tags/${item.id}/`);
      const index = this.tags.indexOf(item);
      if (index > -1) {
          this.tags.splice(index, 1);
      }
    }
  },
  mounted() {
    this.getAllTags();
  }
}
</script>

<style scoped>

</style>
