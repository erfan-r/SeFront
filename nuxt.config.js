import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: 'proposal manager',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /* Dev Server Host and Port */
  server: {
    host: '0.0.0.0',
    port: 8000
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/iransans/iransans.css',
    '~/assets/base.scss'

  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/mixin.js',
    { src: '~/plugins/vuex-persist', ssr: false },
    { src: '~/plugins/fire', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modulesnpm
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'http://192.168.43.246:3000/api',
    browserBaseURL: 'http://192.168.43.246:3000/api'
    // browserBaseURL: 'https://sbu-se-project.herokuapp.com/api'
  },
  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/'
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: 'users/login', method: 'post', propertyName: 'user.access_token' },
          logout: { url: 'users/logout', method: 'get' },
          user: { url: '/users/profile', method: 'get', propertyName: 'result' }
        },
        tokenRequired: true,
        tokenType: ''
      }
    }
  },
  router: {
    middleware: ['auth']
  },

  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    optionsPath: './vuetify.options.js',
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
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
