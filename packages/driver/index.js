Component({
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  data: {
    overlayStyle: {},

    stageStyle: {},

    popoverStyle: {},
    popoverOptions: {},

    popoverTipStyle: {},
    popoverTipClass: '',

    closeCallback() {},

    moveNextCallback() {},
    movePreviousCallback() {},

    clickOverlayCallback() {},
  },
  methods: {
    close() {
      this.data.closeCallback()
    },
    moveNext() {
      this.data.moveNextCallback()
    },
    movePrevious() {
      !this.data.popoverOptions.isFirst && this.data.movePreviousCallback()
    },
    clickOverlay() {
      this.data.clickOverlayCallback()
    },
  },
})
