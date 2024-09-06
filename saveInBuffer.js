function unsecuredCopyToClipboard(text) {
  const element = document.createElement('div')
  element.textContent = text
  document.style =
    'position: fixed; opacity: 0; left: 50%; top: 50%; height: 1px; width: 1px; pointer-events: none; touch-action: none;'
  document.body.append(element)

  const range = document.createRange()
  range.selectNode(element)

  const selection = window.getSelection()
  selection.removeAllRanges()
  selection.addRange(range)

  try {
    document.execCommand('copy')
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('unsecuredCopyToClipboard: Unable to copy to clipboard', error)
  } finally {
    selection.removeAllRanges()
    element.remove()
  }
}

export default content => {
  try {
    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(content)
    } else {
      unsecuredCopyToClipboard(content)
    }
    return true
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('saveInBuffer: Unable to copy to clipboard', error)
    return false
  }
}
