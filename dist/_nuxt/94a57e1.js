(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{625:function(e,t,n){"use strict";n.r(t);var r=n(17),c=(n(68),n(61),{name:"filters_new",data:function(){return{values_filters:[]}},methods:{getValuesFilters:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var data;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.get("/admin/catalog/new_chice/?limit=9999999999");case 2:data=t.sent,e.values_filters=data.data.results,console.log(e.values_filters);case 5:case"end":return t.stop()}}),t)})))()},saveFilter:function(e,t){var n=this;return Object(r.a)(regeneratorRuntime.mark((function r(){var c,o,data;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return c="POST",o="/admin/catalog/new_chice/",e.id&&(c="PATCH",o="/admin/catalog/new_chice/".concat(e.id,"/")),r.next=5,n.$axios({method:c,data:e,url:o});case 5:data=r.sent,n.values_filters[t]=data.data,n.values_filters.push({}),n.values_filters.splice(n.values_filters.length-1,1);case 9:case"end":return r.stop()}}),r)})))()},deleteItem:function(e,t){var n=this;return Object(r.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,n.$axios.delete("/admin/catalog/new_chice/".concat(e.id,"/"));case 2:n.values_filters.splice(t,1);case 3:case"end":return r.stop()}}),r)})))()}},mounted:function(){this.getValuesFilters()}}),o=n(20),l=n(25),v=n.n(l),d=n(161),f=n(252),m=n(13),_=n(592),w=n(131),h=n(591),x=n(52),component=Object(o.a)(c,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-card",[n("v-card-title",[e._v("\n    Коллекция значений фильтров\n  ")]),e._v(" "),n("v-card-text",[n("v-btn",{on:{click:function(t){return e.values_filters.push({})}}},[n("v-icon",[e._v("mdi-plus")])],1)],1),e._v(" "),e._l(e.values_filters,(function(i,t){return n("v-card-text",{key:t},[n("v-text-field",{model:{value:i.value,callback:function(t){e.$set(i,"value",t)},expression:"i.value"}}),e._v(" "),n("v-row",[n("v-col",[n("v-text-field",{attrs:{type:"number"},model:{value:i.position,callback:function(t){e.$set(i,"position",t)},expression:"i.position"}})],1),e._v(" "),n("v-col",[n("span",[e._v("Чем выше цифра тем выше в выводе фильтр")])])],1),e._v(" "),n("v-btn",{on:{click:function(n){return e.saveFilter(i,t)}}},[n("v-icon",[e._v("mdi-content-save")])],1),e._v(" "),n("v-btn",{directives:[{name:"show",rawName:"v-show",value:i.id,expression:"i.id"}],on:{click:function(n){return e.deleteItem(i,t)}}},[n("v-icon",[e._v("mdi-delete")])],1)],1)}))],2)}),[],!1,null,"17aa1974",null);t.default=component.exports;v()(component,{VBtn:d.a,VCard:f.a,VCardText:m.c,VCardTitle:m.d,VCol:_.a,VIcon:w.a,VRow:h.a,VTextField:x.a})}}]);