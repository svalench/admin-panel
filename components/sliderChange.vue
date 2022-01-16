<template>
    <div>
        <v-card :loading="loading" style="margin-top:3%;">
            <v-row>
                <v-col cols="6">
                  <v-row>
                    <v-img
                    :src="slider.img"
                    >
                            <v-file-input
                                hide-input
                                chips
                                v-model="files"
                                :value="slider.img"
                                truncate-length="15"
                            ></v-file-input>

                    </v-img>
                    <v-btn color="red" @click="deleteFile('img')">Удалить изображение</v-btn>
                  </v-row>
                  <v-row>
                    <video
                    :src="slider.video"
                    controls
                    width="300px"
                    >
                            <v-file-input
                              style="display: none;"
                                hide-input
                                ref="videotag"
                                chips
                                v-model="videos"
                                :value="slider.video"
                                truncate-length="15"
                            ></v-file-input>

                    </video>
                     <v-btn color="red" @click="deleteFile('video')">Удалить видео</v-btn>
                    <v-btn v-if="slider.video"  @click="$refs.videotag.$refs.input.click()" color="blue">Изменить видео</v-btn>
                    <v-btn v-if="!slider.video"  @click="$refs.videotag.$refs.input.click()" color="green">Добавить видео</v-btn>
                  </v-row>

                </v-col>
                <v-col>
                    <v-row>
                        <v-text-field v-model="slider.title" :value="slider.title" label="заголовок"></v-text-field>
                    </v-row>
                    <v-row>
                            <v-textarea
                                    outlined
                                    name="input-7-4"
                                    label="описание"
                                    v-model="slider.description"
                                    :value="slider.description"
                            ></v-textarea>
                    </v-row>
                  <v-row>
                        <v-text-field v-model="slider.link" :value="slider.link" label="ссылка"></v-text-field>
                    </v-row>
                  <v-row>
                        <v-color-picker v-model="slider.color" :value="slider.color" label="цвет"></v-color-picker>
                    </v-row>
                    <v-row>
                        <v-checkbox
                            v-model="slider.show"
                            :label="`Показывать на главной -  ${slider.show?'да':'нет'}`"
                            ></v-checkbox>
                    </v-row>
                    <v-row>
                        <v-col>
                    <v-text-field v-model="slider.position" :value="slider.position"  label="Позиция"></v-text-field>
                </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-divider class="mx-4"></v-divider>
    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
        @click="close"
      >
        отмена
      </v-btn>
       <v-btn
        color="teal darken-1"
        text
        @click="save()"
      >
        сохранить
      </v-btn>
    </v-card-actions>
        </v-card>
    </div>
</template>
<script>
export default {
    data(){
        return{
            files:[],
            videos:[],
            loading:false,
        }
    },
    props:['slider', 'rightDrawer'],
    methods:{
        async save(){
            if(this.slider.id==undefined){
                let formData = new FormData();
                 formData.append('img', this.files);
                 formData.append('video', this.videos);
                 formData.append('show', this.slider.show?true:false);
                 formData.append('title', this.slider.title);
                 formData.append('link', this.slider.link);
                 formData.append('color', this.slider.color);
                 formData.append('position', this.slider.position);
                 formData.append('description', this.slider.description);
              let data =  await this.$axios.post(`/admin/pages/slider/`,formData,{headers: {'Content-Type': 'multipart/form-data'}});
              this.slider = data.data;
              this.close();
            }else{
                delete this.slider.img;
                let formData = new FormData();
                if(this.files.name!=undefined){
                    formData.append('img', this.files);
                }
                if(this.videos.name!=undefined){
                    formData.append('video', this.videos);
                }
                 formData.append('title', this.slider.title);
                 formData.append('show', this.slider.show);
                 formData.append('link', this.slider.link);
                 formData.append('color', this.slider.color);
                 formData.append('position', this.slider.position);
                 formData.append('description', this.slider.description);
                let data = this.$axios.put(`/admin/pages/slider/${this.slider.id}/`,formData,{headers: {'Content-Type': 'multipart/form-data'}});
                this.slider = data;
                this.close();

            }
            this.$emit('update:rightDrawer', false)
        },
        close(){
            this.$emit('update:rightDrawer', false)
        },
      /**
       * очищает одно поле
       * @param name
       */
      deleteFile(name){
        let formData = {};
        formData[name] = null;
         let data =  this.$axios.patch(`/admin/pages/slider/${this.slider.id}/`,formData);
        this.slider = data;
        this.close();
      }

    },
}
</script>
