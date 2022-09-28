<template>
  <div class="footer-container">

    <div class="account-list" >
      <div class="account-left">
        <a href="https://bitkeep.com/">
                <img src="../../assets/img/header/BK logo_dark.svg"
                    alt="BitKeep,  a best crypto wallet" class="BitkeepLogo_dark">
        </a>
      </div>
      <ul flex="right">
        <li class="telebox">
            <a href="https://t.me/bitkeep" target="_blank"><img src="../../assets/img/icon/telegram_logo.png" alt="Bitkeep's official Telegram account"></a>
        </li>
        <li><a href="https://twitter.com/BitKeepOS" target="_blank"><img src="../../assets/img/icon/twitter_logo.png" alt="Bitkeep's official Twitter account"></a></li>
        <li><a href="https://medium.com/@bitkeepblog" target="_blank"><img src="../../assets/img/icon/medium_logo.png" alt="Bitkeep's official Medium account"></a></li>
        <li><a href="https://www.youtube.com/c/BitKeepWallet" target="_blank"><img src="../../assets/img/icon/youtube_logo.png" alt="Bitkeep's official youtube account"></a></li>
        <li><a href="https://github.com/bitkeepwallet/download" target="_blank"><img src="../../assets/img/icon/github_logo.png" alt="Bitkeep's official GitHub account"></a></li>
        <li><a href="https://discord.gg/qYTatUzNjM" target="_blank"><img src="https://cdn.bitkeep.vip/u_b_e6975620-1cec-11ec-b749-09299a4f8b9a.png" alt="Bitkeep's official Discord account"></a></li>
        <li><a href="https://instagram.com/bitkeep_global?igshid=YmMyMTA2M2Y=" target="_blank"><img src="../../assets/img/icon/ins.png" alt="Bitkeep's official instagram account"></a></li>
        <li><a href="https://www.facebook.com/BitKeep" target="_blank"><img src="../../assets/img/icon/facebook_logo.png" alt="Bitkeep's official facebook account"></a></li>
      </ul>
    </div>
  </div>
</template>

<script> 
export default {

} 
</script>

<style lang="less" scoped>
.footer-container {
  height: 200px;
  background: #17171A; 
  .account-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    height: 200px;
    width: 1530px;
    ul {
      li {
        &:not(:last-child) {
          margin-right: 28px;
        }
        img {
          width: 20px;
        }
      }
    }
  }
}

@media screen and (min-width: 1570px) {  
  .footer-container { 
    .account-list { 
      width: 1530px; 
    }
  }
}
@media screen and (max-width: 1569px) and (min-width: 800px) {
  .footer-container { 
    .account-list {
      padding: 0 20px;
      width: 100%; 
      box-sizing: border-box;
    }
  }
}
@media screen and (max-width: 799px)  { 
  .footer-container { 
    height: 160px;
    .account-list {
      display: block; 
      box-sizing: border-box;
      padding: 40px 20px;
      height: 160px;
      width: 100%; 
      box-sizing: border-box;
    }
    ul {
      margin-top: 20px;
    }
  }
}
</style>
