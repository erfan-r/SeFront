<template>
  <v-container>
    <v-layout
      justify-center
      align-center
    >
      <v-flex
        xs12
        md6
      >
        <v-card>
          <v-card-text class="text-center">
            <span class="text-center success--text" style="font-size: 24pt;">توجه</span>
            <p class="ma-8 text-justified" style="font-size: 12pt;">
              امتحان شما با موفقیت پایان یافت!
            </p>
            <v-btn class="primary" to="/">بازگشت به خانه</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog
      v-model="dialog"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          <span ma-1 class="text-center">لطفا منتظر بمانید</span>
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      :bottom="true"
      :color="color"
      :left="true">
      {{ snack_text }}
      <v-btn
        dark
        text
        @click="snackbar = false"
      >
        بستن
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
  export default {
    name: "index",
    data () {
      return {
        snack_text: '',
        color: '',
        snackbar: false,
        dialog: false
      }
    },
    methods: {
      viewExam () {
        this.dialog = true
        this.$axios.$post(`/exams/${this.$route.params.id}/start`).then(response => {
          console.log(response)
          this.$store.commit('submission/setData', response.result)
          this.dialog = false
          this.$router.push(`${this.$route.params.id}/view`)
        }).catch(err => {
          console.log(err)
          this.dialog = false
          this.snack_text = err.response.data.status
          this.color = 'error'
          this.snackbar = true
        })
      }
    }
  }
</script>

<style scoped>

</style>
