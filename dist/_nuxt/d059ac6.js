(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{630:function(e,t,r){"use strict";r.r(t);var n=r(17),o=(r(48),r(68),r(22),r(26),r(69),r(61),{middleware:"auth",components:{cartUserChange:r(268).default},asyncData:function(e){return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.params,e.$axios;case 1:case"end":return t.stop()}}),t)})))()},data:function(){return{rightDrawer:!1,right:!0,page:1,limit:10,offset:0,count:0,pageCount:1,loading:!1,search:"",calories:"",users:[],options:{},active_user:{}}},mounted:function(){this.getMoreUsers()},watch:{search:function(e){""===e?(null!=this.timer&&clearTimeout(this.timer),this.getMoreUsers()):(null!=this.timer&&clearTimeout(this.timer),this.timer=setTimeout(this.serchUser,700,e))},options:{handler:function(){this.getMoreUsers()},deep:!0}},computed:{headers:function(){var e=this;return[{text:"id",align:"start",sortable:!0,value:"id"},{text:"email",value:"email",filter:function(t){return!e.email.length||t<e.email}},{text:"username",value:"username"},{text:"админ",value:"is_superuser"},{text:"изображение",value:"img"},{text:"имя",value:"first_name"},{text:"фамилия",value:"last_name"},{text:"Дата регистрации",value:"date_joined"},{text:"Дата рождения",value:"birth_date"},{text:"телефон",value:"phone_number"},{text:"действия",value:"action"}]}},methods:{deleteUser:function(e){if(confirm("Вы уверены?")){this.$axios.delete("users/users/".concat(e.id,"/"));var t=this.users.indexOf(e);t>-1&&this.users.splice(t,1)}},updateUser:function(e){this.rightDrawer=!this.rightDrawer,this.active_user=e,console.log(e)},serchUser:function(e){var t=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var n,o,c,l;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n=t.options,n.sortBy,n.sortDesc,o=n.page,c=n.itemsPerPage,t.loading=!0,t.offset=c*(o-1),r.next=5,t.$axios.get("/users/users/?limit=".concat(c,"&offset=").concat(t.offset,"&search=").concat(e));case 5:l=r.sent,t.users=l.data.results,t.count=l.data.count,t.loading=!1;case 9:case"end":return r.stop()}}),r)})))()},getMoreUsers:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r,n,o,c;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.options,r.sortBy,r.sortDesc,n=r.page,o=r.itemsPerPage,e.loading=!0,e.offset=o*(n-1),t.next=5,e.$axios.get("/users/users/?limit=".concat(o,"&offset=").concat(e.offset));case 5:c=t.sent,e.users=c.data.results,e.count=c.data.count,e.loading=!1;case 9:case"end":return t.stop()}}),t)})))()},filterOnlyCapsText:function(e,t,r){return null!=e&&null!=t&&"string"==typeof e&&-1!==e.toString().toLocaleUpperCase().indexOf(t)}}}),c=r(20),l=r(25),d=r.n(l),f=r(161),h=r(592),m=r(601),v=r(131),_=r(199),w=r(586),x=r(591),D=r(52),component=Object(c.a)(o,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.users,page:e.page,"server-items-length":e.count,options:e.options,loading:e.loading},on:{"update:page":function(t){e.page=t},"update:options":function(t){e.options=t}},scopedSlots:e._u([{key:"top",fn:function(){return[r("v-row",[r("v-col",{attrs:{cols:"1"}},[r("v-btn",{staticClass:"primary",on:{click:function(t){return e.updateUser({})}}},[r("v-icon",[e._v("mdi-plus-box")])],1)],1),e._v(" "),r("v-col",[r("v-text-field",{staticClass:"mx-4",attrs:{label:"Поиск"},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1)],1)]},proxy:!0},{key:"item.is_superuser",fn:function(t){var n=t.item;return[n.is_superuser?r("v-icon",[e._v("mdi-check")]):e._e(),e._v(" "),n.is_superuser?e._e():r("v-icon",[e._v("mdi-minus")])]}},{key:"item.date_joined",fn:function(t){var r=t.item;return[e._v("\n        "+e._s(new Date(r.date_joined).toLocaleString())+"\n  ")]}},{key:"item.birth_date",fn:function(t){var r=t.item;return[e._v("\n        "+e._s(r.birth_date?new Date(r.birth_date).toLocaleString():"Не указано")+"\n  ")]}},{key:"item.img",fn:function(e){var t=e.item;return[r("v-img",{attrs:{width:"80",src:t.img}})]}},{key:"item.action",fn:function(t){var n=t.item;return[n.is_superuser?e._e():r("v-btn",{staticClass:"error",on:{click:function(t){return e.deleteUser(n)}}},[r("v-icon",{attrs:{light:""}},[e._v("\n            mdi-delete-forever\n          ")])],1),e._v(" "),r("v-btn",{staticClass:"accent",on:{click:function(t){return e.updateUser(n)}}},[r("v-icon",{attrs:{light:""}},[e._v("\n            mdi-update\n          ")])],1)]}}])}),e._v(" "),r("v-navigation-drawer",{attrs:{right:e.right,temporary:"",fixed:"",width:"40%"},model:{value:e.rightDrawer,callback:function(t){e.rightDrawer=t},expression:"rightDrawer"}},[r("cartUserChange",{attrs:{userList:e.users,rightDrawer:e.rightDrawer,user:e.active_user},on:{"update:userList":function(t){e.users=t},"update:user-list":function(t){e.users=t},"update:rightDrawer":function(t){e.rightDrawer=t},"update:right-drawer":function(t){e.rightDrawer=t},"update:user":function(t){e.active_user=t}}})],1)],1)}),[],!1,null,null,null);t.default=component.exports;d()(component,{VBtn:f.a,VCol:h.a,VDataTable:m.a,VIcon:v.a,VImg:_.a,VNavigationDrawer:w.a,VRow:x.a,VTextField:D.a})}}]);