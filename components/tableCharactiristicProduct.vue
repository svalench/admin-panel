<template>
  <div>
  <v-row>
   <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
             @keydown.esc="dialog=false"
        v-model="dialog"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            v-bind="attrs"
            v-on="on"
          >Добавить</v-btn>
        </template>
       <template  v-slot:default="dialog">
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >Добавить характеристику</v-toolbar>
            <v-card-text>
              <div class="text-h2 pa-12">
                <v-text-field label="Название" v-model="characterstic.name"></v-text-field>
                <v-textarea label="Описание" v-model="characterstic.description"></v-textarea>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn v-show="!upd" color="green" @click="addNewItem">
                Добавить
              </v-btn>
              <v-btn v-show="upd" color="green" @click="updNewItem">
                Обновить
              </v-btn>
              <v-btn color="yellow" @click="dialog.value = false;">Отмена</v-btn>
            </v-card-actions>
          </v-card>
     </template>
   </v-dialog>
  </v-row>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left" v-for="(v,k) in heads">
            {{v}}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item,key) in items"
        >
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td>
            <v-btn color="blue" @click="openUpdate(item)"><v-icon>mdi-lead-pencil</v-icon></v-btn>
            <v-btn color="red" @click="deleteItem(key,item.id)"><v-icon>mdi-trash-can</v-icon></v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
    </div>
</template>

<script>
export default {
  name: "tableCharactiristicProduct",
  data(){
    return{
      dialog:null,
      items:[],
      upd:false,
      heads:["номер","название", "описание","действия"],
      characterstic:{name:"",description:""},
    }
  },
  mounted() {
    this.getCharacteristics();
  },
  methods:{
    async getCharacteristics(){
      let data = await this.$axios.$get(`/admin/catalog/product_filters/?limit=129484`);
      console.log(data)
      this.items = data.results;
    },
    async deleteItem(key,id){
      let data = await this.$axios.delete(`/admin/catalog/product_filters/${id}/`);
      this.items.splice(key, 1);
    },
    async addNewItem(eee){
      let data = await this.$axios.post(`/admin/catalog/product_filters/`, this.characterstic);
      this.characterstic={name:"",description:""};
      this.items.push(data.data);
      this.dialog = false;
    },
    openUpdate(item){
      this.characterstic = item;
      this.dialog = true;
      this.upd = true;
    },
    async updNewItem(){
      let data = await this.$axios.put(`/admin/catalog/product_filters/${this.characterstic.id}/`, this.characterstic);
      this.characterstic={name:"",description:""};
      this.dialog = false;
      this.upd = false;
    }
  }
}
</script>

<style scoped>

</style>
