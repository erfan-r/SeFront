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
      <v-btn v-if="this.$auth.user.level === 1" outlined color="black"  class="mx-1">
      {{this.$auth.user.edu_type? 'پژوهش محور':'آموزش محور'}}
      </v-btn>
      <v-menu v-if="this.$auth.user.level !== 1" offset-y>
        <template v-slot:activator="{ on }">
          <v-btn outlined v-on="on" >
            <span>نوع فعالیت: &nbsp;</span>
            {{getType().name}}
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(type, i) in getTypes" :key="i" @click="setType(type)">
            <v-list-item-action>
              <v-icon color="green" v-show="type.id === getType().id">mdi-checkbox-marked-circle</v-icon>
            </v-list-item-action>
            <v-list-item-title v-text="type.name" class="text-xs-right"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
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
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'پنل کاربری'
      }
    },
    computed: {
      getTypes () {
        let types
        if (this.$auth.user.level === 2) {
          types = [
            {
              name: 'استاد راهنما',
              id: 2
            },
            {
              name: 'داور',
              id: 3
            }
          ]
        }
        if (this.$auth.user.level === 3) {
          types = [
            {
              name: 'استاد راهنما',
              id: 2
            },
            {
              name: 'داور',
              id: 3
            },
            {
              name: 'مدیر گروه',
              id: 4
            }
          ]
        }
        if (this.$auth.user.level === 4) {
          types = [
            {
              name: 'استاد راهنما',
              id: 2
            },
            {
              name: 'داور',
              id: 3
            },
            {
              name: 'مدیر گروه',
              id: 4
            },
            {
              name: 'شورای دانشکده',
              id: 5
            }
          ]
        }
        return types
      }
    },
    mounted () {
      console.log(this.getType())
    },
    methods: {
       logout () {
         console.log('LOGGING OOOOOOOUUUUUUUT')
         this.$auth.logout()
      }
    }
  }
</script>
