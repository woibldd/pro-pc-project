import apis from '@/api/index'
export default (ctx, inject) => {
  let apiObject = {}
  for (let i in apis) {
    apiObject[i] = apis[i](ctx.$axios)
  }
  inject('api', apiObject)
}
