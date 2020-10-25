// 导入请求示例
import request from '@/utils/request.js'

// 按需导出登陆请求
export const login = data => {
    return request({
        method: 'post',
        url: '/app/v1_0/authorizations',
        data
    })
}

// 获取验证码的请求
export const sendSms = mobile => {
    return request({
        method: 'get',
        url: `/app/v1_0/sms/codes/${mobile}`
    })
}