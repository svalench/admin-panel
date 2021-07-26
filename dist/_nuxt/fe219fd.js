(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{607:function(t,e,n){"use strict";n.r(e);var r=n(17),o=(n(61),n(32),n(74),n(4),n(52),n(256)),c=n(257),d=n(264),l={middleware:"auth",components:{textEditor:o.default,cardComponent:c.default,contentPreview:d.default},data:function(){return{cardBtns:[{text:"Изменить",action:"updateData",key:"text",color:"orange"}],data:[],activeKey:null,content:"",phones:[]}},computed:{watchId:function(){return this.phones.map((function(t){return t.id?t.id:void 0}))}},mounted:function(){this.getData(),this.getAllPhones()},methods:{addPhone:function(){this.phones.push({phone_number:""})},savePhone:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var data;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.$axios.post("/users/phones/",e.phones[t]);case 2:data=n.sent,e.phones[t]=data.data,e.phones.push({}),e.phones.splice(e.phones.length,1);case 6:case"end":return n.stop()}}),n)})))()},getAllPhones:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.get("/users/phones/?limit=9999");case 2:data=e.sent,t.phones=data.data.results;case 4:case"end":return e.stop()}}),e)})))()},deletePhone:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(confirm("Вы уверены что хотите удлаить номер?")){n.next=2;break}return n.abrupt("return");case 2:return n.next=4,e.$axios.delete("/users/phones/".concat(e.phones[t].id));case 4:n.sent,e.phones.splice(t,1);case 6:case"end":return n.stop()}}),n)})))()},getData:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return data={},e.prev=1,e.next=4,t.$axios.get("/admin/pages/pages/1");case 4:data=e.sent,e.next=17;break;case 7:return e.prev=7,e.t0=e.catch(1),e.t1=console,e.next=12,t.$axios.post("/admin/pages/pages/",{title:"First Start",h1:"First Start",h5:"First Start",bg_color:"#000000",title_block:"First Start",description:"First Start"});case 12:return e.t2=e.sent,e.t1.log.call(e.t1,e.t2),e.next=16,t.$axios.get("/admin/pages/pages/1");case 16:data=e.sent;case 17:console.log(data),t.data=[data.data];case 19:case"end":return e.stop()}}),e,null,[[1,7]])})))()},setData:function(data,t){this.content=data,this.activeKey=t},updateImg:function(form){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return form.append("title",t.data[0].title),form.append("h1",t.data[0].h1),form.append("h5",t.data[0].h5),form.append("title_block",t.data[0].title_block),form.append("description",t.data[0].description),e.next=7,t.$axios.put("/admin/pages/pages/1/",form);case 7:e.sent;case 8:case"end":return e.stop()}}),e)})))()},updateData:function(data){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(t.activeKey),t.data[0][t.activeKey]=data,e.prev=2,delete t.data[0].img,e.next=6,t.$axios.put("/admin/pages/pages/1/",t.data[0]);case 6:e.sent,e.next=12;break;case 9:e.prev=9,e.t0=e.catch(2),alert(e.t0);case 12:case"end":return e.stop()}}),e,null,[[2,9]])})))()}}},h=n(20),v=n(26),m=n.n(v),f=n(161),x=n(14),w=n(583),_=n(129),k=n(582),D=n(50),component=Object(h.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-row",[n("section",{staticClass:"container"},[n("client-only",[n("text-editor",{attrs:{content:t.content},on:{updateText:t.updateData,"update:content":function(e){t.content=e}}})],1)],1)]),t._v(" "),n("hr",{staticStyle:{"margin-top":"1%"},attrs:{height:"80"}}),t._v(" "),t._l(t.data,(function(i){return n("div",{key:i.id},[n("v-row",[n("v-col",[n("card-component",{attrs:{title:"Название",inObj:"title",text:i.title,btns:t.cardBtns},on:{updateData:t.setData,"update:text":function(e){return t.$set(i,"title",e)}}})],1),t._v(" "),n("v-col",[n("card-component",{attrs:{title:"H1 текст",inObj:"h1",text:i.h1,btns:t.cardBtns},on:{updateData:t.setData,"update:text":function(e){return t.$set(i,"h1",e)}}})],1)],1),t._v(" "),n("v-row",[n("v-col",[n("card-component",{attrs:{title:"H5 текст",inObj:"h5",text:i.h5,btns:t.cardBtns},on:{updateData:t.setData,"update:text":function(e){return t.$set(i,"h5",e)}}})],1)],1),t._v(" "),n("v-row",[n("v-col",[n("v-card-text",[n("v-btn",{on:{click:t.addPhone}},[n("v-icon",[t._v("mdi-plus")])],1),t._v(" "),t._l(t.phones,(function(e,r){return n("div",{key:r},[n("v-text-field",{attrs:{label:"телефон"},model:{value:e.phone_number,callback:function(n){t.$set(e,"phone_number",n)},expression:"phone.phone_number"}}),t._v(" "),n("v-btn",{directives:[{name:"show",rawName:"v-show",value:e.id,expression:"phone.id"}],on:{click:function(e){return t.deletePhone(r)}}},[n("v-icon",[t._v("mdi-delete")])],1),t._v(" "),n("v-btn",{directives:[{name:"show",rawName:"v-show",value:!t.phones[r].id,expression:"!phones[k].id"}],on:{click:function(e){return t.savePhone(r)}}},[n("v-icon",[t._v("mdi-content-save")])],1)],1)}))],2)],1)],1),t._v(" "),n("v-row",[n("contentPreview",{attrs:{action:"updateData",title:i.title_block,text:i.description,img:i.img},on:{updateImg:t.updateImg,updateData:t.setData,"update:title":function(e){return t.$set(i,"title_block",e)},"update:text":function(e){return t.$set(i,"description",e)}}})],1)],1)}))],2)}),[],!1,null,null,null);e.default=component.exports;m()(component,{TextEditor:n(256).default,CardComponent:n(257).default}),m()(component,{VBtn:f.a,VCardText:x.c,VCol:w.a,VIcon:_.a,VRow:k.a,VTextField:D.a})}}]);