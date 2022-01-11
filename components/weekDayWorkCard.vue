<template>
   <v-col cols="6">
  <v-card elevation="2"
  outlined style="padding: 5%;">
 <v-row>
      <v-col>
        <v-select
          :items="days"
          item-text="name"
          item-value="value"
          v-model="item.week_day"
          label="День недели"
        ></v-select>
      </v-col>
 </v-row>
   <v-row>
     <v-col>
       <v-menu
        ref="menu"
        v-model="menu1"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="item.start_time"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="item.start_time"
            label="Начало дня"
            prepend-icon="mdi-clock-time-four-outline"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
       <v-time-picker v-model="item.start_time" format="24hr" @click:minute="$refs.menu.save(item.start_time)"></v-time-picker>
      </v-menu>
     </v-col>
     <v-col>
       <v-menu
        ref="menu2"
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="item.end_time"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="item.end_time"
            label="Окончание дня"
            prepend-icon="mdi-clock-time-four-outline"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
       <v-time-picker v-model="item.end_time" format="24hr"  @click:minute="$refs.menu2.save(item.end_time)"></v-time-picker>
      </v-menu>
     </v-col>
   </v-row>
     <v-row>
       <v-col>
         <v-text-field v-model="item.comment" label="Комментарий">

         </v-text-field>
       </v-col>
     </v-row>
    <v-row>
      <v-col>
        <v-btn @click="saveItem" :disabled="!item.end_time && !item.start_time && !item.week_day" color="green">Добавить</v-btn>
      </v-col>
      <v-col v-if="item.id">
        <v-btn @click="saveItem"  color="blue">Изменить</v-btn>
      </v-col>
      <v-col v-if="item.id">
        <v-btn @click="deleteItem" color="red">Удалить</v-btn>
      </v-col>
    </v-row>
    </v-card>
     </v-col>

</template>

<script>
export default {
  name: "weekDayWorkCard",
  props:["item"],
  data(){
    return{
      days:[
            {name:"Понедельник", value: 0},
            {name:"Вторник", value: 1},
            {name:"Среда", value: 2},
            {name:"Четверг", value: 3},
            {name:"Пятница", value: 4},
            {name:"Суббота", value: 5},
            {name:"Воскресенье", value: 6},
          ],
      menu1:false,
      menu2:false,
    }
  },
  methods:{
    deleteItem(){
      this.$emit('deleteItem', this.item);
    },
    saveItem(){
      this.$emit('saveItem', this.item);
    }
  }
}
</script>

<style scoped>

</style>
