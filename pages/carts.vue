<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      :page.sync="page"
      :server-items-length="count"
      :options.sync="options"
      :loading="loading"
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
      <template v-slot:item.time="{item}">
        {{new Date(item.date_upd).toLocaleString('ru')}}
      </template>
      <template v-slot:item.actions="{item}">
      <v-row>
        <v-col>
          <v-btn @click="del(item)" class="error"><v-icon light>
              mdi-delete-forever
            </v-icon></v-btn>
        </v-col>
        <v-col>
          <v-btn @click="showMore(item)" class="primary"> <v-icon light>
              mdi-update
            </v-icon></v-btn>
        </v-col>
      </v-row>
      </template>
    </v-data-table>
     <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
      width="70%"
    >
  <cart-data :item="actualItem"></cart-data>
    </v-navigation-drawer>
  </div>
</template>

<script>
import cartData from "~/components/cartData";
export default {
  name: "carts",
  components:{
    cartData
  },
  data() {
    return {
      rightDrawer: false,
      right: true,
      items: [],
      actualItem:{},
      page: 1,
      count: 0,
      options: {},
      timer: null,
      offset: 10,
      loading: false,
      search: '',
      footerProps: {'items-per-page-options': [10, 25, 50, 100]},
    }
  },
  computed: {
    headers() {
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
        {text: 'описание', value: 'description'},
        {text: 'пользователь', value: 'user_data.first_name'},
        {text: 'Дотсавка', value: 'delevery'},
        {text: 'Оплата', value: 'payment'},
        {text: 'Статус', value: 'closed'},
        {text: 'время', value: 'time'},
        {text: 'действия', value: 'actions'},
      ]
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    showMore(item){
      this.actualItem = item;
      console.log(item)
      this.rightDrawer = true;
    },
    async getData() {
      this.loading = true;
      const {sortBy, sortDesc, page, itemsPerPage} = this.options;
      this.offset = itemsPerPage * (page - 1);
      let data = await this.$axios.get(`/admin/cart/carts/?limit=${itemsPerPage}&offset=${this.offset}`);
      this.items = data.data.results;
      this.count = data.data.count;
      this.loading = false;
    },
    async searchFactory(search){
            this.loading = true;
            const { sortBy, sortDesc, page, itemsPerPage } = this.options;
             this.offset = itemsPerPage*(page-1);
           let data = await this.$axios.get(`/admin/cart/carts/?limit=${itemsPerPage}&offset=${this.offset}&search=${search}`);
           this.items = data.data.results;
      this.count = data.data.count;
      this.loading = false;
        },
    async del(item){
      if(!confirm('Вы уверены?')){return}
            await this.$axios.delete(`/admin/cart/carts/${item.id}/`);
            const index = this.items.indexOf(item);
            if (index > -1) {
                this.items.splice(index, 1);
            }
            this.count = this.count - 1;
    }
  },
  watch:{
        search(newval){
          if(newval===''){
            if(this.timer!=null){clearTimeout(this.timer)}
            this.getData()
          }else{
            if(this.timer!=null){clearTimeout(this.timer)}
            this.timer = setTimeout( this.searchFactory,700,newval);
          }
        },
        options: {
        handler () {

          this.getData()
        },
        deep: true,
      },
    },
}
</script>

<style scoped>

</style>
