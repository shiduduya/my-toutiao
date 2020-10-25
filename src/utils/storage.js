// 本地存储操作模块
// 1.获取数据
export const getItem = key => {
    const data = localStorage.getItem(key)
    try {
        // 获取数据成功之后，将数据转换为字符串类型
        return JSON.stringify(data)
    } catch (err) {
        return data
    }
}
// 2.保存数据
export const setItem = (key, data) => {
    if (typeof data === 'object') {
        data = JSON.stringify(data)
    }
    localStorage.setItem(key, data)
}
// 3.删除数据
export const removeItem = key => {
    localStorage.removeItem(key)
}