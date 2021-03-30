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
    </div>
</template>
<script>
export default {
    layout:'login',
    data(){
        return{
            logininfo:{
                username:'',
                password:''
            },
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
                    alert('Success login');
                    this.$router.push('/');
                }else{
                     this.$auth.logout();
                }
                
            })
            .catch(error => {
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