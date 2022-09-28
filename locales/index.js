import VueI18n from 'vue-i18n'
import Vue from 'vue'
Vue.use(VueI18n)
const data = {}
const readDir = ['en', 'zh', 'ko','vi','tr','id']
for (let i = 0; i < readDir.length; i++) {
  data[readDir[i]] = Object.assign({}, require(`./${readDir[i]}.json`))
}
let i18n = null
export const initVueI18n = (locale) => {
  if (i18n) {
    i18n.locale = locale
    return i18n
  }
  i18n = new VueI18n({
    locale: locale || 'en',
    fallbackLocale: locale || 'en', // 语言环境中不存在相应massage键时回退到指定语言
    messages: data
  })
  return i18n
}
