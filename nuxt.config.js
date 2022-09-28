import CompressionPlugin from 'compression-webpack-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import jsonLd from './static/jsonld.json'
import env from './env'
import proxywhite from './api/proxywhitelist.json'
require('events').EventEmitter.defaultMaxListeners = 30

const BUILD_TYPE = process.env.BUILD_TYPE
const SERVER_ENV = env[BUILD_TYPE] || env.pro

//clinet
const CLINET_ENV = {
  ...SERVER_ENV,
  BUILD_TYPE: BUILD_TYPE,
  NODE_ENV: process.env.NODE_ENV,
}


//server pm2 start  覆盖环境变量   SERVER_ENV 最好只做客户端
SERVER_ENV.HOST_API = process.env.HOST_API ||  SERVER_ENV.HOST_API
SERVER_ENV.DAPP_HOST =  process.env.DAPP_HOST ||  SERVER_ENV.DAPP_HOST
SERVER_ENV.MARKET_HOST = process.env.MARKET_HOST ||  SERVER_ENV.MARKET_HOST
SERVER_ENV.INO_HOST = process.env.INO_HOST ||  SERVER_ENV.INO_HOST

SERVER_ENV.NFT_HOST = process.env.NFT_HOST ||  SERVER_ENV.NFT_HOST
SERVER_ENV.COLLECTION_HOST =  process.env.COLLECTION_HOST ||  SERVER_ENV.COLLECTION_HOST
SERVER_ENV.UPLOAD_HOST = process.env.UPLOAD_HOST ||  SERVER_ENV.UPLOAD_HOST

SERVER_ENV.USER_HOST = process.env.USER_HOST ||  SERVER_ENV.USER_HOST

SERVER_ENV.OPERATION_HOST = process.env.OPERATION_HOST ||  SERVER_ENV.OPERATION_HOST

SERVER_ENV.DEBUG = process.env.DEBUG || SERVER_ENV.DEBUG
SERVER_ENV.PROT = process.env.PROT || SERVER_ENV.PROT
SERVER_ENV.PUBLIC_PATH = process.env.PUBLIC_PATH || SERVER_ENV.PUBLIC_PATH  //cdn



const isProduction  =process.env.NODE_ENV =='production'
console.log("___当前环境 client", JSON.stringify(CLINET_ENV, null, 2))
console.log("___当前环境 server", JSON.stringify(SERVER_ENV, null, 2))
export default {
  //  cli:{
  //     badgeMessages:[ JSON.stringify() ],
  //     bannerColor: 'yellow'
  // },
  watch: ["./api/apiList/*.js", "./env.js"],
  env: CLINET_ENV,
  server: {
    port: process.env.PROT || SERVER_ENV.PROT,
    host: '0.0.0.0'
  },
  head: {
    title: 'BitKeep: The Best Decentralized Multi-chain Crypto Wallet',
    htmlAttrs: {
      lang: 'en'
    },
    bodyAttrs: {
      class: 'theme-light'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0,maximum-scale=1.0' },
      { name: 'google-site-verification', content: 'mohvtRqx4881-yk3PPB1HGwrE4jNIUehtro0H4E3HVw' },
      { name: 'robots', content: 'all' },
      { name: 'og:url', content: '"https://bitkeep.com', 'data-shuvi-head': 'true' },
      { name: 'og:type', content: 'website' },
      { hid:'og:image:alt', name: 'og:image:alt', content: 'BitKeep, a Best Crpto Wallet' },
      { name: 'og:site_name', content: 'BitKeep' },
      { name: 'twitter:card', content: 'summary_large_image', 'data-shuvi-head': 'true' },
      { name: 'twitter:site', content: 'BitKeep', 'data-shuvi-head': 'true' },
      { name: 'format-detection', content: 'telephone=no' },
      { hid:'twitter:image',name: 'twitter:image', content: 'https://cdn.bitkeep.vip/u_b_26e281b0-a509-11ec-a3eb-f758fa002ae8.png', 'data-shuvi-head': 'true' },
      { hid:'twitter:image:src', name: 'twitter:image:src', content: 'https://cdn.bitkeep.vip/u_b_26e281b0-a509-11ec-a3eb-f758fa002ae8.png', 'data-shuvi-head': 'true' },
      { hid:'og:image', name: 'og:image', content: 'https://cdn.bitkeep.vip/u_b_26e281b0-a509-11ec-a3eb-f758fa002ae8.png' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'shortcut icon', type: 'image/x-icon', href: 'https://cdn.bitkeep.vip/u_b_69b66a00-a046-11ec-a3eb-f758fa002ae8.png' }
    ],
    script: BUILD_TYPE != 'pro' ? [
      {
        src:
          "https://cdn.bootcdn.net/ajax/libs/vConsole/3.8.1/vconsole.min.js",
        type: "text/javascript",
        charset: "utf-8"
      },
      {src:'https://cdn2.bitkeep.vip/files/gtag.js?id=G-39NRXSECDR',async: true},
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(jsonLd.website)
      },
    ] : [
      {src:'https://cdn2.bitkeep.vip/files/gtag.js?id=G-39NRXSECDR',async: true},
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(jsonLd.website)
      },
    ],
    __dangerouslyDisableSanitizers: ['script']
  },
  // loading: {
  //   color: '#7524F9',
  //   height: '1px',
  //   throttle: 200 // 在 ms 中， 在显示进度条之前等待指定的时间。 用于防止条形闪烁
  // },
  loading:false,
  css: [
    'ant-design-vue/dist/antd.less',
    '@/assets/css/globle.less',
    '@/assets/css/theme_class.less',
    '@/assets/css/flex.css'
  ],
  styleResources: {
    less: ['@/assets/css/theme.less']
  },
  plugins: [
    { src: '@/plugins/ta.js', ssr: false },
    { src: '@/plugins/ga.js', ssr: false },
    { src: '@/plugins/init' },
    { src: '@/plugins/bitkeep.js', ssr: false },
    { src: '@/plugins/localStorage.js', ssr: false },
    { src: '@/plugins/vue-awesome-swiper.js', ssr: false },
    '@/plugins/api-plugins',
    '@/plugins/axios',
    '@/plugins/routerAuth'
  ],
  components: true,
  modules: [
    // "@nuxtjs/proxy",
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    'cookie-universal-nuxt'
  ],
  router: {
    scrollBehavior (to, from, savedPosition) {
      window.biteep_Ta.quick('autoTrack', {
          name: 'ta_pageview',
      })
      window.biteep_Ta.quick('autoTrack', {
          name: 'ta_page_show',
      })
      return
    },
    extendRoutes(routes, resolve) { // 自定义路由表
        routes.push({
            name: 'default',
            path: '/',
            component: resolve(__dirname, './pages/_language/index/index.vue')
        })
    }
    // middleware: ["router"]
  },
  axios: {
    proxy: true,
    Credential: true
  },

  proxy: {
    '/dappApi': {
      target: SERVER_ENV.DAPP_HOST, // 代理转发的地址
      changeOrigin: true, // 允许跨域
      pathRewrite: function (path, req) {
        if (Object.values(proxywhite.dappApi).findIndex(item => {
          return item == req.originalUrl
        }) == -1) {
          return path
        } else {
          return path.replace('/dappApi', '')
        }
      }
    },
    '/marketApi': {
      target: SERVER_ENV.MARKET_HOST,
      changeOrigin: true, // 允许跨域
      pathRewrite: function (path, req) {
        if (Object.values(proxywhite.marketApi).findIndex(item => {
          return item == req.originalUrl
        }) == -1) {
          return path
        } else {
          return path.replace('/marketApi', '')
        }
      }
    },
    '/inoApi': {
        target: SERVER_ENV.INO_HOST,
        changeOrigin: true, // 允许跨域
        pathRewrite: function (path, req) {
          if (Object.values(proxywhite.inoApi).findIndex(item => {
            return item == req.originalUrl
          }) == -1) {
            return path
          } else {
            return path.replace('/inoApi', '')
          }
        }
    },
    '/nftMarketApi': {
      target: SERVER_ENV.NFT_HOST,
      pathRewrite: {
        '^\/nftMarketApi': ''
      }
    },
    '/userApi': {
      target: SERVER_ENV.USER_HOST,
      pathRewrite: function (path, req) {
        if (Object.values(proxywhite.userApi).findIndex(item => {
          return item == req.originalUrl
        }) == -1) {
          return path
        } else {
          return path.replace('/userApi', '')
        }
      }
    },
    "/operationApi":{
      target: SERVER_ENV.OPERATION_HOST,
      pathRewrite: function (path, req) {
        if (Object.values(proxywhite.operationApi).findIndex(item => {
          return item == req.originalUrl
        }) == -1) {
          return path
        } else {
          return path.replace('/operationApi', '')
        }
      }
    }

    // "/charting_library":{
    //   target:  "http://localhost:8080",
    //   changeOrigin: true,
    // }

    // '/market': {
    //   target:  process.env.HOST_API ||  SERVER_ENV.HOST_API,
    // },
  },
  render: {
    resourceHints: false
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    devtools: BUILD_TYPE != 'pro',
    publicPath: process.env.PUBLIC_PATH || SERVER_ENV.PUBLIC_PATH,
    extractCSS: true,
    analyze: BUILD_TYPE == "pro" ? {
      analyzerMode: 'static'
    } : false,
    optimization: isProduction ? {
      runtimeChunk: 'single',
      minimize: undefined,
      minimizer:undefined,
      splitChunks: {
        chunks:'all',
        // minSize: 1024 * 80,
        maxSize: 1024 * 4872,
        maxInitialRequests: 6,
        maxAsyncRequests: 6,
        cacheGroups: {
          common: {
            name: 'chunk-common',
            chunks: 'initial',
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 1,
            reuseExistingChunk: true,
            enforce: true,
          },
          antdesign: {
            name: 'chunk-ant-design',
            test: /[\\/]node_modules[\\/]ant-design-vue[\\/]/,
            chunks: 'all',
            priority: 6,
            reuseExistingChunk: true,
            enforce: true,
          },
          echarts: {
            name: 'chunk-echarts',
            test: /[\\/]node_modules[\\/](vue-)?echarts[\\/]/,
            chunks: 'all',
            priority: 4,
            reuseExistingChunk: true,
            enforce: true,
          },
          axios: {
            name: 'axios',
            test: /[\\/]node_modules[\\/](vue-)?axios[\\/]/,
            chunks: 'all',
            priority: 6,
            reuseExistingChunk: true,
            enforce: true,
          },
          swiper:{
            name: 'chunk-swiper',
            test: /[\\/]node_modules[\\/]vue-awesome-swiper[\\/]/,
            chunks: 'all',
            priority: 4,
            reuseExistingChunk: true,
            enforce: true,
          }
          // styles: {
          //   name: 'styles',
          //   test: /\.(css|vue)$/,
          //   chunks: 'all',
          //   enforce: true
          // }
        }
      }
    }:{},
    splitChunks:isProduction ? {
      layouts: false,
      pages: false,
      commons: true
    }:{},
    plugins: isProduction ? [    new CompressionPlugin({
      test: /\.js$|\.html$|\.css/, // 匹配文件名

      threshold: 10240, // 对超过10kb的数据进行压缩

      deleteOriginalAssets: false // 是否删除原文件
    })]: [ ],
    loaders: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: {
            'primary-color': '#7524F9'
            // 'link-color': '#1DA57A',
            // 'border-radius-base': '2px'
          }
        }
      }
    },
    extend(config, ctx) {
      const isPro = env[BUILD_TYPE] == "pro"
      if (!isPro) { config.devtool = 'source-map' }
      if (!ctx.isDev && ctx.isClient && isPro) {
        config.plugins.push(
          new UglifyJsPlugin({
            uglifyOptions: {
              compress: {
                drop_console: isPro
              }
            }
          })
        )
      }
    }
  }
}
