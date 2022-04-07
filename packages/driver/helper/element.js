import { getRect, getViewportRect, getViewportScroll } from '../utils'

/**
 * @description 元素层
 */
export default class Element {
  constructor({ options, context, driver, node, stage, popover, overlay } = {}) {
    this.options = options
    this.context = context
    this.driver = driver
    this.node = node
    this.stage = stage
    this.popover = popover
    this.overlay = overlay
  }

  /**
   * @description 显示
   */
  show() {
    this.node.setData({
      className: 'driver-highlighted-element driver-position-relative',
    })
  }

  /**
   * @description 隐藏
   */
  hide() {
    this.node.setData({
      className: '',
    })
  }

  /**
   * @description 获取元素定位
   */
  getCalculatedPosition() {
    return new Promise((resolve) => {
      Promise.all([
        getRect(this.node, '.driver-item'),
        getViewportRect(this.context, this.options.element),
        getViewportScroll(this.context, this.options.element),
      ]).then(([rect, viewRect, viewScroll]) => {
        resolve({
          ...rect,

          viewBottom: viewRect.bottom,
          viewHeight: viewRect.height,
          viewLeft: viewRect.left,
          viewRight: viewRect.right,
          viewTop: viewRect.top,
          viewWidth: viewRect.width,

          scrollHeight: viewScroll.scrollHeight,
          scrollLeft: viewScroll.scrollLeft,
          scrollTop: viewScroll.scrollTop,
          scrollWidth: viewScroll.scrollWidth,
        })
      })
    })
  }
}
