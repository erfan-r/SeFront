<template>
  <v-container>
    <v-layout
      justify-center
      align-center
    >
      <v-flex
        xs12
        md10
      >
        <v-card>
          <v-card-text class="text-center">
            <span class="text-center grey--text" style="font-size: 24pt;">{{exam.title}}</span>

            <p class="mt-4">{{exam.questions[currentIndex].title}}</p>
            <v-img v-if="exam.questions[currentIndex].isImage" :src="imageLink"></v-img>
            <v-radio-group v-model="answers[currentIndex]" row mt-2 justify-center align-center>
              <v-radio v-for="(item,i) in exam.questions[currentIndex].options" :key="i" :label="item.title"
                       :value="item.value" ma-2></v-radio>
            </v-radio-group>
            <v-flex mt-4>
              <v-btn class="primary" :disabled="currentIndex === exam.questions.length - 1" @click="nextQuestion">سوال
                بعدی
              </v-btn>
              <v-btn class="secondary" :disabled="currentIndex === 0" @click="previousQuestion">سوال قبلی</v-btn>
            </v-flex>


          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout
      justify-center
      align-center
      mt-8
    >
      <v-btn ma-8 v-if="currentIndex === exam.questions.length - 1" class="success"
             @click="submit">پایان و ثبت آزمون
      </v-btn>
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
    name: "start",
    data () {
      return {
        exam: {
          questions: [
            {
              title: '',
              options: []
            }
          ]
        },
        answers: [],
        currentIndex: 0,
        snack_text: '',
        color: '',
        snackbar: false,
        dialog: false
      }
    },
    computed: {
      submission () {
        return this.$store.state.submission.data
      },
      imageLink () {
        let imageName = this.exam.questions[this.currentIndex].image

        return `https://exam.hadaf.academy/images/${this.$route.params.id}/${imageName}`
      }
    },
    watch: {
      answers (val) {
        console.log(`val: ${val}`)
        if (val && val.length > 0 && val[0] !== 0) {
          console.log('setval')
          this.setAnswers()

        }
      }
    },
    mounted () {
      this.initialize()
    },
    methods: {
      initialize () {
        this.dialog = true
        this.$axios.$get(`/exams/${this.$route.params.id}`).then(response => {
          console.log(response)
          this.exam = response.result
          console.log(this.submission)
          if (this.submission.answers && this.submission.answers[0] !== 0) {
            this.answers = this.submission.answers.slice()
          } else {
            this.answers = new Array(this.exam.questions.length)
            this.answers.fill(0)
          }
          this.dialog = false
        }).catch(err => {
          console.log(err)
          this.dialog = false
          this.snack_text = err.response.data.status
          this.color = 'error'
          this.snackbar = true
        })
      },
      nextQuestion () {
        this.currentIndex++
      },
      previousQuestion () {
        this.currentIndex--
      },
      setAnswers () {
        this.$store.commit('submission/setAnswers', this.answers.slice())
      },
      submit () {
        this.dialog = true
        let data = {
          id: this.submission._id,
          answers: this.submission.answers
        }
        this.$axios.$post(`/exams/${this.$route.params.id}/end`, data).then(response => {
          this.$store.commit('submission/setData', response.result)
          this.$router.push(`end`)
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
