import Vue from "vue";

Vue.directive("ta", {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function (el, binding, vnode) {
        debugger;
        const modifiers = Object.assign(
            { track: true, click: true },
            binding.modifiers || {}
        );
        el.__ta_track_click__ = {
            handler: function (e) {
                debugger;
                if (!el.__ta_track_click__.$Ta)
                    return console.warn("Ta   loaded error");

                const eventData = el.__ta_track_click__.eventData || {};
                const dataType = Object.prototype.toString.call(eventData);
                switch (dataType) {
                    case "[object Object]":
                        el.__ta_track_click__.$Ta.track(eventData);
                        break;
                    case "[object Array]":
                        eventData.forEach((data) =>
                            el.__ta_track_click__.$Ta.track(data)
                        );
                        break;
                    default:
                        el.__ta_track_click__.$Ta.track("");
                        break;
                }
            },
            eventData: binding.value || {},
            typeof: "track",
            $Ta: vnode.context.$Ta,
        };

        if (modifiers.track) {
            el.__ta_track_click__.type = "track";
            el.addEventListener("click", el.__ta_track_click__.handler);
        }
    },
    update: function (el, binding, vnode) {
        const modifiers = Object.assign(
            { track: true, click: true },
            binding.modifiers || {}
        );
        el.__ta_track_click__.eventData = binding.value || {};
        el.__ta_track_click__.$Ta = vnode.context.$Ta;
    },
    unbind(el) {
        el.removeEventListener("click", el.__ta_track_click__.handler);
        el.__ta_track_click__ = null;
    },
});

Vue.prototype.$Ta = {
    track({ name='', data }) {
        if (!window.biteep_Ta) return console.warn("ta is not loaded");
        return window.biteep_Ta.track.call(window.biteep_Ta, name, data);
    },
};

!(function (e) {
    if (!window.ThinkingDataAnalyticalTool) {
        var n = e.sdkUrl,
            t = e.name,
            r = window,
            a = document,
            i = "script",
            l = null,
            s = null;
        r.ThinkingDataAnalyticalTool = t;
        var o = [
            "track",
            "quick",
            "login",
            "identify",
            "logout",
            "trackLink",
            "userSet",
            "userSetOnce",
            "userAdd",
            "userDel",
            "setPageProperty",
            "setSuperProperties",
            "setDynamicSuperProperties",
            "clearSuperProperties",
            "timeEvent",
            "unsetSuperProperties",
            "initInstance",
            "trackFirstEvent",
            "trackUpdate",
            "trackOverwrite",
        ];
        r[t] = function (e) {
            return function () {
                if (this.name)
                    (r[t]._q = r[t]._q || []).push([e, arguments, this.name]);
                else if ("initInstance" === e) {
                    var n = arguments[0];
                    r[t][n] = { name: n };
                    for (var a = 0; a < o.length; a++)
                        r[t][n][o[a]] = r[t].call(r[t][n], o[a]);
                    (r[t]._q1 = r[t]._q1 || []).push([e, arguments]);
                } else (r[t]._q = r[t]._q || []).push([e, arguments]);
            };
        };
        for (var u = 0; u < o.length; u++) r[t][o[u]] = r[t].call(null, o[u]);
        (r[t].param = e),
            (r[t].__SV = 1.1),
            (l = a.createElement(i)),
            (s = a.getElementsByTagName(i)[0]),
            (l.async = 1),
            (l.src = n),
            s.parentNode.insertBefore(l, s);
    }
})({
    appId: process.env.Analytics.appId, //系统分配的APPID
    name: "biteep_Ta" || process.env.Analytics.name, //全局的调用变量名，可以任意设置，后续的调用使用该名称即可
    sdkUrl: process.env.Analytics.sdkUrl, //统计脚本URL
    serverUrl: process.env.Analytics.serverUrl, //数据上传的URL
    // serverUrl: "http://101.36.111.115:8991/sync_js", //数据上传的URL

    autoTrack: {
        pageShow: true, //开启ta_page_show事件
        pageHide: true, //开启ta_page_hide事件
    },
    send_method: "ajax",
    showLog: process.env.Analytics.showLog,
    loaded: function (ta) {
        Vue.prototype.$TaInstance = ta;
        var currentId = ta.getDistinctId();
        ta.identify(currentId);
        ta.quick("autoTrack");
        ta.setSuperProperties({ channel_page: "web" });
    },
});
