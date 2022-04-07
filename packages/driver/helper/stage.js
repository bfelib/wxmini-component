/**
 * @description 裁剪层
 */
export default class Stage {
  constructor({ options, context, driver } = {}) {
    this.options = options
    this.context = context
    this.driver = driver
  }

  /**
   * @description 显示
   */
  show(elementRect) {
    this.driver.setData({
      stageStyle: {
        display: 'block',
        width: `${elementRect.width}px`,
        height: `${elementRect.height}px`,
        top: `${elementRect.top + elementRect.scrollTop}px`,
        left: `${elementRect.left}px`,
        background: this.options.stageBackground,
      },
    })
  }

  /**
   * @description 隐藏
   */
  hide() {
    this.driver.setData({
      stageStyle: {
        display: 'none',
      },
    })
  }
}
