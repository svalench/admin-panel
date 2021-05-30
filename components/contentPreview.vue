<template>
    <div class="index-desc">
        <div class="indexDescBlock">
            <div class="index-desc-text">
              <div style="display: flex;">
                <span v-html="title"></span> <v-icon @click="chageBlock('title','title_block')" color="white">mdi-update</v-icon>
                </div>
              <div style="display: flex;">
                <span v-html="text">
                </span> <v-icon @click="chageBlock('text','description')" color="white">mdi-update</v-icon>
              </div>
            </div>
            <div class="index-desc-img">
                <img :src="previewImg" alt="">
               <v-file-input
            hide-input
            chips
            v-model="files"
            @change="previewLoad"
            truncate-length="15"
      ></v-file-input>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "contentPreview",
  props: {
    title: {type: String, default: ""},
    text: {type: String, default: ""},
    img: {type: String, default: "~/assets/img/noimg.jpg"},
    action:{type: String, default: ""},
    inObj:{type: String, default: ""},
  },
  data(){
    return{
      files:[],
      previewImg:this.img,
    }
  },
  computed: {
    indexDescBlock: function () {
      return {
        "padding": "80px 60px 65px",
        "border-radius": "10px",
        "background": "#333",
        "float": "left",
        "width": "100%",
      }
    }
  },
  methods:{
    chageBlock(key,parent_key){
    let args = [parent_key]
      this.$emit(`${this.action}`,this[`${key}`],...args);
    },
    previewLoad(){
      this.previewImg= URL.createObjectURL(this.files)
      let formData = new FormData();
      formData.append('img', this.files);
      this.$emit('updateImg',formData)
    }
  }
}
</script>

<style scoped>
.index-desc{
    float: left;
    width: 100%;
    margin: 110px 0 50px;
}
.indexDescBlock{
    padding: 80px 60px 65px;
    border-radius: 10px;
    background: #333;
    float: left;
    width: 100%;
}
.index-desc-text{
    float: left;
    width: 60%;
}
.index-desc-text h4{
    float: left;
    width: 100%;
    margin: 0px 0 15px;
    font-size: 26px;
    color: #fff;
}
.index-desc-text span{
    float: left;
    width: 100%;
    margin: 0px 0 15px;
    font-size: 15px;
    color: #fff;
    line-height: 1.4;
    max-width: 540px;
}
.index-desc-img{
    position: relative;
    float: left;
    width: 40%;
}
.index-desc-img img{
    position: absolute;
    top: -140px;
    width: 100%;
    height: 240px;
    object-fit: contain;
}
*{
    font-family: 'Montserrat','Source Sans Pro',-apple-system,BlinkMacSystemFont,'Segoe UI',
    Roboto,'Helvetica Neue',Arial,sans-serif;
}
.hooper{
    height: auto !important;
}
body .el-button{
    font-size: 13px;
}
.bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
