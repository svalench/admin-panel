<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
      </div>
      <v-card>
        <v-card-title class="headline">
          Добро пожаловать {{$auth.user.username}} в Админ панель сайта Arhiterm.by
        </v-card-title>
        <v-card-text>
         Используйте навигационное меню для перехода по разделам
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
            to="/cards"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>


export default {
 middleware: 'auth',
  components: {

  }
}
</script>
