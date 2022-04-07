/**
 * @description 遮罩层
 */
export default class Overlay {
  constructor({ options, context, driver } = {}) {
    this.options = options
    this.context = context
    this.driver = driver
  }

  /**
   * @description 显示
   */
  show() {
    this.driver.setData({
      overlayStyle: {
        display: 'block',
        opacity: this.options.opacity,
      },
    })
  }

  /**
   * @description 隐藏
   */
  hide() {
    this.driver.setData({
      overlayStyle: {
        display: 'none',
      },
    })
  }
}
