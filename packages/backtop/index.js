Component({
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  properties: {
    height: {
      type: String,
      value: '100vh',
    },
    right: {
      type: Number,
      value: '40rpx',
    },
    bottom: {
      type: Number,
      value: '80rpx',
    },
    zIndex: {
      type: Number,
      value: 10,
    },
    distance: {
      type: Number,
      value: 200,
    },
  },
  data: {
    isBack: false,
    scrollTop: 0,
  },
  methods: {
    click(e) {
      this.setData({
        scrollTop: 0,
      })
      this.triggerEvent('click', e)
    },
    scroll(e) {
      const isBack = e.detail.scrollTop > this.data.distance
      if (this.data.isBack !== isBack) {
        this.setData({ isBack })
      }
    },
  },
})
