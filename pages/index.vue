<template>
  <v-layout
    justify-center
    align-center
  >
    <v-flex
      xs12
      md10
    >
      <!--<div class="text-center">-->
      <!--<logo />-->
      <!--<vuetify-logo />-->
      <!--</div>-->
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
            <template v-slot:item.approved="{item}">
              <span>{{item?"قبول":"رد"}}</span>
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
        headers: [
          {
            text: 'موضوع',
            align: 'center',
            sortable: false,
            value: 'title'
          },
          {text: 'نام دانشجو', value: 'student.name', align: 'center', sortable: false},
          {text: 'شماره دانشجویی', value: 'student.org_id', align: 'center', sortable: false},
          {text: 'استاد راهنما', value: 'guide_prof.name', align: 'center', sortable: false},
          {text: 'وضعیت', value: 'approved', align: 'center', sortable: false},
          {text: '', value: 'actions', align: 'center', sortable: false}
        ],
        type: 1,
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
