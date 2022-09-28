export default function ({ req, store, route, isHMR, redirect }) {
    // if (isHMR) return; 
    console.log("asdasdsadasd",  route, isHMR, redirect)
    if (process.client && route.path =='/') {
     const AcceptLanguage = req.headers['accept-language'];
      const supportedlanguages = store.getters.supportedlanguages
      const locale = AcceptLanguage ? !supportedlanguages.find(lang => lang == AcceptLanguage.substring(0, 2).toLowerCase()) ? "en" : AcceptLanguage.substring(0, 2).toLowerCase() : "en"
      console.log("locale",  locale, AcceptLanguage)
      store.commit("changeLocal", locale)
      store.commit('addlanguage', true)
    }
}