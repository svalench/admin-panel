<template>
<v-card>
          <v-card-text>
            <v-row>
              <v-col>
                  <v-img style="width: 150px;height: 150px;" :src="undef(item, 'img')"></v-img>
              </v-col>
              <v-col>
                <div>
                  № {{ undef(item, 'id') }} - {{ undef(item, 'username') }}
                </div>
                <div>
                  {{ undef(item, 'last_name') }} {{ undef(item, 'first_name') }}
                </div>
                <div>
                  {{ undef(item, 'type_of_user')===1?'физическое лицо':'юридическое лицо' }}
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
</template>

<script>
export default {
  name: "dataUserInfo",
  props:['item'],
  methods:{
    undef(obj, pr) {
      if(obj!==undefined){
        try{
          return obj[pr]
      }catch (e){
        return ''
      }
      }
    },
  }
}
</script>

<style scoped>

</style>
