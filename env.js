// 1.获取配置项  ms_config
// pre环境   http://106.75.60.163:8100
// test开发  http://dev.bitkeep.top:8800
// pro环境   https://conf.bitkeep.top/

// 2. host_api     https://a1.bitkeep.top/dapp
//  ms_dapp
//  ms_nft
//  ms_user
//  ms_swap

module.exports = {
    // 开发环境
    dev: {
        PROT: 8888,
        PUBLIC_PATH: "/pro-pc-project",

        //转发api
        HOST_API: "http://dev.bitkeep.top:8880",

        //dapp 服务
        DAPP_HOST: "http://152.32.168.129:8884",
        //swap服务
        MARKET_HOST: "http://152.32.168.129:8886",

        INO_HOST: "http://dev.bitkeep.top:8880",

        NFT_HOST: "http://152.32.168.129:8530",
        
		COLLECTION_HOST: "http://152.32.168.129:8532",
        USER_HOST:"http://dev.bitkeep.top:8880/user",
        OPERATION_HOST: "http://152.32.168.129:8898" || "http://ms.operation:8898",

        Analytics: {
            appId: "98cbf261dca64ce580a353e19d9e5aa5", //系统分配的APPID
            name: "pro_pc_project_ta", //全局的调用变量名，可以任意设置，后续的调用使用该名称即可
            sdkUrl: "https://cdn.bitkeep.vip/download/ta_js_sdk/thinkingdata.min.js", //统计脚本URL
            serverUrl: "https://ta.bitkeep.buzz:8993/sync_js", //数据上传的URL
            showLog: true 
        },
    },
    // 测试环境
    test: {
        PROT: 8888,
        PUBLIC_PATH: "/pro-pc-project",

        HOST_API: "http://dev.bitkeep.top:8880",

        DAPP_HOST: "http://152.32.168.129:8884",
        MARKET_HOST: "http://152.32.168.129:8886", //http://152.32.168.129:8886
        // http://ms.nftmarket:
        INO_HOST: "http://152.32.168.129:8887", 
        NFT_HOST:  "http://152.32.168.129:8530", //"http://106.75.60.163:8870/nft/", //"http://152.32.168.129:8530",

		COLLECTION_HOST: "http://152.32.168.129:8532", 
        USER_HOST:"http://dev.bitkeep.top:8880/user",
        OPERATION_HOST: "http://152.32.168.129:8898" || "http://ms.operation:8898",
        Analytics: {
            appId: "98cbf261dca64ce580a353e19d9e5aa5", //系统分配的APPID
            name: "pro_pc_project_ta", //全局的调用变量名，可以任意设置，后续的调用使用该名称即可
            sdkUrl: "https://cdn.bitkeep.vip/download/ta_js_sdk/thinkingdata.min.js", //统计脚本URL
            serverUrl: "https://ta.bitkeep.buzz:8993/sync_js", //数据上传的URL
            showLog: true 
        },
    },
    pre: {
        PROT: 8888,
        PUBLIC_PATH: "/pro-pc-project",

        HOST_API: "http://106.75.60.163:8870",

        DAPP_HOST: "http://106.75.60.163:8870/dapp",
        MARKET_HOST: "http://106.75.60.163:8870/market",

        INO_HOST: "http://106.75.60.163:8870/nft_market",
        NFT_HOST: "http://106.75.60.163:8870/nft_market",  
		COLLECTION_HOST: "http://106.75.60.163:8870/nft_market", 
        USER_HOST:"http://106.75.60.163:8870/user",
        OPERATION_HOST: "http://106.75.60.163:8870/operationweb" || "http://ms.operation:8898",
        Analytics: {
            appId: "98cbf261dca64ce580a353e19d9e5aa5", //系统分配的APPID
            name: "pro_pc_project_ta", //全局的调用变量名，可以任意设置，后续的调用使用该名称即可
            sdkUrl: "https://cdn.bitkeep.vip/download/ta_js_sdk/thinkingdata.min.js", //统计脚本URL
            serverUrl: "https://ta.bitkeep.buzz:8993/sync_js", //数据上传的URL
            showLog: true  
        },
    },

    // 生产环境
    pro: {
        PROT: 8888,
        PUBLIC_PATH: "https://cdn2.bitkeep.vip/web/pro-pc-project",

        HOST_API: "https://a1.bitkeep.top",

        DAPP_HOST: "https://a1.bitkeep.top/dapp",
        MARKET_HOST: "https://a1.bitkeep.top/market",

        INO_HOST: "https://a1.bitkeep.top/nft_market",
        
		COLLECTION_HOST: "https://a1.bitkeep.top/nft_market", 
 
        NFT_HOST: "https://a1.bitkeep.top/nft_market", //"http://152.32.168.129:8530",
        USER_HOST:"https://a1.bitkeep.top/user",
        OPERATION_HOST: "http://ms.operation:8898",
        Analytics: {
            appId: "7f12722c587b4a2b901e5cde987046bb", //系统分配的APPID
            name: "pro_pc_project_ta", //全局的调用变量名，可以任意设置，后续的调用使用该名称即可
            sdkUrl: "https://cdn.bitkeep.vip/download/ta_js_sdk/thinkingdata.min.js", //统计脚本URL
            serverUrl: "https://ta.bitkeep.buzz:8993/sync_js", //数据上传的URL
            showLog: false 
        },
    },
};
