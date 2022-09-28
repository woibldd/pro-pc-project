import Vue from 'vue';
//合约地址模糊展示
Vue.filter('blurredDisplay', function (value) {
    if (!value) return ''
    let res = value.toString();
    return res.slice(0,6) + '...' + res.slice(-4);
});

//字符串智能转化成相关网址
Vue.filter('urlDisplay', function (value) {
    let res = value.toString();
    if(res.indexOf('http')==-1){
        res = 'https://' + res;
        if(res.indexOf('com')==-1&&res.indexOf('cn')==-1){
            res =res + '.com';
        }  
    }
    return res;
})
