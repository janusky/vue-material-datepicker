/**
 * Fuente original https://www.npmjs.com/package/vue-material-datepicker
 *
 * Se realizan las modificaciones necesarias para utilizar en proyecto creado
 * por medio de [vuejs-templates](http://vuejs-templates.github.io/webpack/).
 * Dichas modificaciones son
 *  Compatible con [ESLint](https://eslint.org/) (ES6)
 *  Sin dependencia con jquery
 *  Estilos tipo [SCSS](http://sass-lang.com/guide) cambian a [CSS](https://www.w3schools.com/css/).
 *
 * First, I’ll create a plugin wrapper to allow for easy installation of the component
 * module.exports = {
 *   install: function (Vue, options) {
 *     Vue.component('date-picker', Datepicker);
 *   }
 * };
 */
import Datepicker from './Datepicker.vue'

export default {
  ...Datepicker,
  install: vue => vue.component(Datepicker.name, Datepicker)
}
