// 授权相关模块
// 把所有 token 操作都放到这里
// auth.getToken()
// auth.isLogin
// auth.saveToken()

const tokenName = 'bxg-token'

export function getToken() {
  const parsedObj = JSON.parse(window.localStorage.getItem(tokenName))
  // 如果没有 bxg-token 直接返回空字符串
  if (!parsedObj) {
    return ''
  }

  console.log(parsedObj.token)

  // 正常返回对象中的 token
  return parsedObj.token
}

export function isLogin() {}

export function saveToken(obj) {
  window.localStorage.setItem(tokenName, JSON.stringify(obj))
}
