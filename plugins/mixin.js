import Vue from 'vue'
import { mapMutations } from 'vuex'

Vue.mixin({
  methods: {
    async setField (id) {
      try {
        const field = await this.$axios.$get(`fields/${id}?nodesc`)
        this.$auth.$storage.setUniversal('field', field.data, true)
        window.location = '/dashboard'
      } catch (e) {
        this.snackbar('خطا در دریافت اطلاعات سالن', 'error')
        // console.log(e)
      }
    },
    getField () {
      return this.$auth.$storage.getUniversal('field', true)
    },
    number_format (number) {
      return this.toPersianNumber(number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))
    },
    slug (title) {
      return title.toString().replace(new RegExp(' ', 'g'), '-')
    },
    deslug (title) {
      return title.toString().replace(new RegExp('-', 'g'), ' ')
    },
    snackbar (text, color, timeout) {
      this.setSnack({text, color, timeout})
    },
    ...mapMutations({
      setSnack: 'snackbar/setSnack'
    }),
    toPersianNumber (number) {
      let result = String(number)
      result = result.replace(new RegExp('1', 'g'), '۱')
      result = result.replace(new RegExp('2', 'g'), '۲')
      result = result.replace(new RegExp('3', 'g'), '۳')
      result = result.replace(new RegExp('4', 'g'), '۴')
      result = result.replace(new RegExp('5', 'g'), '۵')
      result = result.replace(new RegExp('6', 'g'), '۶')
      result = result.replace(new RegExp('7', 'g'), '۷')
      result = result.replace(new RegExp('8', 'g'), '۸')
      result = result.replace(new RegExp('9', 'g'), '۹')
      result = result.replace(new RegExp('0', 'g'), '۰')
      return result
    },
    toEnglishNumber (number) {
      let result = String(number)
      result = result.replace(new RegExp('۱', 'g'), '1')
      result = result.replace(new RegExp('۲', 'g'), '2')
      result = result.replace(new RegExp('۳', 'g'), '3')
      result = result.replace(new RegExp('۴', 'g'), '4')
      result = result.replace(new RegExp('۵', 'g'), '5')
      result = result.replace(new RegExp('۶', 'g'), '6')
      result = result.replace(new RegExp('۷', 'g'), '7')
      result = result.replace(new RegExp('۸', 'g'), '8')
      result = result.replace(new RegExp('۹', 'g'), '9')
      result = result.replace(new RegExp('۰', 'g'), '0')
      return result
    }
  }
})
