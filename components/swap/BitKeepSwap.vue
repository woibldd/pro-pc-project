<template>
  <div class="swap-deal lineBG2">
    <nav class="lineBG2">
      <p class="text1">
        交易
      </p>
      <div>
        <img src="~/assets/img/swap/wallet/swap_set_btn.svg" alt="swap_set">
        <img src="~/assets/img/swap/wallet/swap_history_icon.svg" alt="swap_history">
      </div>
    </nav>
    <div class="swap-content">
      <div class="swap-title text3">
        <p>Send Chain</p>
        <p>Receive Chain</p>
      </div>
      <div class="chain-list">
        <div class="left-chain BG1 lineBG2">
          <img src="~/assets/img/swap/wallet/swap_set_btn.svg" alt="bitkeep">
          <p>Ethereum</p>
          <img src="~/assets/img/swap/wallet/swap_down_btn.svg" alt="bitkeep">
        </div>
        <div class="center-chain BG1 lineBG2">
          <img src="~/assets/img/swap/wallet/swap_right_arrow.svg" alt="bitkeep">
        </div>
        <div class="left-chain BG1 lineBG2">
          <img src="~/assets/img/swap/wallet/swap_set_btn.svg" alt="bitkeep">
          <p>Polygon</p>
          <img src="~/assets/img/swap/wallet/swap_down_btn.svg" alt="bitkeep">
        </div>
      </div>
      <div class="deal-wrap">
        <div class="deal-content BG1 lineBG2">
          <div class="deal-line">
            <p class="text3">
              卖出
            </p>
            <p class="text2">
              Balance: <span> 13,912.214</span><span class="max-btn">MAX</span>
            </p>
          </div>
          <div class="deal-up">
            <div class="deal-up-left">
              <img src="~/assets/img/swap/wallet/swap_set_btn.svg" alt="swap_set">
              <div class="deal-up-right">
                <p class="text1">
                  UNI
                </p>
                <p>Ethereum</p>
              </div>
            </div>
            <p class="deal-text text1">
              11.9831
            </p>
          </div>
        </div>
        <div class="deal-content BG1 lineBG2">
          <div class="deal-line">
            <p class="text3">
              买入
            </p>
            <p class="text2">
              Balance: <span> 13,912.214</span>
            </p>
          </div>
          <div class="deal-up">
            <div class="deal-up-left">
              <img src="~/assets/img/swap/wallet/swap_history_icon.svg" alt="swap_history">
              <div class="deal-up-right">
                <p class="text1">
                  UNI
                </p>
                <p>Ethereum</p>
              </div>
            </div>
            <p class="deal-text text1">
              11.9831
            </p>
          </div>
        </div>
        <div class="switch-btn">
          <img :src="switchBtnSrc" alt="switchBtnSrc">
        </div>
      </div>
      <div class="swap-submit text1">
        兑换
      </div>
      <div class="swap-tip text3">
        <p>1 BNB = 0.021 ETH</p>
        <p class="p-last">
          1 ETH = 3,423.21 BNB
        </p>
        <img src="~/assets/img/swap/wallet/swap_refresh_btn.svg" alt="swap_refresh_btn">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SwapBitKeepSwap',
  data() {
    return {
      flag: true,
      switchBtnSrc: require('~/assets/img/swap/switch_btn_icon.svg'),
      chainList: ['Ethereum ', 'Polygon', 'ujjnn', 'chen', 'peng']
    }
  },
  mounted() {
  }
}
</script>
<style lang="less" scoped>
.swap-deal{
  width:100%;
  border-top: 1px solid #F2F2F5;
  box-sizing: border-box;
  nav{
    height:40px;
    padding:9px 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid#F8F8F9;
    font-size:14px;
    p{
      font-weight: 600;
    }
    img{
      cursor: pointer;
      width:24px;
      height:24px;
    }
    img:first-child{
      margin-right:20px;
    }
  }
  .swap-content{
    padding: 12px 18px;
    width:100%;
    box-sizing: border-box;
    .swap-title{
      font-size: 12px;
      line-height: 16px;
      font-weight: 500;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom:12px;
    }
    .chain-list{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom:20px;
      box-sizing: border-box;
      .left-chain{
        border: 1px solid #F2F2F5;
        // padding:8px;
        border-radius: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        height:40px;
        cursor: pointer;
        img:first-child{
          width:24px;
          height:24px;
        }
        img:last-child{
          width:10px;
          height:10px;
        }
        p{
          margin:0 5px;
          font-family: 'Inter';
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          line-height: 16px;
        }
      }
      .center-chain{
        width:30px;
        height:30px;
        border-radius: 50%;
        border: 1px solid #F2F2F5;
        margin: 0 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
          width:18px;
          height:18px;
        }
      }
    }
    .deal-wrap{
      position: relative;
      .switch-btn{
        position: absolute;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
        width:30px;
        height:30px;
        border-radius:50%;
        background-color: #ffffff;
        overflow: hidden;
        cursor: pointer;
        img{
          width:100%;
          height:100%;
        }
      }
      .deal-content{
        border: 1px solid #F2F2F5;
        border-radius: 6px 6px 0px 0px;
        padding:12px 10px 20px;
        margin-bottom:2px;
        box-sizing: border-box;
        .deal-line{
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          font-weight: 500;
          line-height: 16px;
          .max-btn{
            color:#7524F9;
            font-weight: 500;
            padding-left:3px;
            cursor: pointer;
          }
        }
        .deal-up{
          display: flex;
          justify-content: space-between;
          align-items: center;
          .deal-up-left{
            display: flex;
            align-items: center;
            img{
              width:32px;
              height:32px;
              margin-right:10px;
            }
          }
          .deal-up-right{
            p:first-child{
              font-size: 16px;
              font-weight: 600;
              line-height: 20px;
            }
            p:last-child{
              font-size: 12px;
              font-weight: 500;
              line-height: 16px;
            }
          }
          .deal-text{
            font-size: 20px;
            line-height: 32px;
            font-weight: 600;
          }
        }
      }
    }
    .swap-submit{
      background: #7524F9;
      border-radius: 6px;
      text-align: center;
      line-height: 44px;
      height: 44px;
      width:100%;
      font-size: 16px;
      font-weight: 600;
      color:#ffffff;
    }
  }
  .swap-tip{
    margin-top:12px;
    display: flex;
    justify-content: center;
    align-items: center;
    p{
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      white-space: nowrap;
    }
    .p-last{
      margin: 0 10px 0 16px;
    }
    img{
      width:16px;
      height:16px;
      cursor: pointer;
    }
  }
}
@media only screen and (min-width: 1220px) and (max-width: 1400px) {
  .swap-deal{
    nav{
      padding:9px 12px;
    }
    .swap-content{
      padding: 12px 10px;
      .left-chain{
        img:first-child{
          width: 18px !important;
          height: 18px !important;
        }
        height:40px !important;
        border-radius: 70px !important;
        p{
          margin: 0 2px !important;
        }
      }
      .center-chain{
        width: 30px !important;
        height: 30px !important;
      }
    }
  }
}
</style>
