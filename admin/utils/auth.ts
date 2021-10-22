
//关于权限的一些方法
import Cookies from 'js-cookie'

export const TokenKey = 'Koa-Admin-Token'
export const UserInfoKey = 'Koa-Admin-UserInfo'
export const DeviceNoKey = 'Koa-Admin-DeviceNo'

export function getToken() {
    return Cookies.get(TokenKey)
}
export function setToken(token: string) {
    return Cookies.set(TokenKey, token, { expires: new Date(new Date().getTime() + 5 * 60 * 60 * 1000) })
}
export function removeToken() {
    return Cookies.remove(TokenKey)
}

export function getUserInfo() {
    const userInfo = decodeURIComponent(Cookies.get(UserInfoKey))

    if(userInfo !== null && userInfo) {
        return JSON.parse(userInfo)
    }

    return {}
}

export function setUserInfo(userInfo: any) {
    return Cookies.set(UserInfoKey, encodeURIComponent(JSON.stringify(userInfo)), { expires: new Date(new Date().getTime() + 5 * 60 * 60 * 1000) })
}
export function removeUserInfo() {
    return Cookies.remove(UserInfoKey)
}

/**
 * 
 * 全部删除
 */
export function removeAll() {
    removeToken()
    removeUserInfo()
}


// //关于权限的一些方法
// import Cookies from 'js-cookie'
// import { decryptByDes, encryptByDes } from './crypto'

// export const TokenKey = 'M-Admin-Token'
// export const UserInfoKey = 'M-Admin-UserInfo'
// export const EnumsKey = 'M-Admin-Enum'
// export const DeviceNoKey = 'M-Admin-DeviceNo'

// export function getToken() {
//     return Cookies.get(TokenKey)
// }
// export function setToken(token) {
//     return Cookies.set(TokenKey, token, { expires: new Date(new Date().getTime() + 5 * 60 * 60 * 1000) })
// }
// export function removeToken() {
//     return Cookies.remove(TokenKey)
// }

// export function getDeviceNoKey() {
//     return Cookies.get(DeviceNoKey)
// }
// export function setDeviceNoKey(deviceNo) {
//     return Cookies.set(DeviceNoKey, deviceNo, { expires: new Date(new Date().getTime() + 5 * 60 * 60 * 1000) })
// }
// export function removeDeviceNoKey() {
//     return Cookies.remove(DeviceNoKey)
// }

// export function getUserInfo() {
//     const userInfo = decryptByDes(decodeURIComponent(Cookies.get(UserInfoKey)))

//     if(userInfo !== null && userInfo) {
//         return JSON.parse(userInfo)
//     }

//     return {}
// }

// export function setUserInfo(userInfo) {
//     return Cookies.set(UserInfoKey, encodeURIComponent(encryptByDes(JSON.stringify(userInfo))), { expires: new Date(new Date().getTime() + 5 * 60 * 60 * 1000) })
// }
// export function removeUserInfo() {
//     return Cookies.remove(UserInfoKey)
// }

// export function getEnums() {
//     const enums = Cookies.get(EnumsKey)

//     if(enums !== null) {
//         return JSON.parse(enums)
//     }

//     return {}
// }

// export function setEnums(Enums) {
//     return Cookies.set(EnumsKey, JSON.stringify(Enums), { expires: new Date(new Date().getTime() + 5 * 60 * 60 * 1000) })
// }

// export function removeEnums() {
//     return Cookies.remove(EnumsKey)
// }

// /**
//  * 
//  * 全部删除
//  */
// export function removeAll() {
//     removeToken()
//     removeUserInfo()
//     removeEnums()
//     removeDeviceNoKey()
// }