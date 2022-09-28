<template>
	<div class="search-list BG1">
		<div class="coin-list BG0" v-for="chain in dataList" :key="chain.chain">
			<div class="coin-header" @click="getAll(chain.chain)">
				<div class="title text1">
					<coinIcon :icon="chain.chainicon" :chainIcon="chain.chainicon" :coinName="chain.chain"
						imgWidth="16px" :showtext="1" />
					{{ chain.chainname }}
				</div>
				<div class="title jump">
					<img v-if="!dataList.by && chain.coins.length >= 3"
						src="@/assets/img/components/market/arrow-right-icons.svg" class="pointer" alt="arrow-right">
				</div>
			</div>
			<div v-for="(item, index) in chain.coins" :key="index" class="coin-content coin-row"
				@click="gotoTrade(item)">
				<div class="coin-col">
					<div>
						<a v-show="false"
							:href='`/${params.language}/swap/${item.chain}/${item.contract?item.contract:"bitkeep"}`'
							@click="preventDefault('', $event)">
						</a>
						<div class="collect-box" @click.stop="favorite(item, 'unfollow')" v-if="item.isFavorite">
							<span class="collect_icon"></span>
						</div>
						<div class="collect-box" @click.stop="favorite(item, 'follow')" v-else>
							<span class="not-collect_icon"></span>
						</div>
					</div>
					<div class="coin-icon">
						<coinIcon :icon="item.icon" :chainIcon="item.chainIcon" :coinName="item.coin"
							:chainName="item.chain" imgWidth="24px" chaincionWidth="14px" />
					</div>
					<div>
						<div class="coin-name text-bold text1" :title="(item.coin || '').toUpperCase()">
							{{ (item.coin || '').toUpperCase() }}</div>
						<div class="coin-chain text3 InterR" :title="(item.name || '').toUpperCase()">{{ item.name }}
						</div>
					</div>
				</div>
				<div class="coin-col">
					<div>
						<div class="coin-price text-bold text1">{{ item.priceText }}</div>
						<div class="coin-percent InterR"
							:class="{ up: +item.percentNum >= 0, down: +item.percentNum < 0 }">
							{{ item.percent }}</div>
					</div>
				</div>
				<div class="coin-col col-last" v-if="isPC">
					<div class="coin-vol text-bold text1">{{ (item.volText || '').replace('Vol ', '') || '$0' }} </div>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
import coinIcon from './coinIcon.vue'
export default {
	props: {
		dataList: {
			type: Array,
			default: () => { }
		},
		h5style: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			isPC: this.h5style ? !this.h5style : this.$store.state.isPC,
			params: this.$route.params,
		}
	},
	watch: {
		"$store.state.isPC": function (newVal, oldVal) {
			if (!this.h5style) {
				this.isPC = newVal
			}
		},
	},
	components: {
		coinIcon
	},
	methods: {
		favorite(item, type) {
			this.$emit('favorite', { item, type })
		},
		gotoTrade(item) {
			console.log(item)
			this.$emit('gotoSwap', item)
		},
		getAll(chain) {
			console.log(chain)
			this.$emit('getAllByChain', chain)
		},
		chainImg(chainName) {
			try {
				return require('@/assets/img/components/Mainnet/' + chainName.toUpperCase() + '.png')
			} catch {
				return ''
			}
		},
		preventDefault(path, event) {
			if (event && event.preventDefault)
				event.preventDefault();
			else
				window.event.returnValue = false; //兼容IE8
		}
	}
}
</script>

<style lang="less" scoped>
.coin-list {
	&:not(:first-child) {
		margin-top: 5px;
	}

	.coin-header {
		display: flex;
		justify-content: space-between;
		padding: 0 14px;
		height: 40px;
		line-height: 40px;

		.title {
			display: flex;
			align-items: center;
			font-size: 12px;
			font-weight: 600;

			img {
				width: 16px;
				height: 16px;
				margin-right: 10px;
			}
		}

		.jump {
			img {
				width: 24px !important;
				height: 24px !important;
				margin-right: 0px !important;
			}
		}
	}

	.coin-row {
		display: flex;
		padding: 0 14px;
		min-height: 60px;

		&.coin-header {
			height: 30px;
			line-height: 30px;
		}

		.coin-col {
			display: flex;
			flex: 1;
			// flex-shrink: 0;
			// flex-basis: 33.3%;
			align-items: center;

			&:not(:first-child) {
				text-align: right;
				justify-content: flex-end;
			}

			.text-bold {
				font-size: 14px;
				font-weight: 500;
			}

			&:last-child {
				flex: 1;
			}

			.coin-icon {
				margin-left: 5px;
			}

			.coin-name {
				font-size: 14px;
				line-height: 1.3;
				max-width: 90px;
				font-weight: 500;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.coin-chain {
				white-space: nowrap;
				font-weight: 400;
				line-height: 1.2;
				font-size: 11px;
				max-width: 90px;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.coin-percent {
				font-size: 11px;
				line-height: 1.2;
				font-weight: 400;

				&.up {
					color: #1BC89E;
				}

				&.down {
					color: #F36464;
				}

			}
		}
	}

	.collect-box {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		text-align: center;

		&:hover {
			/* Light/bg3 */
			// border-color: #E5E3E9;
			border-radius: 2px;
		}

		.not-collect_icon {
			display: block;
			width: 16px;
			height: 16px;
			cursor: pointer;
			background-size: 100% 100%;
		}

		.collect_icon {
			display: block;
			width: 16px;
			height: 16px;
			cursor: pointer;
			background-size: 100% 100%;
		}

		.collect_icon {
			background: url(../../assets/img/components/market/collect.svg) no-repeat;
			background-size: 100% 100%;
		}
	}



}

.theme-light {
	.coin-content:hover {
		background-color: @theme-light-bg1;
	}


	.not-collect_icon {
		background: url(../../assets/img/components/market/no-collect.svg) no-repeat;
		background-size: 100% 100%;
	}
}

.theme-dark {
	.coin-content:hover {
		background-color: @theme-dark-bg1;
	}


	.not-collect_icon {
		background: url(../../assets/img/components/market/no-collect-dark.svg) no-repeat;
		background-size: 100% 100%;
	}
}
</style>
