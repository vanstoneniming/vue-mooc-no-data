export function sanitizeHTML (html: string, removeImages = false): string {
  const attributesToRemove = [
    'contenteditable',
    'data-editor',
    'data-block',
    'data-offset-key',
    'data-original-src',
    'data-watermark',
    'data-size',
    'data-watermark-src',
    'alt',
    'data-rawheight',
    'data-rawwidth',
    'style',
    'lang',
    'span'
  ]

  // Create a container element and set its HTML content
  const container = document.createElement('div')
  container.innerHTML = html

  // Remove attributes from all elements
  const elements = container.querySelectorAll('*')
  elements.forEach((element) => {
    attributesToRemove.forEach((attribute) => {
      element.removeAttribute(attribute)
    })
  })

  // Remove img elements if removeImages is true
  if (removeImages) {
    const imgElements = container.querySelectorAll('img')
    imgElements.forEach((imgElement) => {
      imgElement.remove()
    })
  }

  // Return the sanitized HTML
  return container.innerHTML
}

export function formatFileSize (bytes: number): string {
  if (bytes === 0) return '0 B'

  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const digitGroups = Math.floor(Math.log(bytes) / Math.log(1024))

  return `${(bytes / Math.pow(1024, digitGroups)).toFixed(2)} ${units[digitGroups]}`
}

export function shortenText (text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text // 如果文本长度小于或等于最大长度，直接返回原文本
  } else {
    // 计算在中间添加省略号的位置
    const ellipsisIndex = Math.floor(maxLength / 2)
    const firstPart = text.slice(0, ellipsisIndex)
    const secondPart = text.slice(text.length - ellipsisIndex)
    return firstPart + '...' + secondPart // 返回缩短后的文本，中间添加省略号
  }
}
