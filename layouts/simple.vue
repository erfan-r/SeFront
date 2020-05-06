<template>
  <v-app style="background-color: #EEE;">
    <v-content>
      <v-container fill-height>
        <nuxt/>
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
  export default {
    mounted () {
      this.$vuetify.rtl = true
    }
  }
</script>
