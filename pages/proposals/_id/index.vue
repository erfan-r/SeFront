<template>
  <v-container>
    <v-layout
      justify-center
      align-center
    >
      Under construction ...
<!--      <v-flex-->
<!--        xs12-->
<!--        md6-->
<!--      >-->
<!--        <v-card>-->
<!--          <v-card-text class="text-center">-->
<!--            <span class="text-center error&#45;&#45;text" style="font-size: 24pt;">توجه</span>-->
<!--            <p class="ma-8 text-justified" style="font-size: 12pt;">-->
<!--              برای شروع آزمون از دکمه زیر اسفاده کنید.<br><br>-->
<!--              در صورت refresh شدن صفحه تمامی پاسخ‌های شما از بین خواهد رفت.<br><br>-->
<!--              انجام آزمون فقط در زمان تایین شده امکان‌پذیر خواهد بود و در صورتی که آزمون شما بعد از زمان مشخص شده به-->
<!--              اتمام برسد، نتیجه آن ثبت نخواهد شد.-->
<!--            </p>-->
<!--            <v-btn class="success" @click="viewExam">شروع آزمون</v-btn>-->
<!--          </v-card-text>-->
<!--        </v-card>-->
<!--      </v-flex>-->
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
