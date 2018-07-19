let customContexts = require('./customContext').contexts;
let objAssign = require('object-assign');
let contexts = objAssign({
    // "autoUploadError": {
    //     "1": "文件解析异常",
    //     "2": "文件大小不符合规定",
    //     "3": "文件内容异常",
    //     "4": "未接收到邮件",
    //     "5": "邮箱账号或密码错误！",
    //     "6": "邮件服务器连接超时！"
    // },
}, customContexts);

exports.contexts = contexts;