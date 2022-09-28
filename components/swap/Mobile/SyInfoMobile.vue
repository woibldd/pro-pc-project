<template>
	<div>
		<a-affix :offset-top="44" :style='{ "width": "100%" }'>
			<div class="kline-nav lineBG2 BG0">
				<section class="kline-nav-top" v-click-outside="closeH5Search">
					<div class="kline-nav-left" v-show="!marketSearchshow">
						<img src="../../../assets/img/swap/light/backPage.svg" alt="backPage"
							class="backPage light_icon" @click="gotoQuote">
						<img src="../../../assets/img/swap/dark/backPage.png" alt="backPage" class="backPage dark_icon"
							@click="gotoQuote">
						<coinIcon :icon="coinInfo.icon && coinInfo.icon" :chainIcon="coinInfo.chain"
							:coinName="coinInfo.name" imgWidth="32px"
							:chainName="contract != 'bitkeep' ? coinInfo.chain : ''" />
						<div class="currency-name">
							<p class="big-p text1">
								<span class="big-p-name">{{ symbol && symbol.toLocaleUpperCase() }}</span>
								<span class="line-space text1 big-p-over">{{ iconIndroduce.name }}</span>
							</p>
							<p class="small-p text3" v-if="contract != 'bitkeep'" @click="handleCopy(contract)">
								{{ contract | blurredDisplay }}
								<img src="~/assets/img/swap/copy_icon.svg" alt="copy" />
							</p>
							<p class="small-p text3" v-else>
								{{ iconIndroduce.chainName }}
							</p>
						</div>
					</div>
					<div class="kline-switch-btn" @click="showSearch" v-show="!marketSearchshow">
						<img src="~/assets/img/swap/light/search_icons.svg" alt="btn" class="dark_icon">
						<img src="~/assets/img/swap/dark/search_icons.svg" alt="btn" class="light_icon">
					</div>
					<marketSearch v-show="marketSearchshow" :isDrawer="true" :setfocus="true" :jumpTarget="false"
						@close="closeH5Search">
					</marketSearch>
				</section>
			</div>
		</a-affix>
		<div class="kline-nav lineBG2 BG0">
			<section class="kline-nav-bottom">
				<div class="left">
					<p class="text1" style="font-weight:600;" v-if="coinInfo && coinInfo.price">$<span
							class="total-price text1">{{ coinInfo.price }}</span>
					</p>
					<p v-else class="text1" style="font-weight:600;">{{ $t("SwapHome.noData") }}</p>
					<p v-if="coinInfo && coinInfo.price"
						:class="['range', { 'red-down': parseFloat(coinInfo.percent) < 0 }]">{{
								parseFloat(coinInfo.percent) > 0 ? '+' + coinInfo.percent : coinInfo.percent
						}}
					</p>
				</div>
				<div class="right">
					<div class="right-one">
						<p>
							<span class="text3 text-tip">{{ $t('SwapDetail.kLineNav.highPrice') }}</span>
							<span class="text1" v-if="coinInfo && coinInfo.high24">${{ coinInfo.high24 }}</span>
							<span class="text1" v-else>{{ $t("SwapHome.noData") }}</span>
						</p>
						<p>
							<span class="text3 text-tip">{{ $t('SwapDetail.kLineNav.lowPrice') }}</span>
							<span class="text1" v-if="coinInfo && coinInfo.low24">${{ coinInfo.low24 }}</span>
							<span class="text1" v-else>{{ $t("SwapHome.noData") }}</span>
						</p>
					</div>
					<div class="right-two">
						<p>
							<span class="text3 text-tip">{{ $t('SwapDetail.kLineNav.volUni')
							}}(<span v-if="symbol && symbol.toLocaleUpperCase()">{{ symbol && symbol.toLocaleUpperCase() }}</span><span v-else>{{ $t("SwapHome.noData") }}</span>)</span>
							<span class="text1" v-if="coinInfo && coinInfo.vol24"> {{ coinInfo.vol24 }}</span>
							<span class="text1" v-else>{{ $t("SwapHome.noData") }}</span>
						</p>
						<p>
							<span class="text3 text-tip"> {{ $t('SwapDetail.kLineNav.volUni') }}(USDT)</span>
							<span class="text1" v-if="coinInfo && coinInfo.usdtVol24">{{ coinInfo.usdtVol24 }}</span>
							<span class="text1" v-else>{{ $t("SwapHome.noData") }}</span>
						</p>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex'
import copy from 'copy-to-clipboard';
import ClickOutside from 'vue-click-outside'
import coinIcon from '@/components/market/coinIcon.vue'
export default {
	name: 'SyInfoMobile',
	data() {
		return {
			marketSearchshow: false,
			contract: this.$route.params.contract
			// isFavorite:this.$store.state.swap.coinInfo && this.$store.state.swap.coinInfo.isFavorite
		}
	},
	computed: mapState({
		isFavorite: state => state.swap.iconIndroduce && state.swap.iconIndroduce.isFavorite,
		coinInfo: state => state.swap.coinInfo && state.swap.coinInfo,
		symbol: state => state.swap.coinInfo && state.swap.coinInfo.symbol,
		iconIndroduce: state => state.swap.iconIndroduce,
		infoList: (state) => {
			return state.swap.iconIndroduce.others && state.swap.iconIndroduce.others.find(item => item.type === 'info')
		},
		address: state => state.address
	}),
	directives: {
		ClickOutside
	},
	mounted() {

	},
	components: {
		coinIcon,
	},
	methods: {
		handleCopy(data) {
			if (!data) {
				this.$message.warning(this.$t('header.Nocopy'))
				return
			}
			copy(data)
			this.$message.success(this.$t('header.copySuccess'))
		},
		closeH5Search() {
			this.marketSearchshow = false;
			const bodycontent=document.getElementsByClassName("swapbox")[0];
     		bodycontent.classList.remove("overflowbody")
		},
		gotoQuote() {
			const { language } = this.$route.params
			this.$router.push({
				path: '/' + language + '/swap'
			})
		},
		showSearch(){
			this.marketSearchshow = true;
			const bodycontent=document.getElementsByClassName("swapbox")[0];
     		bodycontent.classList.add("overflowbody")
		},
	}
}
</script>
<style lang="less" scoped>
.kline-nav {
	width: 100%;
	padding: 0 20px;
	padding-left: 20px;
	box-sizing: border-box;

	.kline-nav-top {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px 0px;
		box-sizing: border-box;

		.kline-nav-left {
			display: flex;
			align-items: center;

			.backPage {
				display: block;
				width: 24px;
				height: 24px;
			}

			.symbol-img {
				width: 32px;
				height: 32px;
				border-radius: 50%;
			}

			.currency-name {
				max-width: 250px;

				.big-p {
					display: flex;
					align-items: flex-end;

					span {
						display: block;
						font-weight: 500;
						font-size: 11px;
					}

					.big-p-name {
						font-weight: 600;
						font-size: 16px;
						line-height: 20px;
						max-width: 130px;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						margin-right: 3px;
					}

					.line-space {
						max-width: 120px;
						line-height: 17px;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}

				.small-p {
					max-width: 150px;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					font-weight: 500;
					font-size: 11px;
				}
			}
		}

		.kline-switch-btn {
			width: 24px;
			height: 24px;

			img {
				display: block;
				width: 100%;
				height: auto;
			}
		}
	}

	.kline-nav-bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;

		.left {
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-direction: column;
			max-width: 150px;

			>.text1 {
				width: 100%;
				font-size: 20px;
				margin-bottom: 10px;
				display: flex;
				flex-direction: row;

				.total-price {
					display: block;
					width: 100%;
					max-width: 130px;
					text-align: left;
					font-weight: 600;
					font-size: 24px;
					line-height: 34px;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}

			.range {
				width: 100%;
				max-width: 130px;
				text-align: left;
				font-weight: 500;
				font-size: 14px;
				line-height: 16px;
				color: #1BC89E;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			.red-down {
				color: #F36464;
			}
		}

		.right {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			overflow: hidden;

			.right-one {
				max-width: 80px;
				margin-right: 10px;

				p {
					width: 100%;

					span {
						width: 100%;
						display: block;
						font-family: 'Inter';
						font-style: normal;
						font-weight: 500 !important;
						font-size: 10px !important;
						line-height: 14px;
						margin-bottom: 5px;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
			}

			.right-two {
				max-width: 105px;
				p {
					width: 100%;

					>span {
						width: 100%;
						display: block;
						font-family: 'Inter';
						font-style: normal;
						font-weight: 500 !important;
						font-size: 10px !important;
						line-height: 14px;
						margin-bottom: 5px;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
			}
		}
	}
}
</style>
