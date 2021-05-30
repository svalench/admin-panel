<template>
  <div class="parent-quili-editor">
    <v-row>
      <quill-editor
        ref="editor"
        v-model="content_change"
        :options="editorOption"
        @change="onEditorChange"
      ></quill-editor>
    </v-row>
    <v-row style="margin: 1%;">
      <v-btn @click="updateText">Сохранить</v-btn>
      <v-btn @click="toFirst">К началу</v-btn>
      <v-btn @click="cancelUpdate">Отмена</v-btn>
    </v-row>
  </div>
</template>

<script>
var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],
  [{'container': ['image']}],
  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{'image':[]}],
  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['image'],
  ['clean']                                         // remove formatting button
];
export  default {
  props:['content'],
  data(){
    return{
      content_change:"",
      html :"",
      text:"",
      editorOption: {
              modules:{
                  toolbar: {
                   container:  toolbarOptions,
                  }
              },
              theme: 'snow'
        }
    }
  },
  watch:{
    content(nv){
      this.content_change = nv;
    }
  },
  methods:{
    /**
     * отменяет обновление текста
     */
    cancelUpdate(){
      this.content_change = "";
    },
    /**
     * брос на исходную информацию
     */
    toFirst(){
      this.content_change = this.content;
    },
    /**
     * озвращаем HTML представление
     */
    updateText(){
        this.$emit('updateText',this.html)
    },
    /**
     *
     * @param quill - объект редактора
     * @param html - данные в HTML представлении
     * @param text - данные как текст
     */
    onEditorChange({ quill, html, text }) {
      this.html = html;
      this.text = text;
    }
  }
}
</script>

<style>
.parent-quili-editor{
  min-height: 400px;
  margin-top: 1%;
}
.ql-editor{
    min-height:300px;
}
</style>
