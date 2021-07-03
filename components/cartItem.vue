<template>
<v-card >
          <v-row>
            <v-col cols="2">
              <v-img  :src="baseUrl()+item.card_data.img"></v-img>
            </v-col>
            <v-col cols="4">
              <div>
                {{item.card_data.name}}
              </div>
            </v-col>
            <v-col>
              <div>
                <v-chip label color="#41b883">{{item.price}}</v-chip> - <v-chip label color="#e02e5a">% {{item.discont}}</v-chip> x {{item.count}} = {{item.sum_price}}
              </div>
            </v-col>
          </v-row>
        </v-card>
</template>

<script>
export default {
  name: "cartItem",
  props:['item'],
  methods:{
       baseUrl(){
      return this.$axios.defaults.baseURL.slice(0, -1)
    }
  }
}
</script>

<style scoped>
.dsd{
  color: #e82d7d;
}
</style>
