(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{591:function(e,t,n){"use strict";n.r(t);var r=n(16),c=(n(72),n(57),{name:"filters_group",data:function(){return{show:!1,nameAdd:"",select_cat:[],cats_first:[],groups:[],values_filters:[],select_filters:[]}},methods:{getGroups:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var data;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.get("/admin/catalog/new_filters/?limit=9999999999");case 2:data=t.sent,e.groups=data.data.results;case 4:case"end":return t.stop()}}),t)})))()},getValuesFilters:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var data;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.get("/admin/catalog/new_chice/?limit=9999999999");case 2:data=t.sent,e.values_filters=data.data.results;case 4:case"end":return t.stop()}}),t)})))()},getCat:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.get("/admin/catalog/category_first/?limit=99999999");case 2:n=t.sent,e.cats_first=n.data.results;case 4:case"end":return t.stop()}}),t)})))()},saveFilter:function(e,t){var n=this;return Object(r.a)(regeneratorRuntime.mark((function r(){var c,l,data;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return c="POST",l="/admin/catalog/new_filters/",e.id?(c="PATCH",l="/admin/catalog/new_filters/".concat(e.id,"/")):(t=n.groups.length,e={name:n.nameAdd,parent:n.select_cat,values:n.select_filters},n.show=!1),r.next=5,n.$axios({method:c,data:e,url:l});case 5:data=r.sent,n.groups[t]=data.data,n.groups.push({}),n.groups.splice(n.groups.length-1,1);case 9:case"end":return r.stop()}}),r)})))()},deleteFilter:function(i,e){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,t.$axios.delete("/admin/catalog/new_filters/".concat(i.id,"/"));case 2:t.groups.splice(e,1);case 3:case"end":return n.stop()}}),n)})))()}},mounted:function(){this.getGroups(),this.getCat(),this.getValuesFilters()}}),l=n(20),o=n(24),v=n.n(o),d=n(160),m=n(245),f=n(13),_=n(564),w=n(128),x=n(563),h=n(45),k=n(48),component=Object(l.a)(c,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("v-row",[n("v-col",{attrs:{cols:"1"}},[n("v-btn",{on:{click:function(t){e.show=!e.show}}},[n("v-icon",[e._v(e._s(e.show?"mdi-minus":"mdi-plus"))])],1)],1),e._v(" "),n("v-col",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}]},[n("v-col",[n("v-text-field",{attrs:{label:"Ввделите название группы"},model:{value:e.nameAdd,callback:function(t){e.nameAdd=t},expression:"nameAdd"}})],1),e._v(" "),n("v-col",[n("v-select",{attrs:{items:e.cats_first,"item-text":"name","item-value":"id",label:"категория",dense:"",multiple:"",outlined:""},model:{value:e.select_cat,callback:function(t){e.select_cat=t},expression:"select_cat"}})],1),e._v(" "),n("v-col",[n("v-select",{attrs:{items:e.values_filters,"item-text":"value","item-value":"id",label:"фильтра",dense:"",multiple:"",outlined:""},model:{value:e.select_filters,callback:function(t){e.select_filters=t},expression:"select_filters"}})],1),e._v(" "),n("v-col",{on:{click:e.saveFilter}},[n("v-btn",[n("v-icon",[e._v("mdi-content-save")])],1)],1)],1)],1),e._v(" "),n("v-row",e._l(e.groups,(function(i,t){return n("v-col",{key:t,attrs:{cols:"4"}},[n("v-card",[n("v-card-title",[n("v-text-field",{attrs:{label:"название"},model:{value:i.name,callback:function(t){e.$set(i,"name",t)},expression:"i.name"}})],1),e._v(" "),n("v-card-text",[n("v-select",{attrs:{items:e.cats_first,"item-text":"name","item-value":"id",label:"категория",dense:"",multiple:"",outlined:""},model:{value:i.parent,callback:function(t){e.$set(i,"parent",t)},expression:"i.parent"}})],1),e._v(" "),n("v-card-text",[n("v-select",{attrs:{items:e.values_filters,"item-text":"value","item-value":"id",label:"фильтра",dense:"",multiple:"",outlined:""},model:{value:i.values,callback:function(t){e.$set(i,"values",t)},expression:"i.values"}})],1),e._v(" "),n("v-card-actions",[n("v-btn",{on:{click:function(n){return e.saveFilter(i,t)}}},[n("v-icon",[e._v("mdi-content-save")])],1),e._v(" "),n("v-btn",{on:{click:function(n){return e.deleteFilter(i,t)}}},[n("v-icon",[e._v("mdi-delete")])],1)],1)],1)],1)})),1)],1)}),[],!1,null,"68c9c5e6",null);t.default=component.exports;v()(component,{VBtn:d.a,VCard:m.a,VCardActions:f.a,VCardText:f.c,VCardTitle:f.d,VCol:_.a,VIcon:w.a,VRow:x.a,VSelect:h.a,VTextField:k.a})}}]);