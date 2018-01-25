import Moment from 'moment'
import { extendMoment } from 'moment-range'
const moment = extendMoment(Moment)

export function getWeekDays (lang) {
  const days = []

  moment.locale(lang)

  for (var i = 0; i < 7; i++) {
    days.push(
      moment()
        .weekday(i)
        .format('dd')
    )
  }
  return days
}

export function Month (month, year) {
  this.start = moment([year, month])
  this.end = this.start.clone().endOf('month')
  this.month = month
  this.year = year
  this.id = 0

  this.getWeekStart = function () {
    return this.start.weekday()
  }

  this.getDays = function () {
    var range = moment.range(this.start, this.end)
    return Array.from(range.by('days'))
  }

  this.getFormatted = function () {
    return this.start.format('MMMM YYYY')
  }

  this.getWeeks = function () {
    return this.end.week() - this.start.week() + 1
  }

  this.getYears = function () {
    var start = moment([this.start.year() - 50, 0])
    var end = moment([this.start.year() + 50, 0])
    var range = moment.range(start, end)

    return Array.from(range.by('years'))
  }
}
