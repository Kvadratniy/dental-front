<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="dateFormatted"
        style="padding-top:0px;margin-top:0px;width: 200px"
        label="Дата"
        persistent-hint
        v-bind="attrs"
        hide-details
        @blur="date = parseDate(dateFormatted)"
        v-on="on"
      >
      <template #prepend>
        <v-icon
          color="#DF9F46"
        >
          mdi-calendar
        </v-icon>
      </template>
      </v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      no-title
      @input="menu = false"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  model: {
    prop: "date",
    event: 'update:date'
  },
  props: {
    date: {
      type: String,
      default: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    }
  },

  data: vm => ({
    dateFormatted: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
    menu: false,
  }),

  computed: {
    computedDateFormatted () {
      return this.formatDate(this.date)
    },
  },

  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date)
    },
  },

  methods: {
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}-${day}-${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('-')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
  },
}
</script>