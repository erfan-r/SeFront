<template>
  <v-layout
    justify-center
    align-center
  >
    <v-flex
      xs12
      md8
    >
      <!--<div class="text-center">-->
        <!--<logo />-->
        <!--<vuetify-logo />-->
      <!--</div>-->
      <v-card>
        <v-card-title class="font-weight-reqular">
         لیست امتحانات قابل شرکت
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="exams"
            sort-by="start"
            class="elevation-1"
            hide-default-footer
          >
            <template v-slot:item.actions="{ item }">
              <v-btn @click="editItem(item)"
                     color="primary">
                <v-icon>
                  mdi-pencil
                </v-icon>
              </v-btn>

            </template>
            <!--<template v-slot:item.start="{ item }">-->
              <!--<p class="text-right"> {{toPersianNumber(item.start)}} </p>-->
            <!--</template>-->
            <!--<template v-slot:item.end="{ item }">-->
              <!--<p class="text-right"> {{toPersianNumber(item.start)}} </p>-->
            <!--</template>-->
            <template v-slot:no-data>
              <span>امتحانی برای شما وجود ندارد</span>
            </template>
            <template v-slot:footer>
              <p class="text-center ma-8 font-weight-bold">با کلیک بر روی آیکن کنار هر امتحان وارد آن شوید</p>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import persianDate from 'persian-date'
export default {
  data () {
    return {
      headers: [
        {
          text: 'موضوع',
          align: 'start',
          sortable: false,
          value: 'title',
        },
        { text: 'زمان شروع', value: 'start', sortable: false },
        { text: 'زمان پایان', value: 'end', sortable: false },
        { text: '', value: 'actions', sortable: false },
      ],
      exams: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    }
  },
  components: {
    Logo,
    VuetifyLogo
  },
  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.$axios.$get('/exams').
      then(response => {
        // console.log(response)
        console.log(response)
        this.exams = response.result.map(item => {
          let ret = item
          ret.start = new persianDate(item.start).format("YYYY/MM/DD hh:mm")
          ret.end = new persianDate(item.end).format("YYYY/MM/DD hh:mm")
          return ret
        })
        console.log(this.exams)
        // this.snackbar('اطلاعات با موفقیت دریافت شدند', 'success')
      })
        .catch(reason => {
          console.log(reason)
          this.dialog2 = false
          // this.snackbar('خطا در دریافت اطلاعات', 'error')
        })

    },

    editItem (item) {
      this.$router.push(`exam/${item._id}`)
    }
  }

}
</script>
