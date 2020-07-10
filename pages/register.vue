<template>
  <v-container>
    <v-layout justify-center align="center" mb-5 xs12>
      <v-flex align="center" justify="center" class="font-weight-bold text-center display-2"><span
        class="text-xs-center">ثبت نام</span></v-flex>
    </v-layout>
    <v-layout ma-5></v-layout>
    <v-layout justify-center align-center>

      <v-flex md6 xs12 justify-center>
        <v-card>
          <v-card-text>
            <v-form v-model="register.valid" ref="registerForm" @submit.prevent="registerUser">
              <v-flex xs12>
                <v-text-field
                  v-model="register.name"
                  :rules="[validationRules.required]"
                  label="نام و نام خانوادگی"
                  autocomplete="username"
                  name="name"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="register.mobile"
                  :rules="[validationRules.required]"
                  label="شماره تلفن"
                  autocomplete="username"
                  name="phone"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="register.student_id"
                  :rules="[validationRules.required]"
                  label="شماره دانشجویی"
                  autocomplete="username"
                  name="student_id"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="register.email"
                  :rules="[validationRules.email()]"
                  label="ایمیل"
                  autocomplete="username"
                  name="email"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="register.password"
                  :append-icon="register.showPassword ? 'mdi-visibility-off' : 'mdi-visibility'"
                  :rules="[validationRules.required]"
                  :type="register.showPassword ? 'text' : 'password'"
                  label="کلمه عبور"
                  @click:append="register.showPassword = !register.showPassword"
                  autocompelete="current-password"
                  name="password"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-btn block color="primary" type="submit" :loading="register.loading">ورود</v-btn>
              </v-flex>
            </v-form>
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
    auth: false,
    data () {
      return {
        register: {
          valid: false,
          name: '',
          email: '',
          student_id: '',
          mobile: '',
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
      registerUser () {
        if (this.$refs.registerForm.validate()) {
          this.register.loading = true
          console.log(this.register)
          this.$axios.post('/users/signup')
            .then(() => {
              this.$router.push('/login')
              this.color = 'success'
              this.snack_text = 'با موفقیت ثبت نام شدید!'
              this.snackbar = true

              // let redirect = this.$auth.$storage.getUniversal('redirect')
              // if (redirect) {
              //   this.$router.push(redirect)
              // } else {
              // }
            })
            .catch(() => {
              this.register.loading = false
              this.snackbar = true
              this.color = 'error'
              this.snack_text = 'نام کاربری یا کلمه عبور صحیح نیست'
            })
        }
      }
    }
  }
</script>
