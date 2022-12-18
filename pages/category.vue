<template>
    <div>
        <v-divider class="mx-4"></v-divider>
        <div v-if="loading">
             <v-skeleton-loader
          type=" list-item-three-line"
        ></v-skeleton-loader>

        </div>
        <div  v-else> <v-row>
                    <v-col cols="2"><v-btn class="accent" @click="addGlobalCat=!addGlobalCat;addCat={name:'',title:'',description:''}"><v-icon >mdi-playlist-plus</v-icon></v-btn></v-col>
                   <v-col v-if="addGlobalCat">
                       <v-row>
                            <v-col>
                               <v-text-field v-model="addCat.name" :value="addCat.name" label="название"></v-text-field>
                            </v-col>
                            <v-col>
                               <v-text-field v-model="addCat.title" :value="addCat.title" label="подпись"></v-text-field>
                            </v-col>
                         <v-col>
                           <v-text-field type="numeric" v-model="addCat.position" :value="addCat.position" label="Позиция"></v-text-field>
                         </v-col>
                            <v-col>
                                <div>
                                    <v-checkbox
                                    v-model="addCat.show_in_start"
                                    :label="`Показывать на главной -  ${addCat.show_in_start?'да':'нет'}`"
                                    ></v-checkbox>
                                </div>
                            </v-col>
                            <v-col>
                                <v-file-input
                                    hide-input
                                    chips
                                    v-model="files"
                                    truncate-length="15"
                                    ></v-file-input>
                            </v-col>
                            <v-col><v-row><v-col cols="2"><v-icon @click="addGlobalCatFunc()">mdi-check-bold</v-icon></v-col> <v-col><v-icon @click="addGlobalCat=false">mdi-minus</v-icon></v-col></v-row></v-col>
                       </v-row>
                     <v-row>
                       <quill-editor
                        ref="editor"
                        v-model="addCat.description"
                        :options="editorOption"
                      ></quill-editor>


                      </v-row>
                     <v-row style="margin-top: 150px;">
                        <hr>
                       <v-textarea label="SEO писание" v-model="addCat.description_seo"></v-textarea>
                        <v-card-title>
                          <v-text-field v-model="addCat.kirilica_name" label="url кирилица"></v-text-field>
                        </v-card-title>
                     </v-row>
                   </v-col>
                </v-row>
    <v-list style="margin-top: 70px;">
      <v-list-group
        v-for="item in categories"
        :key="item.id"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>

            <v-list-item-title v-text="item.name"></v-list-item-title>
            <v-row>
                  <v-col>
                      <div>
                <v-checkbox
                @change="changeShowInStart(item)"
                v-model="item.show_in_start"
                :label="`Показывать на главной -  ${item.show_in_start?'да':'нет'}`"
                ></v-checkbox>
            </div>
                  </v-col>
                  <v-col>
                      <v-img :src="item.img" max-height="100" max-width="100" >
                      </v-img>
                  </v-col>
              </v-row>
            <v-row>
              <div v-html="item.description">
              </div>
            </v-row>

          </v-list-item-content>
        </template>
        <v-list-item-action>
            <template>
                <div><v-row>
                    <v-col><v-btn @click="addSecondCat=!addSecondCat;addSecondCatObj={name:'',title:'',description:''};" class="accent"><v-icon >mdi-playlist-plus</v-icon></v-btn></v-col>
                    <v-col ><v-btn @click="updateFirstCat(item)" class="pink darken-3"><v-icon >mdi-open-in-app</v-icon></v-btn></v-col>
                  <v-col><v-btn @click="deleteFirstCat(item)" class="error"><v-icon >mdi-playlist-minus</v-icon></v-btn></v-col>
                </v-row></div>
            </template>
        </v-list-item-action>
        <v-list-item-action>
            <template>
                <div><v-row v-if="addSecondCat">
                            <v-col>
                               <v-text-field v-model="addSecondCatObj.name" :value="addSecondCatObj.name" label="название"></v-text-field>
                            </v-col>
                            <v-col>
                               <v-text-field v-model="addSecondCatObj.title" :value="addSecondCatObj.title" label="подпись"></v-text-field>
                            </v-col>
                            <v-col>
                                <v-textarea
                                    outlined
                                    name="input-7-4"
                                    label="описание"
                                    :value="addSecondCatObj.description"
                                    ></v-textarea>
                               <v-textarea label="SEO писание" v-model="addSecondCatObj.description_seo"></v-textarea>
                            </v-col>

                            <v-col><v-row><v-col cols="3"><v-icon @click="addSecondCatFunc(item)">mdi-check-bold</v-icon></v-col> <v-col><v-icon @click="addSecondCat=false">mdi-minus</v-icon></v-col></v-row></v-col>

                       </v-row></div>
                </template>
        </v-list-item-action>
        <div  v-if="item.child">
        <v-list-item
          v-for="child in item.child"
          :key="child.id"
        >
          <v-list-item-content>
            <v-list-item-title>
                <template><v-row>
                    <v-col><v-divider class="mx-4" vertical></v-divider>{{child.name}}</v-col>
                    <v-col> <v-divider class="mx-4" vertical></v-divider> {{child.title}}</v-col>
                    <v-col>  <v-divider class="mx-4" vertical></v-divider>{{child.description}}</v-col>
                     <v-col><v-btn @click="deleteSecondCat(item, child)" class="error"><v-icon >mdi-playlist-minus</v-icon></v-btn></v-col>
                     <v-col ><v-btn @click="updateSecondCat(item, child)" class="pink darken-3"><v-icon >mdi-open-in-app</v-icon></v-btn></v-col>
                </v-row>

                </template>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </div>
      </v-list-group>
    </v-list>
    </div>
    </div>
</template>
<script>
import textEditor from "~/components/global/textEditor";
import chackboxCard from "~/components/chackboxCard";
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
export default {
  middleware: 'auth',
  components:{
      textEditor,
  },
    data(){
        return{
            editorOption: {
                  modules:{
                      toolbar: {
                       container:  toolbarOptions,
                      }
                  },
                  theme: 'snow'
            },
            files:[],
            categories:[],
            loading:false,
            addGlobalCat:false,
            updGlobalCat:false,
            updSecondCat:false,
            addSecondCat:false,
            addCat:{name:'',title:'',description:'',show_in_start:false, position:0},
            addSecondCatObj:{name:'',title:'',description:''},
        }
    },
    mounted(){
        this.getCategories();
    },

    methods:{
      /**
       *  изменяет флаг видимости на стартовой
       * @param cat сущнсть категории
       * @returns {Promise<void>}
       */
        async changeShowInStart(cat){
            await this.$axios.put(`/admin/catalog/category_first/${cat.id}/`, {"show_in_start":cat.show_in_start,"name":cat.name});
        },
      /**
       *  видиость полей для обновления глобальной кагории
       * @param item сущнсть категории
       */
        updateFirstCat(item){
            this.addGlobalCat = !this.addGlobalCat;
            this.updGlobalCat = true;
            this.addCat = item;
        },
      /**
       * удобяел категорию
       * @param item сущнсть категории
       * @returns {Promise<void>}
       */
      async deleteFirstCat(item){
        if(!confirm("Вы уверены что хотите удалить категорию?")){return }
          await this.$axios.delete(`/admin/catalog/category_first/${item.id}/`);
          this.categories.splice(this.categories.findIndex(x=>x.id==item.id),1)
      },
      /**
       * поля для обновления вторичной категории
       * @param item сущнсть категории
       * @param child сущнсть категории вложенной
       */
         updateSecondCat(item, child){
             this.addSecondCat = !this.addSecondCat;
            this.updSecondCat = true;
            this.addSecondCatObj = child;
        },
        async addGlobalCatFunc(){
             let formData = new FormData();
           if(this.files.name!=undefined){
                    formData.append('img', this.files);
                    var reader = new FileReader();
                    reader.addEventListener("load", function () {
                      this.imagePreview = reader.result;
                       this.addCat.img = this.imagePreview;
                    }.bind(this), false);
                     reader.readAsDataURL( this.files );
                }
                formData.append('name', this.addCat.name);
                formData.append('title', this.addCat.title);
                formData.append('position', this.addCat.position);
                formData.append('description', this.addCat.description);
                formData.append('description_seo', this.addCat.description_seo);
                formData.append('kirilica_name', this.addCat.kirilica_name);
                formData.append('show_in_start', this.addCat.show_in_start==undefined?false:this.addCat.show_in_start);
            if(this.updGlobalCat){;
                await this.$axios.put(`/admin/catalog/category_first/${this.addCat.id}/`, formData,{headers: {'Content-Type': 'multipart/form-data'}});
                this.updGlobalCat = false;
                this.addCat={name:'',title:'',description:'', description_seo: ''};
                this.addGlobalCat = false;
            }else{
           let data = await this.$axios.post('/admin/catalog/category_first/', formData,{headers: {'Content-Type': 'multipart/form-data'}});
           this.categories.push(data.data);
           this.addCat={name:'',title:'',description:'', description_seo:'',show_in_start:false};
           this.addGlobalCat = false;
            }
        },
        async deleteSecondCat(item,child){
           if(!confirm("Вы уверены что хотите удалить категорию?")){return }
            await this.$axios.delete(`/admin/catalog/category_second/${child.id}/`);
            const index = this.categories.indexOf(item);
           const index_child =this.categories[index].child.indexOf(child);
           if (index_child > -1) {
                this.categories[index].child.splice(index_child, 1);
            }
        },
         async addSecondCatFunc(item){
             if(this.updSecondCat){
                  delete this.addSecondCatObj.img;
                 await this.$axios.put(`/admin/catalog/category_second/${this.addSecondCatObj.id}/`, this.addSecondCatObj);
                 this.addSecondCatObj={name:'',title:'',description:'', description_seo: ''};
                this.addSecondCat = false;
                 this.updSecondCat = false;
             }else{
             this.addSecondCatObj['parent'] = item.id;
             var arr = this.addSecondCatObj.name.split('|');
             for(var i=0;i<arr.length;i++){
                 this.addSecondCatObj.name = arr[i];
                 await this.$axios.post('/admin/catalog/category_second/', this.addSecondCatObj);
                  const index = this.categories.indexOf(item);
                this.categories[index].child.push(JSON.parse(JSON.stringify(this.addSecondCatObj)));
             }
           this.addSecondCatObj={name:'',title:'',description:'', description_seo: ''};
           this.addSecondCat = false;
             }
        },
        async getCategories(){
            this.loading = true;
          let data =  await this.$axios.get('/catalog/categories/?limit=99999999');
          console.log(data);
          this.categories = data.data.results;
          this.loading = false;
        }
    }
}
</script>
