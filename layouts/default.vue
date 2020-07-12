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
      <span style="border: solid black 1px; border-radius: 5px" class="pa-1 mx-5" v-text="title"/>

      <span v-if="this.$auth.user.level === 1" style="border: solid black 1px" class="ma-1">
        {{this.$auth.user.edu_type? 'پژوهش محور':'آموزش محور'}}
      </span>
      <v-menu v-if="this.$auth.user.level !== 1" offset-y>
        <template v-slot:activator="{ on }">
          <v-btn outlined v-on="on">
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
      <v-btn outlined to="/freeTime" class="mx-5">
        <span>تغییر تایم های کاری &nbsp;</span>
      </v-btn>
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
  import * as firebase from 'firebase'
  import 'firebase/messaging'

  const config = {
    apiKey: 'AIzaSyCIydTBNl3xrZjElCsbJUNGpwqfke8xBa4',
    authDomain: 'se-uni.firebaseapp.com',
    databaseURL: 'https://se-uni.firebaseio.com',
    projectId: 'se-uni',
    storageBucket: 'se-uni.appspot.com',
    messagingSenderId: '761340183257',
    appId: '1:761340183257:web:2d8cb7d4670f4d4854f4c8'
  }
  export default {
    data () {
      return {
        clipped: false,
        drawer: false,
        fixed: false,
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: ' پنل کاربری ' + this.$auth.user.name
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
      Notification.requestPermission().then(async function (permission) {
        console.log(permission)
        if (permission == 'granted') {
          // window.location.reload()

        }
      })
      this.initFire()
      // this.initFire()
      console.log(this.getType())
    },
    created () {
      if (!this.getType()) {
        let t = {
          name: 'استاد راهنما',
          id: 2
        }
        this.setType(t)
      }
    },
    methods: {
      logout () {
        console.log('LOGGING OOOOOOOUUUUUUUT')
        this.$auth.logout()
      },
      async initFire () {
        firebase.initializeApp(config)
        console.log(firebase)
        const messaging = firebase.messaging()
        messaging.usePublicVapidKey('BBPRSENJbGnhHS_PJeMHuUa9buQkFXhDXGch4fH44sXGmKGpeOFrWXcfZt4xDWWdSZ2spQdijqMk33TGNfmvK8A')
        messaging.onMessage((payload) => {
          // console.log('Message received. ', payload.notification.notification);
          alert(payload.notification.message)
          // ...
        })

        // navigator.serviceWorker.register('/firebase-messaging-sw.js').then(reg => {
        //   messaging.useServiceWorker(reg)
        // }).catch(err => {
        //   console.log(err)
        // })
        let token = await messaging.getToken()
        console.log(token)


        //  let messaging = fire.setup()
        // console.log(messaging)
        //  messaging.getToken().then(token => {
        //    console.log(token)
        //  }).catch(err => {
        //    console.log(err)
        //  })
        // console.log(token)
        this.$axios.$post('users/token', {token: token}).then((response) => {
          console.log(response)
        }).catch((err) => {
          console.log(err)
        })
        // this.$fireMess.
        // navigator.serviceWorker.register('/firebase-messaging-sw.js').then(reg => {
        //   this.$fireMess.useServiceWorker(reg)
        // })
        // this.$fireMess.setBackgroundMessageHandler(item => {
        //   console.log(item)
        // })
      }
    }
  }
</script>
