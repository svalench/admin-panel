<template>
    <div>
          <v-card
    style="margin-top:3%;"
  >
            <v-row>
    <v-col cols="6">
        <v-row>
            <v-col cols="12">
<v-card-title ><v-text-field label="Название" hint="Введите название категории в это поле" v-model="item.name" :value="item.name?item.name:'dsf'"></v-text-field></v-card-title>
      <div v-if="item.name!=first_item.name"><v-icon @click="save('name')">mdi-content-save</v-icon></div>
            </v-col>
    <v-col cols="12">
        <v-card-title ><v-text-field label="Описание" v-model="item.description" :value="item.description"></v-text-field></v-card-title>
    </v-col>
      <div v-if="item.description!=first_item.description"><v-icon @click="save('description')">mdi-content-save</v-icon></div>
        </v-row>
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
          v-bind:items="second_arr"
          item-text="name"
          item-value="id"
          label="Категория"
          
          chips
            multiple
          :disabled="select_cat==undefined?true:false"
          outlined
        ></v-select>
    </v-card-title>
    </v-col>
    <v-col cols="6">
        <div v-if="item.filter_value" v-for="(filter,index) in item.filter_value" :key="index">
            <v-row>
                <v-col cols="10"> <v-text-field label="Значение" v-model="filter.value" :value="filter.value"></v-text-field> </v-col>
                <v-col cols="1"><v-icon @click="deleteFilterValue(filter,index)">mdi-delete</v-icon></v-col>
                <v-col  cols="1" v-if="filter.value!=first_item.filter_value[index]['value']"><v-icon @click="save_filter(filter, index)">mdi-content-save</v-icon></v-col>
            </v-row> 
        </div>
        <div v-if="item.id!=undefined"><v-btn @click="addRow"><v-icon>mdi-plus-box</v-icon></v-btn></div>
    </v-col>
            </v-row>
            <v-card-action v-if="item.id!=undefined">
                <v-btn @click="save"><v-icon>mdi-content-save</v-icon></v-btn>
            </v-card-action>
          </v-card>
              <v-snackbar
      v-model="snackbar"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          X
        </v-btn>
      </template>
    </v-snackbar>
    </div>
</template>

<script>
export default {
    data(){
        return{
            text:'Добавлено',
            loading:false,
            snackbar:false,
            first_item:{},
            select_cat:null,
            select_cat_second:[],
            second_arr:[],
        }
    },
    props:['item','rightDrawer', 'cats_first', 'cats'],
    watch:{
        select_cat(newval){
            console.log(this.cats);
            this.second_arr = this.cats.filter(x=>x.parent==newval);
        },
        rightDrawer(newval){

            if(newval){
                this.select_cat = null;
                this.select_cat_second = [];
                this.first_item = JSON.parse(JSON.stringify(this.item));
                console.log(this.first_item);
                 if(this.item.parent!=null){
                     try{
                         let catsarr = this.cats.filter(x=>x.id==this.item.parent[0]);
                    this.select_cat = this.cats_first.filter(x=>x.id==catsarr[0].parent)[0].id;
                    this.second_arr = this.cats.filter(x=>x.parent==catsarr[0].parent);
                    this.select_cat_second=Array.from(catsarr,x=>x.id);
                     }catch{

                     }
                   
                }
            }
            
        }
    },
    methods:{
        async deleteFilterValue(item,index){
            let data = await this.$axios.delete(`/admin/catalog/filter_card/${item['id']}/`);
            if (index > -1) {
                this.item.filter_value.splice(index, 1);
                this.first_item = JSON.parse(JSON.stringify(this.item));
            }
        },
        addRow(){
            this.item.filter_value.push({});
            this.first_item.filter_value.push({});
        },
        async save(key){
            if(this.item['id']!=undefined){
                this.first_item.description = this.item.description;
                this.first_item.name = this.item.name;
                let data = await this.$axios.put(`/admin/catalog/filter_card_group/${this.item['id']}/`,{description:this.item.description,name:this.item.name, 'parent':this.select_cat_second});
                for(let i in this.item.filter_value){
                    if( this.item.filter_value[i].value.length && this.item.filter_value[i].value!=this.first_item.filter_value[i].value){
                        this.save_filter(this.item.filter_value[i],i,false);
                    }
                }
            }else{
                let data = await this.$axios.post(`/admin/catalog/filter_card_group/`,{description:this.item.description,name:this.item.name, 'parent':this.select_cat_second});
                this.item = {id:data.data.id,name:data.data.name,description:data.data.description,filter_value:[]};
            }
            this.first_item = JSON.parse(JSON.stringify(this.item));
        },
        async save_filter(item, index,push=true){
            this.snack_answer(item, index,push);
            if(item['id']!=undefined){
                let data = await this.$axios.put(`/admin/catalog/filter_card/${item['id']}/`,{value:item.value,parent:this.item.id});
            }else{
                let data = await this.$axios.post(`/admin/catalog/filter_card/`,{value:item.value,parent:this.item.id});
                console.log(data);
                this.item.filter_value[index]['id'] = data.data.id;
            }
            this.item.filter_value[index]['value'] = item.value;
            
        },
        snack_answer(item, index,push){
            if(push){
                if(item.value!=this.first_item.filter_value[index]['value']){
                    if(item['id']!=undefined){
                        this.text = "Изменено"
                    }else{
                        this.text = "Добавлено"
                    }
                    this.first_item.filter_value[index]['value'] = item.value;
                    this.snackbar = true;
                }else{
                    this.snackbar = true;
                    this.text = "Внесите изменения"
                }
            }
        },
        close(){
            this.$emit('update:rightDrawer', false)
        }
    },
}
</script>