<template>
<div>
  <v-card>
    <v-card-title>{{title}}</v-card-title>
    <v-card-subtitle>{{subtitle}}</v-card-subtitle>
    <v-card-text>
        <div v-html="text">
        </div>
      </v-card-text>
    <v-card-actions>
      <v-btn :color="bt.color" @click="btnAction(bt.action,bt.key)" v-for="bt in btns" key="bt.text">{{bt.text}}</v-btn>
    </v-card-actions>
  </v-card>
</div>
</template>

<script>
export default {
  props: {
    'title': {type: String, default: ""},
    'subtitle': {type: String, default: ""},
    'text': {type: String, default: ""},
    'inObj': {type: String, default: ""},
    'btns': {
      type: Array, default: function () {
        return [{text: "Ок", action: "ParentAction", key:'text', color: "red"}]
      }
    },
  },
  methods:{
    /**
     * союытие кнопки по свойствк из props
     * @param action - название события
     * @param actionData - ключ props который
     */
    btnAction(action, actionData){
      let args = [this.inObj]
      this.$emit(`${action}`,this[`${actionData}`],...args);
    }
  }
}

</script>
