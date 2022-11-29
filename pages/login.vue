<template>
  <div>
  <div class="logo-pace">
    ARHITERM
    <div class="aboult">
      working since 2008
    </div>
  </div>
    <div class="form-input">
      <v-overlay :value="show" rounded="sm">
        <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
      </v-overlay>
    <form>
    <v-text-field
      v-model="logininfo.username"
      :counter="10"
      label="логин"
      required
      @keydown.enter="submit"
    ></v-text-field>
    <v-text-field
      v-model="logininfo.password"
      label="пароль"
      required
      type="password"
      @keydown.enter="submit"
    ></v-text-field>
    <v-btn class="mr-4" @click="submit"> Вход </v-btn>
      <div style="padding: 10%">
        <hr>
        <div class="all-rights">Copyright ©. All rights reserved</div>
      </div>
  </form>
      <v-snackbar v-model="snackbar"  :vertical="vertical">{{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn :color="color_snack" text v-bind="attrs" @click="snackbar = false">
          закрыть
        </v-btn>
      </template>
    </v-snackbar>
    </div>
    </div>
</template>
<script>
export default {
    layout:'login',
  head: {
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IM%20Fell%20DW%20Pica%20SC&display=swap",
      },
    ],
  },
    data(){
        return{
          show: false,
            logininfo:{
                username:'',
                password:'',
            },
          text: '',
          color_snack: 'green',
          snackbar: false,
          vertical: true,
        }
    },
    methods:{
        submit(){

            this.authenticate()
        },
        async authenticate(){
          this.show=true;
            await this.$auth.loginWith('local', { data: this.logininfo }).then(response => {
                console.log(response);
                if(response.data.is_admin){
                    this.text = 'Успешный вход';
                    this.color_snack = 'green';
                    this.snackbar = true;
                    this.show=false;
                    setTimeout((x)=>{this.$router.push('/')}, 1000)
                }else{
                    this.text = 'вы не админ';
                    this.color_snack = 'yellow';
                    this.snackbar = true;
                    this.show=false
                     this.$auth.logout();
                }

            })
            .catch(error => {
              this.show=false;
                this.text = 'Введены не верные данные';
                    this.color_snack = 'red';
                    this.snackbar = true;
                this.errors = [];
                let str = "";
                for(let i in error.response.data){
                    for (let s of error.response.data[i]){
                        str += `${s}`;
                        this.errors.push(`${i}: ${s}`);
                    }
                }
            });

      },
    }
}
</script>
<style scoped>
.form-input{
  padding: 10%;
}
.logo-pace{
  margin-top: 5%;
  text-align: center;
  font-size: 30px;
  font-family: 'IM Fell DW Pica SC';
}
.aboult{
  text-align: center;
  font-size: 12px;
  font-family: 'IM Fell DW Pica SC';
}
.all-rights{
  text-align: center;
  font-size: 14px;
  padding: 20px;
  font-family: 'IM Fell DW Pica SC';
}
</style>
