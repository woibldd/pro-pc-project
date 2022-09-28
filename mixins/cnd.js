export default {
  components: {
    "remote-js": {
      render(createElement) {
        let that = this;
        return createElement("script", {
          attrs: {
            type: "text/javascript",
            src: this.cdn,
          },
          on: {
            load: () => that.$emit('load')
          },
        });
      },
      props: {
        cdn: {
          type: String,
          required: true,
        },
      },
    },
    "remote-css": {
      render(createElement) {
        return createElement("link", {
          attrs: {
            rel: "stylesheet",
            type: "text/css",
            href: this.cdn,
          },
        });
      },
      props: {
        cdn: {
          type: String,
          required: true,
        },
      },
    },
  },
};
