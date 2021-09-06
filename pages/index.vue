<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
      </div>
      <v-row>
        <v-col :span="12">
          <v-card>
            <v-card-title class="headline">
                  технические показатели сайта
            </v-card-title>
            <v-card-text>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                  <tr>
                    <th class="text-left">
                      Показатель
                    </th>
                    <th class="text-left">
                      Значение
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td class="text-left">
                      CPU
                    </td>
                    <td>{{status.cpu_percent_2s}} %</td>
                  </tr>
                    <tr>
                      <td class="text-left">
                       Load average 5
                    </td>
                    <td>{{status.cpu_usage_5m_loadavarage}}</td>
                  </tr>
                    <tr>
                      <td class="text-left">
                       Load average 15
                    </td>
                    <td>{{status.cpu_usage_15m_loadavarage}}</td>
                  </tr>
                    <tr>
                      <td class="text-left">
                      Память
                    </td>
                    <td>{{status.memory}} %</td>
                  </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col :span="12">
          <v-card>
              <v-card-title class="headline">
                  Данные
              </v-card-title>
             <v-card-text>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                  <tr>
                    <th class="text-left">
                      Показатель
                    </th>
                    <th class="text-left">
                      Значение
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Общее количество карточек</td>
                      <td>{{status.card_products_counts}} ед.</td>
                    </tr>
                  <tr>
                      <td>Количество активных карточек</td>
                      <td>{{status.card_products_counts_active}} ед.</td>
                    </tr>
                  <tr>
                      <td>Количество единиц продукции</td>
                      <td>{{status.products_counts}} ед.</td>
                    </tr>
                  <tr>
                      <td>Количество зарегистрированных монтажников</td>
                      <td>{{status.mounters_count}} ед.</td>
                    </tr>
                  <tr>
                      <td>Статус обновления</td>
                      <td>{{status.status?'В очереди на обновление':'Готово, ожидает'}}</td>
                    </tr>
                  <tr>
                    <tr>
                      <td>Дата последнего обновления</td>
                      <td>{{status.last_update}}</td>
                    </tr>
                  <tr>
                      <td>Обновить кол-во и цены в ручную</td>
                      <td><v-btn type="primary" @click="UpdPrice()">Обновить</v-btn></td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
             </v-card-text>
          </v-card>
        </v-col>
      </v-row>

    </v-col>
  </v-row>
</template>

<script>


export default {
 middleware: 'auth',
  components: {

  },
  data(){
   return{
      status:{},
   }
  },
  methods:{
    async getStatus(){
      let data = await this.$axios.get(`/dashboard/info/`);
      this.status = data.data;
    },
    UpdPrice(){
      let data = this.$axios.get(`/update/price/`);
      console.log(data)
    }
  },
  mounted() {
      this.getStatus()
  }
}
</script>
