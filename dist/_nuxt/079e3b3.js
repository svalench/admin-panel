(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{581:function(t,e,r){"use strict";r.r(e);var n=r(24),o=(r(63),r(45),r(105),r(25),{components:{sliderChange:r(255).default},data:function(){return{rightDrawer:!1,right:!0,sliders:[],page:1,count:0,options:{},offset:10,loading:!1,search:"",slider:{},footerProps:{"items-per-page-options":[10,25,50,100]}}},computed:{headers:function(){return[{text:"id",align:"start",sortable:!0,value:"id"},{text:"заголовок",value:"title"},{text:"описание",value:"description"},{text:"изображение",value:"img"},{text:"на главной",value:"show"},{text:"действия",value:"actions"},{text:"позиция",value:"position"}]}},mounted:function(){this.getSliders()},watch:{search:function(t){""==t?(null!=this.timer&&clearTimeout(this.timer),this.getSliders()):(null!=this.timer&&clearTimeout(this.timer),this.timer=setTimeout(this.searchSliders,700,t))},options:{handler:function(){this.getSliders()},deep:!0}},methods:{deleteItem:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(confirm("Вы уверены?")){r.next=2;break}return r.abrupt("return");case 2:return r.next=4,e.$axios.delete("/admin/pages/slider/".concat(t.id,"/"));case 4:(n=e.sliders.indexOf(t))>-1&&e.sliders.splice(n,1),e.count=e.count-1;case 7:case"end":return r.stop()}}),r)})))()},showItem:function(t){this.slider=t,this.rightDrawer=!this.rightDrawer},searchSliders:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var n,o,c,data;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return e.loading=!0,n=e.options,n.sortBy,n.sortDesc,o=n.page,c=n.itemsPerPage,e.offset=c*(o-1),r.next=5,e.$axios.get("/admin/pages/slider/?limit=".concat(c,"&offset=").concat(e.offset,"&search=").concat(t));case 5:data=r.sent,e.sliders=data.data.results,e.count=data.data.count,e.loading=!1;case 9:case"end":return r.stop()}}),r)})))()},getSliders:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r,n,o,data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading=!0,r=t.options,r.sortBy,r.sortDesc,n=r.page,o=r.itemsPerPage,t.offset=o*(n-1),e.next=5,t.$axios.get("/admin/pages/slider/?limit=".concat(o,"&offset=").concat(t.offset));case 5:data=e.sent,t.sliders=data.data.results,t.count=data.data.count,t.loading=!1;case 9:case"end":return e.stop()}}),e)})))()}}}),c=r(21),l=r(31),d=r.n(l),f=r(148),h=r(180),m=r(547),v=r(573),w=r(175),x=r(186),k=r(541),D=r(546),_=r(62),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.sliders,page:t.page,"server-items-length":t.count,options:t.options,loading:t.loading,"footer-props":t.footerProps},on:{"update:page":function(e){t.page=e},"update:options":function(e){t.options=e}},scopedSlots:t._u([{key:"top",fn:function(){return[r("v-row",[r("v-col",{attrs:{cols:"1"}},[r("v-btn",{staticClass:"primary",on:{click:function(e){return t.showItem({})}}},[r("v-icon",[t._v("mdi-plus-box")])],1)],1),t._v(" "),r("v-col",[r("v-text-field",{staticClass:"mx-4",attrs:{label:"Поиск"},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1)],1)]},proxy:!0},{key:"item.img",fn:function(t){var e=t.item;return[r("v-img",{attrs:{width:"80",src:e.img}})]}},{key:"item.show",fn:function(e){var n=e.item;return[r("v-chip",{attrs:{color:n.show?"green":"yellow",dark:""}},[t._v("\n    "+t._s(n.show?"Да":"нет")+"\n  ")])]}},{key:"item.actions",fn:function(e){var n=e.item;return[r("v-btn",{staticClass:"error",on:{click:function(e){return t.deleteItem(n)}}},[r("v-icon",{attrs:{light:""}},[t._v("\n          mdi-delete-forever\n        ")])],1),t._v(" "),r("v-btn",{staticClass:"accent",on:{click:function(e){return t.showItem(n)}}},[r("v-icon",{attrs:{light:""}},[t._v("\n          mdi-update\n        ")])],1)]}}])}),t._v(" "),r("v-navigation-drawer",{attrs:{right:t.right,temporary:"",fixed:"",width:"50%"},model:{value:t.rightDrawer,callback:function(e){t.rightDrawer=e},expression:"rightDrawer"}},[r("sliderChange",{attrs:{slider:t.slider,rightDrawer:t.rightDrawer}})],1)],1)}),[],!1,null,null,null);e.default=component.exports;d()(component,{VBtn:f.a,VChip:h.a,VCol:m.a,VDataTable:v.a,VIcon:w.a,VImg:x.a,VNavigationDrawer:k.a,VRow:D.a,VTextField:_.a})}}]);