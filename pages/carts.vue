<template>
<div>
   <v-data-table
      :headers="headers"
      :items="items"
      :page.sync="page"
      :server-items-length="count"
       :options.sync="options"
      :loading ="loading"
      :footer-props="footerProps"
      class="elevation-1"

    >
      <template v-slot:top>
        <v-row>
          <v-col>
        <v-text-field
          v-model="search"
          label="Поиск по базе"
          class="mx-4"
        ></v-text-field>
        </v-col>
        </v-row>
      </template>
    </v-data-table>
</div>
</template>

<script>
export default {
  name: "carts",
  data(){
        return{
            rightDrawer:false,
            right:true,
            items:[],
            page:1,
            count:0,
            options:{},
            timer:null,
            offset:10,
            loading:false,
            search:'',
            footerProps: {'items-per-page-options': [10, 25, 50, 100]},
        }
    },
    computed: {
      headers () {
        return [
          {
            text: 'id',
            align: 'start',
            sortable: true,
            value: 'id',
          },
          {
            text: 'название',
            value: 'name',
          },
          { text: 'описание', value: 'description' },
          { text: 'пользователь', value: 'user_data.first_name' },
          { text: 'Дотсавка', value: 'delevery' },
          { text: 'Оплата', value: 'payment' },
          { text: 'Статус', value: 'closed' },
          { text: 'действия', value: 'actions' },
        ]
      },
    },
  mounted() {
    this.getData();
  },
  methods:{
    async getData(){
      let data = await this.$axios.get('/admin/cart/carts/');
      this.items = data.data.results;
      this.count = data.data.count;
    }
  }
}
</script>

<style scoped>

</style>
