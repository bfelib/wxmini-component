import Stage from './helper/stage'
import Overlay from './helper/overlay'
import Popover from './helper/popover'
import Element from './helper/element'
import { getContext, nextTick, scrollIntoView } from './utils'

/**
 * @description Driver
 */
const DEFAULT_OPTIONS = {
  selector: '#driver', // 容器组件ID
  animate: true, // 是否开启动画
  opacity: 0.75, // 遮罩层背景透明度
  allowClose: true, // 点击遮罩层是否关闭
  stageBackground: '#ffffff', // 裁剪层背景颜色
  doneBtnText: 'Done', // 结束按钮文字
  closeBtnText: 'Close', // 关闭按钮文字
  nextBtnText: 'Next', // 下一步按钮文字
  prevBtnText: 'Previous', // 上一步按钮文字
  showButtons: false, // 是否显示按钮
  className: '', // 提示层自定义类名
  onReset: (element) => null, // 关闭时事件回调
  onHighlighted: (element) => null, // 当前正在突出显示时事件回调
  onNext: (element) => null, // 点击下一步事件回调
  onPrevious: (element) => null, // 点击上一步事件回调
}

export default class Driver {
  constructor(options = {}) {
    this.options = {
      ...DEFAULT_OPTIONS,
      ...options,
    }

    // 初始化步骤
    this.steps = []
    this.currentStep = 0
    this.currentElement = null

    // 获取组件上下文和组件事件建立关联
    this.context = getContext()
    this.driver = this.context.selectComponent(this.options.selector)
    if (!this.driver) {
      console.error(`Driver ${this.options.selector} not found`)
      return
    } else {
      this.setEventCallBack()
    }

    // 初始化遮罩层
    this.overlay = new Overlay({
      options: this.options,
      context: this.context,
      driver: this.driver,
    })
  }

  /**
   * 设置事件回调与小程序组件关联
   * @private
   */
  setEventCallBack() {
    this.driver.setData({
      closeCallback: this.reset.bind(this),
      moveNextCallback: this.moveNext.bind(this),
      movePreviousCallback: this.movePrevious.bind(this),
      clickOverlayCallback: this.clickOverlay.bind(this),
    })
  }

  /**
   * 创建一个步骤实例
   * @param currentStep 当前步骤配置
   * @param allSteps 步骤列表
   * @param index 当前步骤的索引
   * @returns {null|Element}
   * @private
   */
  prepareElementFromStep(currentStep, allSteps = [], index = 0) {
    // 合并全局配置和步骤配置
    const elementOptions = {
      ...this.options,
      ...currentStep,
    }

    // 获取子组件实例对象
    const node = this.context.selectComponent(elementOptions.element)
    if (!node) {
      console.error(`Driver Item ${elementOptions.element} not found`)
      return null
    }

    // 是否显示提示层、获取提示层配置
    let popover = null
    if (elementOptions.popover && elementOptions.popover.title) {
      const popoverOptions = {
        ...elementOptions,
        ...elementOptions.popover,
        totalCount: allSteps.length,
        currentIndex: index,
        isFirst: index === 0,
        isLast: allSteps.length === 0 || index === allSteps.length - 1,
      }

      popover = new Popover({
        options: popoverOptions,
        context: this.context,
        driver: this.driver,
      })
    }

    // 裁剪层实例
    const stage = new Stage({
      options: elementOptions,
      context: this.context,
      driver: this.driver,
    })

    // 元素层实例
    const element = new Element({
      options: elementOptions,
      context: this.context,
      driver: this.driver,
      node,
      stage,
      popover,
      overlay: this.overlay,
    })

    return element
  }

  /**
   * 显示高亮元素，组合各个模块
   * @private
   */
  showHighlightElement(element) {
    // 清除上一个的元素状态
    this.currentElement && this.currentElement.hide()

    // 显示元素层
    element.show()

    // 先把提示层隐藏掉
    element.popover && element.popover.hide()

    nextTick(() => {
      element.getCalculatedPosition().then((rect) => {
        // 预留空白位置
        const padding = (rect.viewHeight - rect.height) / 4

        // 如果不全在可视范围内，把元素层滚动到可视区域居中位置
        if (rect.bottom > rect.viewHeight) {
          scrollIntoView(null, rect.bottom + rect.scrollTop - padding)
        } else if (rect.top <= 0) {
          scrollIntoView(null, rect.top + rect.scrollTop - padding)
        }

        // 由于元素发生了移动重新获取位置
        element.getCalculatedPosition().then((rect) => {
          // 根据元素层的位置信息移动到遮罩层和裁剪层
          element.stage && element.stage.show(rect)
          element.overlay && element.overlay.show(rect)

          // 当移动动画执行完毕后再显示提示层，第一次加载不延迟
          if (this.currentElement) {
            setTimeout(() => {
              element.popover && element.popover.show(rect)
            }, 300)
          } else {
            element.popover && element.popover.show(rect)
          }

          this.currentElement = element

          // dispath onHighlighted event
          if (this.currentElement && this.currentElement.options.onHighlighted) {
            this.currentElement.options.onHighlighted(this.currentElement)
          }
        })
      })
    })
  }

  /**
   * 隐藏高亮元素，组合各个模块
   * @private
   */
  hideHighlightElement() {
    const element = this.currentElement || {}

    // 隐藏全部的层结构
    element.hide && element.hide()
    element.stage && element.stage.hide()
    element.popover && element.popover.hide()
    element.overlay && element.overlay.hide()

    // dispath onReset event
    if (this.currentElement && this.currentElement.options.onReset) {
      this.currentElement.options.onReset(this.currentElement)
    }

    this.currentElement = null
  }

  /**
   * 点击遮罩层
   * @private
   */
  clickOverlay() {
    this.options.allowClose && this.reset()
  }

  /**
   * 定义步骤
   * @param { Array } steps
   * @public
   */
  defineSteps(steps) {
    this.steps = []

    for (let counter = 0; counter < steps.length; counter++) {
      const element = this.prepareElementFromStep(steps[counter], steps, counter)
      if (!element) {
        continue
      }

      this.steps.push(element)
    }
  }

  /**
   * 获取步骤
   * @readonly
   * @public
   */
  getSteps() {
    return this.steps
  }

  /**
   * 是否可以下一步
   * @returns {boolean}
   * @public
   */
  hasNextStep() {
    return !!this.steps[this.currentStep + 1]
  }

  /**
   * 是否可以上一步
   * @returns {boolean}
   * @public
   */
  hasPreviousStep() {
    return !!this.steps[this.currentStep - 1]
  }

  /**
   * 移动到下一个
   * @public
   */
  moveNext() {
    // dispath onNext event
    if (this.currentElement && this.currentElement.options.onNext) {
      this.currentElement.options.onNext(this.currentElement)
    }

    const nextStep = this.steps[this.currentStep + 1]
    if (!nextStep) {
      this.reset()
      return
    }

    this.showHighlightElement(nextStep)
    this.currentStep += 1
  }

  /**
   * 移动到上一个
   * @public
   */
  movePrevious() {
    // dispath onPrevious event
    if (this.currentElement && this.currentElement.options.onPrevious) {
      this.currentElement.options.onPrevious(this.currentElement)
    }

    const previousStep = this.steps[this.currentStep - 1]
    if (!previousStep) {
      this.reset()
      return
    }

    this.showHighlightElement(previousStep)
    this.currentStep -= 1
  }

  /**
   * 从指定索引开始
   * @param {number} index
   * @public
   */
  start(index = 0) {
    if (!this.steps || this.steps.length === 0) {
      throw new Error('There are no steps defined to iterate')
    }

    this.currentStep = index
    this.showHighlightElement(this.steps[index])
  }

  /**
   * 重置
   * @public
   */
  reset() {
    this.currentStep = 0
    this.hideHighlightElement()
  }

  /**
   * 高亮指定的元素
   * @param {string|{element: string, popover: {}}} selector
   * @public
   */
  highlight(selector) {
    const element = this.prepareElementFromStep(selector)
    if (!element) {
      return
    }

    this.showHighlightElement(element)
  }
}
