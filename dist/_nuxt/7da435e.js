(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{592:function(e,t,n){"use strict";n.r(t);var r=n(16),c=(n(72),n(57),{name:"filters_new",data:function(){return{values_filters:[]}},methods:{getValuesFilters:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var data;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.get("/admin/catalog/new_chice/?limit=9999999999");case 2:data=t.sent,e.values_filters=data.data.results;case 4:case"end":return t.stop()}}),t)})))()},saveFilter:function(e,t){var n=this;return Object(r.a)(regeneratorRuntime.mark((function r(){var c,l,data;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return c="POST",l="/admin/catalog/new_chice/",e.id&&(c="PATCH",l="/admin/catalog/new_chice/".concat(e.id,"/")),r.next=5,n.$axios({method:c,data:e,url:l});case 5:data=r.sent,n.values_filters[t]=data.data,n.values_filters.push({}),n.values_filters.splice(n.values_filters.length-1,1);case 9:case"end":return r.stop()}}),r)})))()},deleteItem:function(e,t){var n=this;return Object(r.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,n.$axios.delete("/admin/catalog/new_chice/".concat(e.id,"/"));case 2:n.values_filters.splice(t,1);case 3:case"end":return r.stop()}}),r)})))()}},mounted:function(){this.getValuesFilters()}}),l=n(20),o=n(24),v=n.n(o),d=n(160),f=n(245),m=n(13),_=n(128),h=n(48),component=Object(l.a)(c,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-card",[n("v-card-title",[e._v("\n    Коллекция значений фильтров\n  ")]),e._v(" "),n("v-card-text",[n("v-btn",{on:{click:function(t){return e.values_filters.push({})}}},[n("v-icon",[e._v("mdi-plus")])],1)],1),e._v(" "),e._l(e.values_filters,(function(i,t){return n("v-card-text",{key:t},[n("v-text-field",{model:{value:i.value,callback:function(t){e.$set(i,"value",t)},expression:"i.value"}}),e._v(" "),n("v-btn",{on:{click:function(n){return e.saveFilter(i,t)}}},[n("v-icon",[e._v("mdi-content-save")])],1),e._v(" "),n("v-btn",{directives:[{name:"show",rawName:"v-show",value:i.id,expression:"i.id"}],on:{click:function(n){return e.deleteItem(i,t)}}},[n("v-icon",[e._v("mdi-delete")])],1)],1)}))],2)}),[],!1,null,"6e0d53ec",null);t.default=component.exports;v()(component,{VBtn:d.a,VCard:f.a,VCardText:m.c,VCardTitle:m.d,VIcon:_.a,VTextField:h.a})}}]);