<template>
    <div>
        <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          @click="title=item.title"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>

     <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-cart</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn @click="logout"><v-icon>mdi-logout</v-icon></v-btn>
    </v-app-bar>
     <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    </div>
</template>
<script>
export default {
  data () {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-book-open-page-variant',
          title: 'Контент на главной',
          to: '/contentIndex'
        },
        {
          icon: 'mdi-play-box-outline',
          title: 'Слайдер',
          to: '/slider'
        },
        {
          icon: 'mdi-account-box-multiple',
          title: 'Пользоатели',
          to: '/usersList'
        },
        {
          icon: 'mdi-cart',
          title: 'Корзины',
          to: '/carts'
        },
        {
          icon: 'mdi-format-list-bulleted',
          title: 'Категории',
          to: '/category'
        },
        {
          icon: 'mdi-filter',
          title: 'Фильтра',
          to: '/filters_new'
        },
        {
          icon: 'mdi-select-group',
          title: 'Группы фильтров',
          to: '/filters_group'
        },
        {
          icon: 'mdi-factory',
          title: 'Производители',
          to: '/factory'
        },
        {
          icon: 'mdi-cards',
          title: 'Карточки товара',
          to: '/cards'
        },
        {
          icon: 'mdi-star-check',
          title: 'Характеристики',
          to: '/characteristics'
        },
        {
          icon: 'mdi-account-cash',
          title: 'Список мантажников',
          to: '/mounters'
        },
        {
          icon: 'mdi-tag-multiple',
          title: 'Тэги мантажников',
          to: '/tags'
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'arhiterm.by'
    }
  },
  methods:{
      logout(){
            this.$auth.logout();
            this.$router.push('/login');
        },
  }
}
</script>
