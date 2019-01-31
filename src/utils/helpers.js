export function querystringToObject(data) {
  return data.split('&').reduce((obj, el) => {
    const split = el.split('=')
    if (split.length < 2) return null
    obj[split[0].replace(/\s+/g, '')] = split[1].trim()
    return obj
  }, {})
}
