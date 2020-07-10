<template>
  <v-app dark style="background-color: #EEE;">
    <!--<v-navigation-drawer-->
    <!--v-model="drawer"-->
    <!--:mini-variant="miniVariant"-->
    <!--:clipped="clipped"-->
    <!--fixed-->
    <!--app-->
    <!--&gt;-->
    <!--<v-list>-->
    <!--<v-list-item-->
    <!--v-for="(item, i) in items"-->
    <!--:key="i"-->
    <!--:to="item.to"-->
    <!--router-->
    <!--exact-->
    <!--&gt;-->
    <!--<v-list-item-action>-->
    <!--<v-icon>{{ item.icon }}</v-icon>-->
    <!--</v-list-item-action>-->
    <!--<v-list-item-content>-->
    <!--<v-list-item-title v-text="item.title" />-->
    <!--</v-list-item-content>-->
    <!--</v-list-item>-->
    <!--</v-list>-->
    <!--</v-navigation-drawer>-->
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >

      <v-spacer/>
      <v-toolbar-title v-text="title"/>
      <v-spacer/>
      <v-icon @click="logout">mdi-exit-to-app</v-icon>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt/>
      </v-container>
    </v-content>
    <v-footer
      :fixed="fixed"
      app
    >
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        clipped: false,
        drawer: false,
        fixed: false,
        items: [
          {
            icon: 'mdi-apps',
            title: 'Welcome',
            to: '/'
          },
          {
            icon: 'mdi-chart-bubble',
            title: 'Inspire',
            to: '/inspire'
          }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'پنل کاربری'
      }
    },
    mounted () {
      this.$vuetify.rtl = true
    },
    methods: {
      async logout () {
        await this.$auth.logout()
        await this.$router.push(`login`)
      }
    }
  }
</script>
