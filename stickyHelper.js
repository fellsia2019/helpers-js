export default function (container, block, withHeaderHeight = true, stopBlock) {
  if (!container || !block) {
    return
  }

  let isFixed = false

  const headerHeight = withHeaderHeight
    ? Number.parseInt(
        document.documentElement.style.getPropertyValue('--header-height'),
        10
      )
    : 0

  const { top: containerTop, bottom: containerBottom } =
    container.getBoundingClientRect()
  const { height: blockHeight } = container.getBoundingClientRect()

  const stopBottom = stopBlock
    ? stopBlock.getBoundingClientRect().bottom
    : Number.POSITIVE_INFINITY

  const conditionFixed = containerTop - headerHeight <= 0
  const conditionEndFixed = stopBottom - headerHeight - blockHeight <= 0

  container.style.minHeight = `${blockHeight}px`
  block.style.top = withHeaderHeight ? 'var(--header-height)' : 0

  if (conditionFixed && !conditionEndFixed) {
    isFixed = true
    block.style.position = 'fixed'
    block.style.transform = ''
  } else if (conditionEndFixed) {
    isFixed = false
    block.style.position = 'relative'
    block.style.transform = `translateY(${Math.round(
      Math.abs(containerBottom - stopBottom) - headerHeight
    )}px)`
  } else {
    isFixed = false
    block.style.position = 'static'
    block.style.transform = ''
  }

  return isFixed
}
