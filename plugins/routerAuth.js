export default ({app,redirect,store}) => {
    const {Supportedlanguages,SeoReptile,isMobile} = store.state;
    const languages=['zh', 'en', 'ko'];
    app.router.beforeEach((to, from, next) => {
        switch (to.path) {
            case "/":
                if(SeoReptile){
                    redirect(301, "/en/index")
                }
                break;
            case "/index":
                redirect(301, "/en/index")
                break;
            case "/download":
                redirect(301, "/en/download")
                break;
            case "/jobs":
                redirect(301, "/en/jobs")
                break; 
            case "/about":
                redirect(301, "/en/about")
                break;
            case "/bkb":
                redirect(301, "/en/index")
                break; 
            case "/ko/bkb":
                redirect(301, "/en/index")
                break; 
            case "/zh/bkb":
                redirect(301, "/en/index")
                break;               
        }
        if(to.path.indexOf("royalties")!=-1){
            redirect(301, "https://business.bitkeep.com/nftmarket/manager/data")
            return false   
        }
        if(to.path.indexOf("freeMint")!=-1){
            if(isMobile){
                redirect(302, "https://sharea.bitkeep.asia/FreeMints")
                return false 
            }
        }
        
        let bitkeep_theme=app.$cookies.get('bitkeep_theme')
        if(!bitkeep_theme){
            bitkeep_theme='light'
        }
        store.commit('changeTheme',bitkeep_theme)
        if (!Supportedlanguages.find(lang => lang == to.params.language)) {
            if(to.path=='/'){
                next()
            }else if (to.path.indexOf("nftactivity")!=-1) {
                next()
            }else{
                if(to.path.indexOf("swap")!=-1){
                    redirect(301, '/en/swap')
                    // store.commit('changeLocal','en')
                }else if(to.path.indexOf("permanent")!=-1){
                    next()
                }else{
                    redirect(301, '/en/index')
                    // store.commit('changeLocal','en')
                }        
                return
            }
        } else {
            if(to.path=='/'||to.path.indexOf("/index")!=-1||to.path.indexOf("/download")!=-1||to.path.indexOf("/recruiting")!=-1){
                // store.commit('changeLocal',to.params.language)
                store.commit('addlanguage',true) 
                next()
            }else{
                store.commit('addlanguage',false)
                if (!languages.find(lang => lang == to.params.language)) {
                    redirect(301, to.fullPath.replace(to.params.language,'en'))
                    // store.commit('changeLocal','en')     
                }else{
                    next()
                    // store.commit('changeLocal',to.params.language)
                }
                 
            }
        }
        
    })
    app.router.afterEach((to, from) => {
        if(to.path!='/'){
            const {language} = to.params;
            store.commit('changeLocal',language)
        }
    })
}