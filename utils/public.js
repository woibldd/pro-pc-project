
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || 'y-M-d h:m:s'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    M: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/(y|M|d|h|m|s|a)+/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}



export const throttle = (fn, delay) => {
  var timer = null;
  var delay = delay || 300;
  return function () {
    var args = arguments;
    var that = this;
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(that, args)
    }, delay)
  }
}



export const scrollIntoView = throttle(function (scrollIntoEl) {
  console.log({scrollIntoEl})
  scrollIntoEl && scrollIntoEl.scrollIntoView &&
      scrollIntoEl.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
}, 300)