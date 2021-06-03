<template>
  <div>
<div v-if="list && list.length">
  <v-divider class="mx-4"></v-divider>
          <h5 align="center">Товары</h5>
          <v-divider class="mx-4"></v-divider>
  <v-row>
    <v-col>
      <div >
        <v-text-field label="название" v-model="list[column].name" :value="ifset(list[column],'name')"> </v-text-field>
        <v-text-field label="количество" v-model="list[column].count" :value="ifset(list[column],'count')"> </v-text-field>
        <v-text-field label="цена" v-model="list[column].price" :value="ifset(list[column],'price')"> </v-text-field>
        <v-text-field label="цена со скидкой" v-model="list[column].discont" :value="ifset(list[column],'discont')"> </v-text-field>
        <v-text-field label="ID  1С" v-model="list[column].s1_id" :value="ifset(list[column],'s1_id')"> </v-text-field>
        <v-text-field label="вес" v-model="list[column].weight" :value="ifset(list[column],'weight')"> </v-text-field>
        </div>
    </v-col>

    <v-col>
      <v-radio-group
      v-model="column"
      mandatory
    >
      <v-radio   v-for="(item, index) in list"
        :label="item.name"
        :value="index"
      ></v-radio>
    </v-radio-group>
      <v-card-actions>
      <v-btn @click="save" color="blue"><v-icon>mdi-content-save</v-icon></v-btn>
        <v-btn @click="addrow" color="green"><v-icon>mdi-plus</v-icon></v-btn>
       <v-btn color="orange"><v-icon>mdi-cancel</v-icon></v-btn>
       <v-btn @click="deleteRow" color="red"><v-icon>mdi-delete</v-icon></v-btn>
    </v-card-actions>
    </v-col>

  </v-row>

</div>
  <v-btn v-if="list && !list.length" @click="addNullRow" color="green"><v-icon>mdi-plus</v-icon></v-btn>
  </div>
</template>

<script>
export default {
  name: "chackboxCard",
  props: ['list', 'id'],
  data() {
    return {
      column: 0,
      add_to:null,
    }
  },
  methods: {
    ifset(i, name) {
      return i !== undefined ? i[name] : ''
    },
    addNullRow(){
      this.add_to = {
        availability: false,
        count: '',
        discont: '',
        filter_dict: '',
        filters: [],
        filters2: [],
        name: '',
        parent: this.id,
        price: '',
        s1_id: '',
        weight: ''
      };
      this.list.push(this.add_to);
        this.column = 0;
    },
    async addrow(){
      this.add_to = JSON.parse(JSON.stringify(this.list[this.column]));
      for(let i of Object.keys(this.add_to)){
        if(i=="parent"){
            continue;
        }else if(i=="filters"){
            continue;
        }else if(i=="availability"){
            continue;
        }else if(i=="filters2"){
            continue;
        }
        this.add_to[i] = '';
      }
      delete this.add_to.id;
      let switchTo = this.list.length;
        this.list.push(this.add_to);
        this.column = switchTo;
    },
    async save(){
      let data;
      if(this.list[this.column].id!==undefined){
        data = await this.$axios.put(`/admin/catalog/products_admin/${this.list[this.column].id}/`,this.list[this.column]);
      }else{
        data = await this.$axios.post(`/admin/catalog/products_admin/`,this.list[this.column]);
        this.list[this.column] = data.data;
      }
    },
    async deleteRow(){
      let data = await this.$axios.delete(`/admin/catalog/products_admin/${this.list[this.column].id}/`);
      console.log(this.list.splice(this.column,1));
       this.column = 0;
    }
  }
}
</script>

<style scoped>

</style>
