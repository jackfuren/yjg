
// 当前时间获取
function getNowTime () { 
  let date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth()+1
  if (month < 10) {
    month = '0' + month
  } 
  let day = date.getDate()
  if (day < 10) {
    day = '0' + day
  }
  let week = date.getDay()
  let hour = date.getHours()
  if (hour < 10) {
    hour = '0' + hour
  }
  let minute = date.getMinutes()
  if (minute < 10) {
    minute = '0' + minute
  }
  let second = date.getSeconds()
  if (second < 10) {
    second = '0' + second
  }
  let time = year + '-' + month + '-' + day + ' ' + '星期' + week + ' ' + hour + ':' + minute + ':' + second
  return time
}
export {
  getNowTime
}