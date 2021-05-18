<template>
<div>
    <v-row>
    <section class="container">
    <client-only>
      <quill-editor
        ref="editor"
        v-model="content"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
      />
    </client-only>
    </section>
    </v-row>
    <hr height="80" style="margin-top:1%;">
    <v-row v-for="i in data" :key="i.id">
        <section style="margin-top:1%;">
            <v-row>
                <v-col>{{i.title}}</v-col>
                <v-col>{{i.h1}}</v-col>
                <v-col>{{i.h5}}</v-col>
            </v-row>
            <hr height="50" style="margin-top:1%;">
            <v-row>
                <v-col>{{i.title_block}}</v-col>
                <v-col>{{i.description}}</v-col>
                <v-col><v-img :src="i.img"></v-img></v-col>
            </v-row>
        </section>
    </v-row>
    </div>
</template>

<script>
export default {
    data(){
        return{
            data:[{     "id":0,
                        "title": "dsfg sdf sd fsd",
                        "h1": "sd fsdf sdf asdf asdf sadf sadf sdf sd fsadf sadf sda f",
                        "h5": "asdf asdf sdf sadf asdf sad fsadf ",
                        "bg_color": " asdf sad fsdfsdf sad f",
                        "title_block": "as dfasdf sda fs",
                        "description": "as dfasdf sad fsadf sa fasd",
                        "img": "",
                        "active": true,
            }],
            content: '',
        editorOption: {
          // Some Quill options...
          theme: 'snow',
          modules: {
        //     toolbar: [
        //       ['bold', 'italic', 'underline', 'strike'],
        //       ['blockquote', 'code-block']
        //     ]
          }
        }
        }
    },
    methods: {
      onEditorBlur(editor) {
        console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      }
    }
}
</script>