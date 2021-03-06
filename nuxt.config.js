import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - admin-panel',
    title: 'admin-panel',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'quill/dist/quill.core.css',
    // for snow theme
    'quill/dist/quill.snow.css',
    // for bubble theme
    'quill/dist/quill.bubble.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~plugins/nuxt-quill-plugin', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
     proxy: false,
   // baseURL: "http://178.172.173.172:8001",
    baseURL: "https://new.arhiterm.by/"
    //baseURL:"http://192.168.100.73:8000"
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          maxAge: 60*60*24*5,
          global: true,
           type: 'Token'
        },
        user: {
          property: '',
        },
        endpoints: {
          login: { url: '/signin/backend/signin/', method: 'post', propertyName: 'token' },
          logout: false,
          refresh: { url: '/refresh/token/user/', method: 'post' },
          user: { url: '/users/mydata/', method: 'get' }
        },
        refreshToken: {
        property: 'refresh_token',
        data: 'refresh_token',
        maxAge: 60 * 60 * 24 * 30
      },
        // tokenRequired: true,
        tokenType: '',
      },
    },
    redirect: {
      login: '/login',
      home: '/',
      callback: false,
      logout: '/login'
    },
    cookie:{
      option:{
        maxAge:60*60*8,
      }
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'ru'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
