<template>
  <v-container>

    <v-card class="my-3 pa-5">
      <v-layout row wrap class="justify-space-around">
        <v-flex md12 xs12 class="text-center" style="font-size: 20px">
          کلیات پروپوزال
          <v-divider class="my-2"></v-divider>
        </v-flex>
        <v-flex md3 xs5 class=" blue lighten-5 justify-center text-center pa-1 ml-1 mb-1" style="border-radius: 6px">
          <div class="justify-center font-weight-bold my-1 mb-2 blue--text text--darken-4">عنوان</div>
          <span>{{proposal.title}}</span>
        </v-flex>
        <v-flex md3 sm5 xs10 class=" blue lighten-5 justify-center text-center pa-1 ml-1 mb-1"
                style="border-radius: 6px">
          <div class="text-center font-weight-bold my-1 mb-2 blue--text text--darken-4">نام استاد راهنما</div>
          <span class="text-center">{{proposal.guide_prof}}</span>
        </v-flex>
        <v-flex md3 xs5 class=" blue lighten-5 justify-center text-center pa-1 ml-1 mb-1"
                style="border-radius: 6px">
          <div class="text-center font-weight-bold my-1 mb-2 blue--text text--darken-4">کلمات کلیدی</div>
          <span>{{proposal.keywords}} </span>
        </v-flex>
        <v-flex md11 xs12 class=" blue lighten-5 justify-center text-center pa-1 mt-2 mb-1"
                style="border-radius: 6px">
          <div class="justify-center font-weight-bold my-1 mb-2 blue--text text--darken-4">چکیده</div>
          <span>{{proposal.summary}}</span>
        </v-flex>
      </v-layout>

    </v-card>
    <v-card>
      <v-layout row wrap class="justify-center pa-1">
        <v-flex md11 xs12 class=" blue lighten-5 text-center pa-1 ma-2"
                style="border-radius: 6px">
          <div class="justify-center font-weight-bold my-1 mb-2 blue--text text--darken-4">وضعیت</div>
          <span>{{statusText[status-1]}}</span>
        </v-flex>

        <v-flex md11 v-if="status===1" class="blue lighten-5 text-center pa-1 ma-2"
                style="border-radius: 6px">
          <div class="justify-center font-weight-bold my-1 mb-2 blue--text text--darken-4">هنوز هیچ داوری تعیین نشده
          </div>
        </v-flex>
        <v-flex md11 v-if="status===2 || status===3" class="blue lighten-5 text-center pa-1 ma-2"
                style="border-radius: 6px">
          <div v-for="(item,i) in proposal.judges" class="justify-center my-1 mb-2 ">
            <div class=" font-weight-bold blue--text text--darken-4 ">
              {{item}}
            </div>
            <div v-if="proposal.revision_comments[i]"
                 :class="proposal.revision_comments[i]==='تایید'? ['green--text']:['red--text']">
              {{proposal.revision_comments[i]}}
            </div>
            <div v-else class="red--text text--lighten-2 mt-1">
              این استاد هنوز نظری ثبت نکرده است
            </div>
            <v-divider v-if="i===0" class="my-2"></v-divider>
          </div>

        </v-flex>
        <v-flex md11 v-if="status===3" class="blue lighten-5 text-center pa-1 ma-2"
                style="border-radius: 6px">
          پروپوزال شما مورد تایید قرار نگرفته است، تا تاریخ
          <span class="red--text text--lighten-2">
          {{getPersianDate(proposal.date_revision, 1)}}
          </span>
          مهلت دارید که فایل جدید را ارسال کنید
          <div class="align-center mx-10 my-1 mb-2 ">
            <v-form v-model="valid" ref="proposalForm" @submit.prevent="addProposal">
              <v-file-input
                :rules="[validationRules.required]"
                placeholder="فایل پروپوزال را انتخاب کنید"
                prepend-icon="mdi-file"
                label="پروپوزال اصلاح شده"
              ></v-file-input>
              <v-flex xs12>
                <v-btn block large color="primary" type="submit" :loading="proposal.loading">ثبت</v-btn>
              </v-flex>
            </v-form>
          </div>
        </v-flex>
        <v-flex md11 v-if="status===4" class="blue lighten-5 text-center pa-1 ma-2"
                style="border-radius: 6px">
          <div class="justify-center font-weight-bold my-1 mb-2">
            شما باید در تاریخ
            {{getPersianDate(proposal.date_defense, 2).date}}
            راس ساعت
            {{getPersianDate(proposal.date_defense, 2).time}}
            در محل دفاع حاضر شده، و از پروپوزال خود دفاع کنید
          </div>
          <span class="red--text font-weight-thin text--lighten-2">
            توصیه می شود حداقل سی دقیقه قبل از زمان مقرر شده در محل ارائه حاضر شوید و شرایط مورد نیاز را برای ارائه فراهم سازید
          </span>
        </v-flex>
        <v-flex md11 v-if="status===5" class="blue lighten-5 text-center pa-1 ma-2"
                style="border-radius: 6px">
          <div class="red--text text--lighten-2 justify-center font-weight-bold my-1 mb-2">
            پروپوزال شما در دفاع رد شده است
          </div>
          <span class="yellow--text font-weight-thin text--darken-3">
          پایان نامه شما از مدل پژوهش محور، به آموزش محور تغییر وضعیت یافت
          </span>
        </v-flex>
        <v-flex md11 v-if="status===6" class="blue lighten-5 text-center pa-1 ma-2"
                style="border-radius: 6px">
          <div class="green--text text--lighten-2 justify-center font-weight-bold my-1 mb-2">
            پروپوزال شما در دفاع پذیرفته شده است
          </div>
          <span class="yellow--text font-weight-thin text--darken-3">
            نتیجه ی نهایی پس از برگزاری شورای دانشکده به شما اعلام خواهد شد
          </span>
        </v-flex>
        <v-flex md11 v-if="status===7" class="blue lighten-5 text-center pa-1 ma-2"
                style="border-radius: 6px">
          <div class="green--text text--lighten-2 justify-center font-weight-bold my-1 mb-2">
            پروپوزال شما در جلسه شورا رد شده است
          </div>
          <span class="yellow--text font-weight-thin text--darken-3">
          پایان نامه شما از مدل پژوهش محور، به آموزش محور تغییر وضعیت یافت
          </span>
          <v-divider v-if="proposal.final_comments[0]"></v-divider>
          <div v-if="proposal.final_comments[0]" class="green--text text--lighten-2 justify-center font-weight-bold my-1 mb-2">
            توضیح شورا
          </div>
          <span v-if="proposal.final_comments[0]" class="font-weight-thin text--darken-3">
          {{proposal.final_comments[0]}}
          </span>
        </v-flex>
        <v-flex md11 v-if="status===8" class="blue lighten-5 text-center pa-1 ma-2"
                style="border-radius: 6px">
          <div class="green--text text--lighten-2 justify-center font-weight-bold my-1 mb-2">
            پروپوزال شما در جلسه شورا پذیرفته شده است
          </div>
          <span class="yellow--text font-weight-thin text--darken-3">
          موفق باشید!
          </span>
        </v-flex>
        <v-flex md11 v-if="status===9" class="blue lighten-5 text-center pa-1 ma-2"
                style="border-radius: 6px">
          <div class="red--text text--lighten-2 justify-center font-weight-bold my-1 mb-2">
            پروپوزال شما در مرحله اول داوری رد شده است
          </div>
          <span class="yellow--text font-weight-thin text--darken-3">
          پایان نامه شما از مدل پژوهش محور، به آموزش محور تغییر وضعیت یافت
          </span>
        </v-flex>
      </v-layout>
    </v-card>
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
  import persianDate from 'persian-date'

  export default {
    name: 'index',
    data () {
      return {
        proposal: {
          title: 'عنوان',
          keywords: 'کلمه کلیدی',
          summary: 'چکیده',
          guide_prof: 'نام استاد'
        },
        actions: {
          judges: [
            'دکتر 1',
            'دکتر 2'
          ],
          revision_comments: [
            'نظر دکتر 1',
            'نظر دکتر 2'
          ]
        },
        statusText: [
          'ثبت شده، در انتظار تعیین داوران',
          'در انتظار تایید داوران',
          'نیازمند انجام اصلاحات',
          'تایید اولیه، در انتظار جلسه دفاع',
          'اعلام نتیجه ی دفاع',
          'اعلام نتیجه ی دفاع',
          'اعلام نتیجه ی نهایی و رای شورای دانشکده',
          'اعلام نتیجه ی نهایی و رای شورای دانشکده'
        ],
        snack_text: '',
        color: '',
        valid: false,
        status: 2,
        snackbar: false,
        dialog: false,
        validationRules: {
          required: value => !!value || 'وارد کردن این فیلد اجباری است.',
          email: v => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(v) || 'آدرس ایمیل وارد شده صحیح نیست.'
        }
      }
    },
    methods: {
      getPersianDate (date, type) {
        if (type === 1)
          return new persianDate(date).format('YYYY/MM/DD')
        else return {
          date: new persianDate(date).format('YYYY/MM/DD'),
          time: new persianDate(date).format('HH:mm')
        }
      },
      addProposal () {
        if (this.$refs.proposalForm.validate()) {
          this.loading = true
          this.$axios.$post(`/proposals/reset?proposal_id=${this.$route.params.id}`, this.proposal)
            .then(response => {
              window.location.reload(true)
            })
            .catch(reason => {

            })
          console.log(this.proposal)
        }
      },
      onCreate () {
        this.dialog = true
        this.$axios.$get(`/proposals?proposal_id=${this.$route.params.id}`).then(response => {
          console.log(response)
          // this.$store.commit('submission/setData', response.result)
          this.proposal = response.result
          let tmpKeyWords = ''
          for (let i = 0; i < this.proposal.keywords.length; i++) {
            tmpKeyWords += this.proposal.keywords[i] + ' '
          }
          this.proposal.keywords = tmpKeyWords
          this.status = this.proposal.status
          this.dialog = false
          // this.$router.push(`${this.$route.params.id}/view`)
        }).catch(err => {
          console.log(err)
          this.dialog = false
          this.snack_text = err.response.data.status
          this.color = 'error'
          this.snackbar = true
        })
      }
    },
    created () {
      this.onCreate()
    }
  }
</script>

<style scoped>

</style>
