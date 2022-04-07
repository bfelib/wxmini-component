import { nextTick, getRect } from '../utils'

/**
 * @description 提示层
 */
const DEFAULT_OPTIONS = {
  title: 'Title', // 提示层标题
  description: 'Description', // 提示层描述
  showButtons: true, // 是否显示按钮
  doneBtnText: 'Done', // 结束按钮文字
  closeBtnText: 'Close', // 关闭按钮文字
  nextBtnText: 'Next', // 下一步按钮文字
  prevBtnText: 'Previous', // 上一步按钮文字
  position: 'auto', // 提示层定位 auto/top/bottom
  className: '', // 提示层自定义类名
}

export default class Popover {
  constructor({ options, context, driver } = {}) {
    this.options = {
      ...DEFAULT_OPTIONS,
      ...options,
    }
    this.context = context
    this.driver = driver
  }

  /**
   * @description 显示
   */
  show(elementRect) {
    this.driver.setData({
      popoverStyle: {
        display: 'block',
        opacity: 0,
      },
      popoverOptions: this.options,
    })

    nextTick(() => {
      this.getSize().then((popoverRect) => {
        switch (this.options.position) {
          case 'top':
            this.positionOnTop(elementRect, popoverRect)
            break
          case 'bottom':
            this.positionOnBottom(elementRect, popoverRect)
            break
          case 'auto':
          default:
            this.autoPosition(elementRect, popoverRect)
            break
        }
      })
    })
  }

  /**
   * @description 隐藏
   */
  hide() {
    this.driver.setData({
      popoverStyle: {
        display: 'none',
      },
    })
  }

  /**
   * @description 获取提示框大小
   */
  getSize() {
    return getRect(this.driver, '.driver-popover-item')
  }

  /**
   * @description 定位提示框位置
   */
  autoPosition(elementRect, popoverRect) {
    // 如果元素底部的距离 + 提示层高度 > 滚动区域可视区域的高度
    if (elementRect.bottom + popoverRect.height + 10 > elementRect.viewHeight) {
      this.positionOnTop(elementRect, popoverRect)
    } else {
      this.positionOnBottom(elementRect, popoverRect)
    }
  }

  positionOnTop(elementRect, popoverRect) {
    this.driver.setData({
      popoverStyle: {
        display: 'block',
        opacity: 1,
        top: `${elementRect.top + elementRect.scrollTop - popoverRect.height - 10}px`,
      },
      popoverTipStyle: {
        left: `${elementRect.width / 2 + elementRect.left - popoverRect.left - 5}px`,
      },
      popoverTipClass: 'bottom',
    })
  }

  positionOnBottom(elementRect, popoverRect) {
    this.driver.setData({
      popoverStyle: {
        display: 'block',
        opacity: 1,
        top: `${elementRect.top + elementRect.scrollTop + elementRect.height + 10}px`,
      },
      popoverTipStyle: {
        left: `${elementRect.width / 2 + elementRect.left - popoverRect.left - 5}px`,
      },
      popoverTipClass: 'top',
    })
  }
}
