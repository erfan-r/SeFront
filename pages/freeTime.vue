<template>
  <v-container>
    <v-layout wrap justify-center align-center mb-5 xs12>
      <v-flex ms12 align-self-center justify="center"
              class="font-weight-bold white--text text-center display-1 blue lighten-2 pa-5"
              style="border-radius: 10px">
        <span class="text-xs-center">تنظیم ساعات کاری</span>
      </v-flex>

      <v-flex md12 align-self-center justify="center" class="my-5">
        <v-card class="font-weight-bold  text-center  pa-5" style="border-radius: 10px">
          <v-form v-model="valid" ref="freeTimeForm" @submit.prevent="setTime">
            <v-layout v-for="(day , i) in weekDays" class="justify-space-around">
              <v-flex md2 class="mt-2">{{day}}:</v-flex>
              <v-flex md4 class="mx-2">
                <v-text-field outlined rounded :rules="[validationRules.required]" label="ساعت شروع" v-model="times[2*i]"></v-text-field>
              </v-flex>
              <v-flex md4 class="mx-2">
                <v-text-field outlined rounded label="ساعت پایان" v-model="times[2*i+1]"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout justify-space-around>
              <v-flex md4 xs12>
                <v-btn x-large rounded block color="primary" type="submit" :loading="loading">ثبت</v-btn>
              </v-flex>
            </v-layout>

          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout ma-5></v-layout>
    <v-layout justify-center align-center>
    </v-layout>
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
    name: 'freeTime',
    data () {
      return {
        valid: false,
        loading: false,
        weekDays: [
          'شنبه',
          'یک شنبه',
          'دو شنبه',
          'سه شنبه',
          'چهارشنبه',
          'پنج شنبه',
          'جمعه'
        ],
        times: [
          '09:00',
          '19:00',
          '09:00',
          '19:00',
          '09:00',
          '19:00',
          '09:00',
          '19:00',
          '09:00',
          '19:00',
          '09:00',
          '19:00',
          '09:00',
          '19:00'
        ],
        proposal: {
          title: '',
          keywords: '',
          guide_prof: '',
          summary: ''
        },
        profs: [
          'دکتر شاملی',
          'دکتر حقیقی',
          'دکتر نشاطی',
          'دکتر وحیدی',
          'دکتر شمس فرد',
          'دکتر علی اکبری'
        ],
        snack_text: '',
        color: '',
        snackbar: false,
        validationRules: {
          required: value => !!value || 'وارد کردن این فیلد اجباری است.',
          email: v => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(v) || 'آدرس ایمیل وارد شده صحیح نیست.'
        }
      }
    },
    methods: {
      setTime () {
        if (this.$refs.freeTimeForm.validate()) {
          this.loading = true
          this.$axios.$post(`/users/freetimes`, this.times)
            .then(response => {
              this.loading = false
              this.$router.push('/')
            })
            .catch(reason => {
              this.loading = false
              this.$router.push('/')
            })
        }
      },
      getTime () {
        this.$axios.$get(`/users/freetimes`)
          .then(response => {
            this.times = response.result
            this.loading = false
            console.log(response)
          })
          .catch(reason => {
            this.loading = false
          })
      }
    },
    created () {
      this.getTime()
      this.$axios.$get(`/users/profs`).then(response => {
        console.log(response)
        this.profs = response.result
      }).catch(err => {
        console.log(err)
        this.snack_text = err.response.data.status
        this.color = 'error'
        this.snackbar = true
      })
    }
  }
</script>

<style scoped>

</style>
