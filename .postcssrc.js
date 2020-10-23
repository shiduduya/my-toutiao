module.exports = {
    plugins: {
        //  不转换行内样式
        'postcss-pxtorem': {
            rootValue({ file }) {
                // 不同文件草稿大小不一样
                // vant草稿图375
                // 项目草稿图750
                return file.indexOf('vant') !== -1 ? 37.5 : 75
            },
            // 设置转换的样式
            propList: ['*'],
        },
    },
};