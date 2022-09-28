<template>
  <div class="vue-avatar--wrapper BG0" aria-hidden="true">
    <img v-show="this.isImage" style="display: none" :style="[style]" :src="src" :alt="alt" :title="title" class="lineBG2" @load="onImgLoad"
      @error="onImgError" />
    <span v-show="!this.isImage" :title="title" class="BG3 lineBG2 text4" :style="[style, customStyle]">{{ userInitial }}</span>
  </div>
</template>

<script>
const getInitials = (username) => {
  let parts = username.split(/[ -]/)
  let initials = ''

  for (var i = 0; i < parts.length; i++) {
    initials += parts[i].charAt(0)
  }

  if (initials.length > 3 && initials.search(/[A-Z]/) !== -1) {
    initials = initials.replace(/[a-z]+/g, '')
  }

  initials = initials.substr(0, 3).toUpperCase()

  return initials
}

export default {
  name: 'avatar',
  props: {
    username: {
      type: String
    },
    initials: {
      type: String
    },
    backgroundColor: {
      type: String
    },
    color: {
      type: String
    },
    customStyle: {
      type: Object
    },
    inline: {
      type: Boolean
    },
    size: {
      type: Number,
      default: 50
    },
    src: {
      type: String
    },
    rounded: {
      type: Boolean,
      default: true
    },
    lighten: {
      type: Number,
      default: 80
    },
    alt: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
  },

  data() {
    return {
      imgError: true
    }
  },
  computed: {

    isImage() {
      return !this.imgError && Boolean(this.src)
    },

    style() {
      const style = {
        display: this.inline ? 'inline-flex' : 'flex',
        minWidth: `${this.size}px`,
        width: `${this.size}px`,
        height: `${this.size}px`,
        borderRadius: this.rounded ? '50%' : 0,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        userSelect: 'none',
        border: "1px solid",
        "margin-right": "6px",
      }


      const initialBackgroundAndFontStyle = {
        color: this.fontColor
      }

      return style
    },

    userInitial() {
      if (!this.isImage) {
        const initials = this.imgDefault(this.initials)
        return initials
      }
      return ''
    }
  },

  methods: {

    onImgError(evt) {
      this.imgError = true
    },
    onImgLoad(evt) {
      this.imgError = false
    },
    imgDefault(text) {
      //中文检测
      if (text.match(/[\u4e00-\u9fa5]/g)) {
        return text.trim().slice(0, 2)
      } else {
        return text.trim().slice(0, 4).toUpperCase();
      }
    }

  }
}
</script>
<style lang="less" scoped>
.vue-avatar--wrapper{
  border-radius: 50%;
  overflow: hidden;
}
</style>
