<template>
  <v-container>
    <v-layout justify-center align="center" mb-5 xs12>
      <v-flex align="center" justify="center" class="font-weight-bold text-center display-2"><span
        class="text-xs-center">ورود</span></v-flex>
    </v-layout>
    <v-layout ma-5></v-layout>
    <v-layout justify-center align-center>

      <v-flex md6 xs12 justify-center>
        <v-card>
          <v-card-text>
            <v-form v-model="login.valid" ref="loginForm" @submit.prevent="loginSubmit">
              <v-flex xs12>
                <v-text-field
                  v-model="login.org_id"
                  :rules="[validationRules.required]"
                  label="شماره دانشجویی / کد پرسنلی"
                  autocomplete="username"
                  name="email"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="login.password"
                  :append-icon="login.showPassword ? 'mdi-visibility-off' : 'mdi-visibility'"
                  :rules="[validationRules.required]"
                  :type="login.showPassword ? 'text' : 'password'"
                  label="کلمه عبور"
                  @click:append="login.showPassword = !login.showPassword"
                  autocompelete="current-password"
                  name="password"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-btn block color="primary" type="submit" :loading="login.loading">ورود</v-btn>
              </v-flex>
            </v-form>
            <!--<a href="https://asansport.com/login-register" class="">بازیابی کلمه عبور</a>-->
          </v-card-text>

        </v-card>

      </v-flex>
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
    layout: 'simple',
    data () {
      return {
        login: {
          valid: false,
          org_id: '',
          password: '',
          showPassword: false,
          loading: false
        },
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
      loginSubmit () {
        if (this.$refs.loginForm.validate()) {
          this.login.loading = true
          console.log(this.login)
          this.$auth.loginWith('local', {
            data: {
              org_id: this.login.org_id,
              password: this.login.password
            }
          })
            .then((res) => {
              this.color = 'success'
              this.snack_text = 'با موفقیت وارد شدید!'
              this.snackbar = true
              console.log(res)
              if (this.$auth.user.level === 1)
              this.$router.push('/')
              else this.$router.push('/setField')
            })
            .catch((reason) => {
              console.log(reason)
              this.login.loading = false
              this.snackbar = true
              this.color = 'error'
              this.snack_text = 'نام کاربری یا کلمه عبور صحیح نیست'
            })
        }
      }
    }
  }
</script>
