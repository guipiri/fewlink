export const getBrowserByUserAgent = (userAgent: string): string => {
  let browser: string = 'undefined'
  if (userAgent.indexOf('Chrome') > -1) {
    browser = 'Google Chrome'
  } else if (userAgent.indexOf('Safari') > -1) {
    browser = 'Apple Safari'
  } else if (userAgent.indexOf('Opera') > -1) {
    browser = 'Opera'
  } else if (userAgent.indexOf('Firefox') > -1) {
    browser = 'Mozilla Firefox'
  } else if (userAgent.indexOf('MSIE') > -1) {
    browser = 'Microsoft Internet Explorer'
  }
  return browser
}
