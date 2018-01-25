<style scoped>
.datepicker-container {
  position: relative;
}
</style>

<template>
  <div class="datepicker-container">
    <input type="text"
           :class="classDesign"
           :value="date_formatted"
           @click="showDatepicker"
           readonly>

    <input type="hidden"
           :id="id"
           :name="name"
           :value="date_raw">

    <datepicker-agenda :disable-passed-days="disablePassedDays" 
                       :disable-future="disableFuture"
                       :doubled="doubled"
                       :disabled-days="disabledDays"
                       :lang="lang"
                       :orientation="orientation"
                       :show="isVisible"
                       @change="selectDate"
                       @hide="hideDatePicker"
                       @cancel="cancelDateSelection">
    </datepicker-agenda>
  </div>
</template>

<script>
import DatepickerAgenda from './components/DatepickerAgenda.vue'
import Moment from 'moment'
import { extendMoment } from 'moment-range'

const moment = extendMoment(Moment)

export default {
  name: 'datepicker',
  components: {
    'datepicker-agenda': DatepickerAgenda
  },
  props: {
    dateInit: { type: Object, default: null },
    classDesign: { type: String, default: '' },
    disablePassedDays: { type: Boolean, default: false },
    disableFuture: { type: Object },
    disabledDays: { type: Array, default () { return [] } },
    doubled: { type: Boolean, default: false },
    format: { type: String, default: 'YYYY-MM-DD' },
    id: { type: String, default: 'vue-datepicker' },
    lang: { type: String, default: 'en' },
    name: { type: String, default: 'datepicker' },
    orientation: { type: String, default: 'portrait' }
  },
  data () {
    return {
      dateCurrent: '',
      isVisible: false
    }
  },
  computed: {
    date_formatted () {
      if (this.dateCurrent) return this.dateCurrent.format(this.format)
      return ''
    },
    date_raw () {
      if (this.dateCurrent) return this.dateCurrent.format('YYYY-MM-DD')
      return ''
    }
  },
  created () {
    this.dateCurrent = this.dateInit
  },
  mounted () {
    moment.locale(this.lang)
  },
  methods: {
    selectDate (newDate) {
      this.dateCurrent = newDate
      this.$emit('selectDate', newDate)
    },
    showDatepicker () {
      this.isVisible = true
      setTimeout(() => document.addEventListener('click', this.hideDatePicker), 0)
    },
    hideDatePicker () {
      this.isVisible = false
      document.removeEventListener('click', this.hideDatePicker)
    },
    cancelDateSelection () {
      this.hideDatePicker()
      if (!this.dateCurrent || this.dateCurrent === '') {
        this.$emit('selectDate', '')
      }
    }
  }
}
</script>