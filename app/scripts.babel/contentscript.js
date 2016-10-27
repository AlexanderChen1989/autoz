const zoom = () => {
  chrome.storage.local.get(
    null,
    ({zoom, autoResize}) => {
      if (!autoResize || !zoom) {
        return
      }
      document.body.parentElement.style.zoom = `${zoom}%`
    }
  )
}

chrome.storage.local.get('autoResize', ({autoResize}) => {
  if (autoResize) {
    zoom()
  }
})
