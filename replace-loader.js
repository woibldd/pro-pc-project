module.exports = function(context) {
  const aa = context.replace(
    /display:block/g, 'display:none'
  )
  console.log(aa)
  return aa
}
