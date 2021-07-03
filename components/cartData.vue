<template>
  <div>
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Данные по корзине с ID {{ item.id }}
      </v-card-title>
      <v-card-text>
        <data-user-info :item="item.user_data"></data-user-info>
      </v-card-text>
      <v-card-text v-for="(i,key) in item.cart_prodicts" :key="key">
          <cart-item :item="i"></cart-item>
      </v-card-text>

      <v-card-title>
        Сумма  &sum; = <v-chip label color="#e82d7d">{{item.sum_cart}}</v-chip>
      </v-card-title>

      <div>
      <v-card-title>
        Оплата --  <v-chip label>{{item.payment}}</v-chip>
      </v-card-title>
      </div>
      <div>
      <v-card-title>
        Доставка --  <v-chip label>{{item.delevery}}</v-chip>
      </v-card-title>
      </div>
      <div>
      <v-card-title>
        Описание
      </v-card-title>
      <v-card-subtitle>{{item.description}}</v-card-subtitle>
      </div>
      <v-card-subtitle>{{new Date(item.date_upd).toLocaleString('ru')}}</v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
import dataUserInfo from "~/components/dataUserInfo";
import cartItem from "~/components/cartItem";
export default {
  name: "cartData",
  components: {
    dataUserInfo,
    cartItem,
  },
  props: ['item'],
  methods: {

    baseUrl(){
      return this.$axios.defaults.baseURL.slice(0, -1)
    }
  }

}
</script>

<style scoped>

</style>
