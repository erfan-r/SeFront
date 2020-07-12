<template>
  <v-layout
    justify-center
    align-center
  >
    <v-flex
      xs12
      md10
    >
      <v-card>
        <v-card-title class="font-weight-reqular">
          <v-layout>
            <span>لیست پروپوزال ها</span>
            <v-spacer/>
            <v-btn outlined to="/add_proposal">ایجاد پروپوزال جدید</v-btn>
          </v-layout>
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="proposals"
            sort-by="start"
            class="elevation-1 pa-2"
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
              <span>هیچ پروپوزالی وجود ندارد</span>
            </template>
            <template v-slot:item.status="{item}">
              <span>{{statusText[item.status-1]}}</span>
            </template>
            <template v-slot:footer>
              <p class="text-center ma-8 font-weight-bold">با کلیک بر روی آیکن کنار هر پروپوزال وارد آن شوید</p>
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
        statusText: [
          'ثبت شده، در انتظار تعیین داوران',
          'در انتظار تایید داوران',
          'نیازمند انجام اصلاحات',
          'تایید اولیه، در انتظار جلسه دفاع',
          'اعلام نتیجه ی دفاع',
          'اعلام نتیجه ی دفاع',
          'اعلام نتیجه ی نهایی و رای شورای دانشکده',
          'اعلام نتیجه ی نهایی و رای شورای دانشکده',
          'رد شده در مرحله اول'
        ],
        headers: [
          {
            text: 'موضوع',
            align: 'center',
            sortable: false,
            value: 'title'
          },
          {text: 'نام دانشجو', value: 'student', align: 'center', sortable: false},
          {text: 'گروه آموزشی', value: 'group', align: 'center', sortable: false},
          {text: 'استاد راهنما', value: 'guide_prof', align: 'center', sortable: false},
          {text: 'وضعیت', value: 'status', align: 'center', sortable: false},
          {text: '', value: 'actions', align: 'center', sortable: false}
        ],
        type: this.getType().id,
        proposals: []
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
        this.$axios.$get(`/users/proposals?type=${this.type}`).then(response => {
          // console.log(response)
          console.log(response)
          // this.snackbar('اطلاعات با موفقیت دریافت شدند', 'success')
          this.proposals = response.result
        })
          .catch(reason => {
            console.log(reason)
            this.snackbar('خطا در دریافت اطلاعات', 'error')

          })
      },

      editItem (item) {
        this.$router.push(`proposals/${item._id}`)
      }
    }

  }
</script>
