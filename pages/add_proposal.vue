<template>
  <v-container>
    <v-layout justify-center align="center" mb-5 xs12>
      <v-flex align="center" justify="center" class="font-weight-bold text-center display-1"><span
        class="text-xs-center">ایجاد پروپوزال جدید</span></v-flex>
    </v-layout>
    <v-layout ma-5></v-layout>
    <v-layout justify-center align-center>

      <v-flex md6 xs12 justify-center>
        <v-card>
          <v-card-text>
            <v-form v-model="valid" ref="proposalForm" @submit.prevent="addProposal">
              <v-flex xs12>
                <v-text-field
                  v-model="proposal.title"
                  :rules="[validationRules.required]"
                  outlined
                  label="عنوان"
                  name="title"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="proposal.keywords"
                  :rules="[validationRules.required]"
                  outlined
                  label="کلمات کلیدی"
                  hint="کلمات را با خط تیره (-) از هم جدا کنید"
                  name="keywords"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select
                  v-model="proposal.guide_prof"
                  outlined
                  :rules="[validationRules.required]"
                  :items="profs"
                  item-text="name"
                  item-value="_id"
                  label="استاد راهنما"
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  outlined
                  v-model="proposal.summary"
                  :rules="[validationRules.required]"
                  label="چکیده"
                ></v-textarea>
              </v-flex>
              <v-flex xs12>
                <v-file-input
                  :rules="[validationRules.required]"
                  placeholder="فایل پروپوزال را انتخاب کنید"
                  prepend-icon="mdi-file"
                  label="پروپوزال"
                ></v-file-input>
              </v-flex>

              <v-flex xs12>
                <v-btn block color="primary" type="submit" :loading="loading">ثبت</v-btn>
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
    name: 'add_proposal',
    data () {
      return {
        valid: false,
        loading: false,
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
      addProposal () {
        if (this.$refs.proposalForm.validate()) {
          this.loading = true
          this.proposal.keywords = this.proposal.keywords.split(' ')
            this.$axios.$post(`/proposals`, this.proposal)
            .then(response => {
              this.loading = false
              this.$router.push('/')
            })
            .catch(reason => {
              this.loading = false
              this.$router.push('/')
            })
          console.log(this.proposal)
        }
      }
    },
    created () {
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
