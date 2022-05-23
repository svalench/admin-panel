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
        <v-text-field label="количество" v-model="list[column].count" :default="null" :value="ifset(list[column],'count', null)"> </v-text-field>
        <v-text-field label="цена" v-model="list[column].price" :default='null' :value="ifset(list[column],'price', null)"> </v-text-field>
        <v-text-field label="цена со скидкой" :default="null" v-model="list[column].discont" :value="ifset(list[column],'discont', null)"> </v-text-field>
        <v-text-field label="ID  1С" v-model="list[column].s1_id" :value="ifset(list[column],'s1_id')"> </v-text-field>
        <v-text-field label="вес" v-model="list[column].weight" :value="ifset(list[column],'weight')"> </v-text-field>
        <v-checkbox v-model="list[column].is_hidden" :value="ifset(list[column],'is_hidden')" label="скрыть"></v-checkbox>
        <v-text-field label="описание" v-model="list[column].comment" :value="ifset(list[column],'comment')"> </v-text-field>
        <v-text-field label="позиция" v-model="list[column].position" :value="ifset(list[column],'position')"> </v-text-field>
        </div>
    </v-col>

    <v-col>
      <v-radio-group
      v-model="column"
      mandatory
    >
      <v-radio   v-for="(item, index) in list" :key="index"
        :label="item.name"
        :value="index"
      ></v-radio>
    </v-radio-group>
      <v-card-actions>
      <v-btn @click="save" color="blue"><v-icon>mdi-content-save</v-icon></v-btn>
        <v-btn @click="addrow" color="green"><v-icon>mdi-plus</v-icon></v-btn>
       <v-btn color="orange" @click="copy"><v-icon>mdi-content-copy</v-icon></v-btn>
       <v-btn @click="deleteRow" color="red"><v-icon>mdi-delete</v-icon></v-btn>
    </v-card-actions>
    </v-col>

  </v-row>

</div>
  <v-btn v-if="list && !list.length" @click="addNullRow" color="green"><v-icon>mdi-plus</v-icon></v-btn>


    <v-dialog
        v-if="list!==undefined"
        transition="dialog-bottom-transition"
        max-width="600"
      >
        <template  v-slot:activator="{ on, attrs }">
          <v-btn
            v-show="list.length"
            color="primary"
            v-bind="attrs"
            v-on="on"
            @click="delCheckedCharacterisitcs"
          >Характеристики</v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >Характеристики товара</v-toolbar>

            <v-card-text v-if="list[column]!==undefined && list[column].filter_dict.length">
              <div v-for="(v,k) in list[column].filter_dict">
                <v-row>
                <v-text-field :label="list[column].filter_dict[k].name" v-model="list[column].filter_dict[k].value" > </v-text-field>
                <v-btn  @click="delCharacterisitc(k)" color="red"><v-icon>mdi-minus</v-icon></v-btn>
                   <v-btn  @click="updCharacterisitc(k)" color="blue"><v-icon>mdi-update</v-icon></v-btn>
              </v-row>
              </div>
            </v-card-text>

            <v-card-actions>
                <v-combobox return-object
      class="my-2"
      :items="all_characteristic"
      item-text="name"
      menu-props="top"
      label="добавить"
      v-model="checkedCh"
      target="#dropdown-example-1"
    ></v-combobox>
              <v-text-field v-show="checkedCh" v-model="newVal"></v-text-field>
              <v-btn v-show="checkedCh" @click="addCharacteristic" color="green"><v-icon>mdi-plus</v-icon></v-btn>
              </v-card-actions>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="dialog.value=false;getAllCharacteristics();"
              >Закрыть</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>


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
      all_characteristic:[],
      all_characteristic_name:[],
      checkedCh:null,
      newVal:null,
    }
  },
   mounted(){
        this.getAllCharacteristics();
    },
  watch:{

  },
  methods: {
    ifset(i, name, default_value='') {
      return i !== undefined ? i[name] : default_value
    },
    /**
     * удаляет характеристику товара
     * @param k номер по порядку
     */
    delCharacterisitc(k){
      this.list[this.column].filter_dict.splice(k,1)
      this.updProductFields()
      this.delCheckedCharacterisitcs()
    },
    async updCharacterisitc(k){
      let data =  await  this.$axios.put(`/admin/catalog/product_filters_row/${this.list[this.column].filter_dict[k].id}/`,{name:this.list[this.column].filter_dict[k].name,parent:this.list[this.column].filter_dict[k].parent,value:this.list[this.column].filter_dict[k].value})
    },
    /**
     *  удаляет из списка выбора уже выбранные характеристики
     * @returns {Promise<void>}
     */
    async delCheckedCharacterisitcs(){
      await  this.getAllCharacteristics()
        for(let i in this.all_characteristic){
          if(this.list[this.column].filter_dict.map(x=>x.name).includes(this.all_characteristic[i].name)){
            this.all_characteristic.splice(i,1)
          }
        }
    },
    /**
     * получает все характеристики с сервера
     * @returns {Promise<void>}
     */
    async getAllCharacteristics(){
      let data = await this.$axios.$get(`/admin/catalog/product_filters/?limit=9898989889`)
      this.all_characteristic = data.results;
    },
    /**
     * добавляет хар-ки товару
     * @returns {Promise<void>}
     */
    async addCharacteristic(payload = undefined, upd = false){
      if(!upd){payload={name:this.checkedCh.name,parent:this.checkedCh.id,value:this.newVal}}
      let data =  await  this.$axios.post(`/admin/catalog/product_filters_row/`,payload)
      this.list[this.column].filter_dict.push(data.data)
      let res = await this.updProductFields();
      console.log(res, 'res')
      console.log(data, 'data')
      console.log(this.list[this.column], 'this.list[this.column]')
      if(res){
        this.checkedCh = null;
      this.newVal = null;
      this.delCheckedCharacterisitcs()
      }else{
        this.list[this.column].filter_dict.splice(this.list[this.column].filter_dict.findIndex(x=>x.id===data.data.id), 1)
      }
      return data;
    },
    /**
     * обновляет поля на сервере
     * @returns {Promise<void>}
     */
    async updProductFields(){
      if(this.list[this.column].id===undefined){
        alert("Прежде сохраните продукт");return false;
      }
      let dataP = await this.$axios.put(`/admin/catalog/products_admin/${this.list[this.column].id}/`,{filters:this.list[this.column].filter_dict.map(x=>x.id),parent:this.list[this.column].parent,name:this.list[this.column].name,s1_id:this.list[this.column].s1_id})
      return true;
    },
    /**
     *  обнуление полей добавленного товара
     */
    addNullRow(){
      this.add_to = {
        availability: false,
        count: null,
        discont: null,
        filter_dict: [],
        filters: [],
        filters2: [],
        name: '',
        parent: this.id,
        price: '',
        s1_id: '',
        weight: '',
        position: 999,
        is_hidden: false,
        comment: '',
      };
      this.list.push(this.add_to);
        this.column = 0;
    },
    /**
     *  добавляет новый товар для заполнения
     */
    async addrow(){
      this.add_to = JSON.parse(JSON.stringify(this.list[this.column]));
      console.log(this.add_to)
      for(let i of Object.keys(this.add_to)){
        if(i=="parent"){
            continue;
        }else if(i=="filters"){
          console.log(this.add_to[i])
             this.add_to[i] = [];
          continue;
        }else if(i=="availability"){
            continue;
        }else if(i=="filters2"){
            continue;
        }
        this.add_to[i] = '';
      }
      this.add_to['filter_dict'] = []
      delete this.add_to.id;
      let switchTo = this.list.length;
        this.list.push(this.add_to);
        this.column = switchTo;
    },
    async copy(){
      let data = await this.$axios.post(`/admin/catalog/products_admin/`,this.list[this.column]).catch(function (e){
          console.log(e.response.data);
          let msg = '';
          for(let i in e.response.data){
             msg += `не заполнено ${i}; `;
          }
          alert(msg);
        });
      data.data['filter_dict'] = []
      data.data['filters'] = []
      data.data['filters2'] = []
      let switchTo = this.list.length;
      let filter_dict = this.list[this.column]['filter_dict'];
      console.log(filter_dict)
      this.list.push(data.data);
      this.column = switchTo;
      for(let i of filter_dict){
        console.log(i)
        let data1 = {name:i.name,parent:i.parent, value:i.value};
        let res_add = await this.addCharacteristic(data1, true);
        this.list[this.column]['filters'].push(res_add.data.id)
      }
    },
    /**
     * сохраняет поля товара
     * @returns {Promise<void>}
     */
    async save(){
      let data;
      if(this.list[this.column].id!==undefined){
        data = await this.$axios.put(`/admin/catalog/products_admin/${this.list[this.column].id}/`,this.list[this.column]);
      }else{
        for(let i in this.list[this.column]){
          if(typeof(this.list[this.column][i])=="string" && !this.list[this.column][i].length)
          this.list[this.column][i] = null;
        }
        data = await this.$axios.post(`/admin/catalog/products_admin/`,this.list[this.column]).catch(function (e){
          console.log(e.response.data);
          let msg = '';
          for(let i in e.response.data){
             msg += `не заполнено ${i}; `;
          }
          alert(msg);
        });
        if(data){
          console.log(data)
         data.data['filter_dict'] = []
           this.list[this.column] = data.data;
        }

      }
    },
    /**
     * удаляет товар
     * @returns {Promise<void>}
     */
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
