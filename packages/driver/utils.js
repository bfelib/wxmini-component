export function getContext() {
  const pages = getCurrentPages()
  return pages[pages.length - 1]
}

export function nextTick(cb) {
  if (wx.canIUse('nextTick')) {
    wx.nextTick(cb)
  } else {
    setTimeout(() => {
      cb()
    }, 1000 / 30)
  }
}

export function getRect(context, selector) {
  return new Promise((resolve) => {
    wx.createSelectorQuery()
      .in(context)
      .select(selector)
      .boundingClientRect()
      .exec((rect = []) => resolve(rect[0]))
  })
}

export function getAllRect(context, selector) {
  return new Promise((resolve) => {
    wx.createSelectorQuery()
      .in(context)
      .selectAll(selector)
      .boundingClientRect()
      .exec((rect = []) => resolve(rect[0]))
  })
}

// TODO: scroll-view support
export function getViewportRect(context, selector) {
  return new Promise((resolve) => {
    wx.createSelectorQuery()
      .selectViewport()
      .boundingClientRect()
      .exec((rect = []) => resolve(rect[0]))
  })
}

// TODO: scroll-view support
export function getViewportScroll(context, selector) {
  return new Promise((resolve) => {
    wx.createSelectorQuery()
      .selectViewport()
      .scrollOffset()
      .exec((rect = []) => resolve(rect[0]))
  })
}

// TODO: scroll-view support
export function scrollIntoView(context, selector) {
  wx.pageScrollTo({
    selector,
    duration: 0,
  })
}
