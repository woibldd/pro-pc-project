<template>
    <div class="dappStoreSlideBox lineBG2 BG0">
        <div class="dappStoreSlideTop lineBG2">
            <h2 class="dappStoreSlideitem text1" :title="$t('DappStore.slide.mycollection')">
                <a :href='"/" + params.language + "/dapp/collect"' class="seo_href text1"
                    :title="$t('DappStore.slide.mycollection')"
                    :class="$route.path.indexOf('collect') != -1 ? 'isActive Colorpurple' : ''"
                    @click="toPath('collect', $event)">
                    <img src="@/assets/img/components/dappStore/slide/collection_light.svg" alt="collect_icon"
                        class="icon_light">
                    <img src="@/assets/img/components/dappStore/slide/collection_dark.svg" alt="collect_icon"
                        class="icon_dark">
                    <img src="@/assets/img/components/dappStore/slide/collect_Active_icons.svg" alt="collect_icon"
                        class="icon_Active">
                    {{ $t('DappStore.slide.mycollection') }}
                </a>
            </h2>
            <h2 class="dappStoreSlideitem text1" :title="$t('DappStore.slide.Browsinghistory')">
                <a :href='"/" + params.language + "/dapp/browsinghistory"' class="seo_href text1"
                    :title="$t('DappStore.slide.Browsinghistory')"
                    :class="$route.path.indexOf('browsinghistory') != -1 ? 'isActive Colorpurple' : ''"
                    @click="toPath('history', $event)">
                    <img src="@/assets/img/components/dappStore/slide/time_light.svg" alt="time_icon"
                        class="icon_light">
                    <img src="@/assets/img/components/dappStore/slide/time_dark.svg" alt="time_icon" class="icon_dark">
                    <img src="@/assets/img/components/dappStore/slide/time_Active_icons.svg" alt="time_icon"
                        class="icon_Active">
                    {{ $t('DappStore.slide.Browsinghistory') }}
                </a>
            </h2>
        </div>
        <div class="dappStoreSlideList">
            <h2 class="dappStoreSlideitem text1" :title="$t('DappStore.slide.recommend')">
                <a :href='"/" + params.language + "/dapp"' class="seo_href text1"
                    :class="$route.path == '/' + $route.params.language + '/dapp' ? 'isActive Colorpurple' : ''"
                    :title="$t('DappStore.slide.recommend')" @click="toPath('dapp', $event)">
                    {{ $t('DappStore.slide.recommend') }}
                </a>
            </h2>
            <h2 class="dappStoreSlideitem text1" :title="item.title" v-for="item in dappStoreslideList" :key="item.id">
                <a :href='"/" + params.language + "/dapp/" + (params.chain ? params.chain : "All") + "/" + item.id'
                    class="seo_href text1" :title="item.title"
                    :class="$route.path.indexOf(item.id) != -1 ? 'isActive Colorpurple' : ''"
                    @click="toTag(item.id, $event)">
                    <span v-if="vuxslide.indexOf(item.title) != -1" :title="$t('DappStore.slide.' + item.title)">{{
                            $t('DappStore.slide.' + item.title)
                    }}</span>
                    <span v-else :title="item.title">{{ item.title }}</span>
                </a>
            </h2>
        </div>
    </div>
</template>
<script>
export default {
    name: "DappStoreSlide",
    data() {
        return {
            dappStoreslideList: this.$store.state.GetDappConfig.dataTag.tags,
            vuxslide: this.$store.state.dappStore.dappStoreSlide,
            params: this.$route.params
        }
    },
    methods: {
        toTag(id, event) {
            if (event && event.preventDefault)
                event.preventDefault();
            else
                window.event.returnValue = false; //兼容IE8
            const { chain, language } = this.$router.currentRoute.params;
            const { ...query } = this.$route.query;
            const Curchain = chain ? chain : 'All'
            this.$Ta.track({
                name: 'Bitkeep__Dapp_Page', data: {
                    Action_Location_Name: id,
                    Action_Location_Id:id
                }
            })
            this.$router.push({
                path: "/" + language + '/dapp/' + Curchain + '/' + id,
                query: { ...query }
            })
        },
        toPath(path, event) {
            if (event && event.preventDefault)
                event.preventDefault();
            else
                window.event.returnValue = false; //兼容IE8
            this.$Ta.track({
                name: 'Bitkeep__Dapp_Page', data: {
                    Action_Location_Name: path,
                    Action_Location_Id:path
                }
            })    
            const { language } = this.$router.currentRoute.params;
            const { ...query } = this.$route.query;
            switch (path) {
                case 'collect':
                    this.$router.push({
                        path: "/" + language + '/dapp/collect',
                        query: { ...query }
                    })
                    break;
                case 'history':
                    this.$router.push({
                        path: "/" + language + '/dapp/browsinghistory',
                        query: { ...query }
                    })
                    break;
                case 'dapp':
                    this.$router.push({
                        path: "/" + language + '/dapp',
                        query: { ...query }
                    })
                    break;
                default:
                    this.$router.push({
                        path: "/" + language + '/dapp',
                        query: { ...query }
                    })
                    break;
            }
        }
    }
}
</script>
<style lang="less" scoped>
@media screen and (max-width: 845px) {
    .dappStoreSlideBox {
        display: none !important;
    }
}

.theme-light {
    .icon_light {
        display: block;
    }

    .icon_dark {
        display: none;
    }

    .dappStoreSlideitem:hover {
        background-color: #F8F8F9;
    }

    .isActive {
        background: rgba(117, 36, 249, 0.1);
    }
}

.theme-dark {
    .icon_light {
        display: none;
    }

    .icon_dark {
        display: block;
    }

    .dappStoreSlideitem:hover {
        background-color: #202024;
    }

    .isActive {
        background: rgba(160, 65, 255, 0.1);
    }
}

.dappStoreSlideBox {
    width: 238px;
    border-right: 1px solid;

    .dappStoreSlideTop {
        width: 100%;
        padding: 20px 0px;
        border-bottom: 1px solid;

        .dappStoreSlideitem {
            width: 100%;

            .seo_href {
                display: block;
                width: 100%;
                height: 100%;
                padding: 20px 12px;
                display: flex;
                align-items: center;
                border-radius: 6px 0px 0px 6px;
                font-weight: 500;
                font-size: 14px;
                cursor: pointer;
                box-sizing: border-box;

                img {
                    margin-right: 12px;
                }

                .icon_Active {
                    display: none;
                }
            }

            .isActive {
                .icon_Active {
                    display: block;
                }

                .icon_light {
                    display: none;
                }

                .icon_dark {
                    display: none;
                }
            }
        }


    }

    .dappStoreSlideList {
        width: 100%;
        padding: 20px 0px;

        .dappStoreSlideitem {
            width: 100%;

            .seo_href {
                display: block;
                width: 100%;
                height: 100%;
                font-weight: 600;
                padding: 20px;
                display: flex;
                align-items: center;
                border-radius: 6px 0px 0px 6px;
                font-weight: 500;
                font-size: 14px;
                cursor: pointer;
                box-sizing: border-box;
            }
        }
    }
}

.dappStoreSlideBox::-webkit-scrollbar {
    display: none;
}
</style>