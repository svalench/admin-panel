<template>
    <div class="">
    <form>
    <v-text-field
      v-model="logininfo.username"
      :counter="10"
      label="Name"
      required

    ></v-text-field>
    <v-text-field
      v-model="logininfo.password"
      label="password"
      required
    ></v-text-field>


    <v-btn
      class="mr-4"
      @click="submit"
    >
      Вход
    </v-btn>

  </form>
      <v-snackbar
      v-model="snackbar"
      :vertical="vertical"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          :color="color_snack"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    </div>
</template>
<script>
export default {
    layout:'login',
    data(){
        return{
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
            await this.$auth.loginWith('local', { data: this.logininfo }).then(response => {
                console.log(response);
                if(response.data.is_admin){
                    this.text = 'Успешный вход';
                    this.color_snack = 'green';
                    this.snackbar = true;

                    this.$router.push('/');
                }else{
                    this.text = 'вы не админ';
                    this.color_snack = 'yellow';
                    this.snackbar = true;
                     this.$auth.logout();
                }

            })
            .catch(error => {
                this.text = 'Неудача';
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
