<template>
<v-card>
  <v-card-title>
    Коллекция значений фильтров
  </v-card-title>
  <v-card-text>
    <v-btn @click="values_filters.push({})"><v-icon>mdi-plus</v-icon></v-btn>
  </v-card-text>
  <v-card-text v-for="(i,k) in values_filters" :key="k">
      <v-text-field v-model="i.value"></v-text-field>
    <v-btn @click="saveFilter(i,k)"><v-icon>mdi-content-save</v-icon></v-btn>
    <v-btn @click="deleteItem(i,k)" v-show="i.id"><v-icon>mdi-delete</v-icon></v-btn>
  </v-card-text>
</v-card>
</template>

<script>
export default {
  name: "filters_new",
  data(){
    return{
        values_filters:[],
    }
  },
  methods:{
    async getValuesFilters(){
      let data = await this.$axios.get(`/admin/catalog/new_chice/?limit=9999999999`);
      this.values_filters = data.data.results;
    },
    async saveFilter(item,k){
      let method = "POST"
      let url = `/admin/catalog/new_chice/`
      if(item.id){
        method = "PATCH"
        url = `/admin/catalog/new_chice/${item.id}/`
      }
      let data = await this.$axios({method:method,data:item,url:url});
      this.values_filters[k] = data.data;
      this.values_filters.push({})
      this.values_filters.splice(this.values_filters.length-1,1)
    },
    async deleteItem(item,k){
      await this.$axios.delete(`/admin/catalog/new_chice/${item.id}/`)
      this.values_filters.splice(k,1)
    }
  },
  mounted() {
      this.getValuesFilters()
  }
}
</script>

<style scoped>

</style>
