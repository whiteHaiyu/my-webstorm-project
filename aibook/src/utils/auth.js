import Cookies from 'js-cookie'

const TokenKey = "User-Token"

export function getToken() {
    return Cookies.get(TokenKey)
}

//存储token，设置过期时间1小时
export function setToken(token) {
    return Cookies.set(TokenKey, token, { expires: 1/24 })
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}