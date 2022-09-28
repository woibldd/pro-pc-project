export default function ({ $axios, store}) {
  $axios.defaults.timeout = 60000
  const {Supportedlanguages} = store.state;

  $axios.interceptors.request.use(
    (config) => {
      console.log()
      // 拦截逻辑
      config.headers = {
        ...config.headers,
        'Content-Type': 'application/json;charset=UTF-8',
        language: store.state.locale ? (Supportedlanguages.indexOf(store.state.locale)!=-1?store.state.locale:'en'):'en',
        token: store.state.WalletID? store.state.WalletID:'',
        currency: '',
        brand: 'web',
        os: '',
        package: '',
        clientversion: '',
        im: '',
        package:"com.bitkeep.pc",
        timezonename:(0 - new Date().getTimezoneOffset() / 60),//时区 
        // timezonename:Intl.DateTimeFormat().resolvedOptions().timeZone, // Asia/Shanghai
        markethour: "hour"//zero
        // version:"7.0.9"
      }
      //console.log(config,'server request')
      return config
    },
    // asdf
    (error) => {
      return Promise.resolve({
        status: 1,
        error,
        data: "networker Error"
      })
    }
  )

  // response interceptor
  $axios.interceptors.response.use(
    (response) => {
      // 拦截逻辑
      return response.data
    }
    ,
    (error) => {
      return Promise.resolve({ status: 1, data: error })
    }
  )
}
