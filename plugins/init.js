import Vue from 'vue'
import { initVueI18n } from '@/locales/index.js'
typeof VConsole !="undefined"  && new VConsole();
export default ({ app, store }) => {
  const { locale } = store.state
  Vue.prototype.$store = store
  // console.log(initVueI18n)
  app.i18n = initVueI18n(locale)
}
