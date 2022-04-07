import Driver from '../../../dist/driver/Driver'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    driver: null,
  },

  /**
   * 开始
   */
  start() {
    const driver = this.data.driver

    driver.defineSteps([
      {
        element: '#step-1',
        popover: {
          title: '标题 1',
          description: '描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述',
        },
      },
      {
        element: '#step-2',
        popover: {
          title: '标题 2',
          description: '描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述',
        },
      },
      {
        element: '#step-3',
        popover: {
          title: '标题 3',
          description: '描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述',
        },
      },
    ])

    driver.start()
  },
  startInput() {
    const driver = this.data.driver

    driver.highlight({
      element: '#step-4',
      popover: {
        title: '标题 4',
        description: '描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述',
        showButtons: false,
        className: 'custom-class',
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.data.driver = new Driver({
      closeBtnText: '关闭',
      nextBtnText: '下一步',
      prevBtnText: '上一步',
      doneBtnText: '结束',
      showButtons: true,
      onNext(element) {
        console.log('next', element)
      },
      onPrevious(element) {
        console.log('prev', element)
      },
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
})
