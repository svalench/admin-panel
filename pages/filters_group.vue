<template>
  <div>
  <v-row>
  <v-col cols="1"><v-btn @click="show = !show"><v-icon>{{!show?'mdi-plus':'mdi-minus'}}</v-icon></v-btn></v-col>
  <v-col v-show="show">
    <v-col>
      <v-text-field  v-model="nameAdd" label="Ввделите название группы"></v-text-field>
    </v-col>
    <v-col>
      <v-select
        v-model="select_cat"
          :items="cats_first"
          item-text="name"
          item-value="id"
          label="категория"
          dense
        multiple
          outlined
        ></v-select>
    </v-col>
    <v-col>
      <v-select
        v-model="select_filters"
          :items="values_filters"
          item-text="value"
          item-value="id"
          label="фильтра"
          dense
        multiple
          outlined
        ></v-select>
    </v-col>
    <v-col @click="saveFilter"><v-btn><v-icon>mdi-content-save</v-icon></v-btn></v-col>
    </v-col>
    </v-row>
<v-row>
  <v-col cols="4" v-for="(i,k) in groups" :key="k">
    <v-card>
      <v-card-title>
        <v-text-field v-model="i.name" label="название"></v-text-field>
      </v-card-title>
      <v-card-text>
         <v-select
        v-model="i.parent"
          :items="cats_first"
          item-text="name"
          item-value="id"
          label="категория"
          dense
        multiple
          outlined
        ></v-select>
      </v-card-text>
      <v-card-text>
         <v-select
        v-model="i.values"
          :items="values_filters"
          item-text="value"
          item-value="id"
          label="фильтра"
          dense
        multiple
          outlined
        ></v-select>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="saveFilter(i,k)"><v-icon>mdi-content-save</v-icon></v-btn>
        <v-btn @click="deleteFilter(i,k)"><v-icon>mdi-delete</v-icon></v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</v-row>
    </div>
</template>

<script>
export default {
  name: "filters_group",
  data(){
    return{
      show:false,
      nameAdd:"",
      select_cat:[],
      cats_first:[],
      groups:[],
      values_filters:[],
      select_filters:[],
    }
  },
  methods:{
    async getGroups(){
      let data = await this.$axios.get(`/admin/catalog/new_filters/?limit=9999999999`);
      this.groups = data.data.results;
    },
    async getValuesFilters(){
      let data = await this.$axios.get(`/admin/catalog/new_chice/?limit=9999999999`);
      this.values_filters = data.data.results;
    },
    async getCat(){
      let data1 = await this.$axios.get(`/admin/catalog/category_first/?limit=99999999`);
      this.cats_first = data1.data.results;
    },
    async saveFilter(item,k){
      let method = "POST"
      let url = `/admin/catalog/new_filters/`
      if(item.id){
        method = "PATCH"
        url = `/admin/catalog/new_filters/${item.id}/`;
      }else{
        k = this.groups.length;
        item = {name:this.nameAdd,parent:this.select_cat,values:this.select_filters}
        this.show = false;
      }
      let data = await this.$axios({method:method,data:item,url:url});
      this.groups[k] = data.data;
      this.groups.push({})
      this.groups.splice(this.groups.length-1,1)
    },
    async deleteFilter(i,k){
       await this.$axios.delete(`/admin/catalog/new_filters/${i.id}/`)
      this.groups.splice(k,1)
    }
  },
  mounted() {
      this.getGroups();
      this.getCat()
      this.getValuesFilters()
  }
}
</script>

<style scoped>

</style>
