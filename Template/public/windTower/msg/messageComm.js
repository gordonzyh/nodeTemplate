const commMsg = {
    "messages": {
        "ERR001": "测风塔编号为空",
        "ERR002": "接收时间为空",
        "ERR003": "文件位置为空或无效",
        "ERR004": "用户id为空",
        "ERR005": "文件解析异常，请检查文件格式",
        "ERR006": "文件大小不符合规定",
        "ERR007": "文件内容异常，两小时内{0}无变化",
        "ERR008": "超出规定时间未接收到邮件",
        "ERR009": "当前用户没有访问权限，请联系管理员！",
        "ERR011": "邮箱账号或密码错误！",
        "ERR012": "邮件服务器连接超时！",
        "ERR013": "上传文件存在tim格式，请输入高度后，重新上传",
        "ERR999": "系统错误，请联系管理员"
    },
    "autoUploadError": {
        "ERR005": "文件解析异常",
        "ERR006": "文件大小不符合规定",
        "ERR007": "文件内容异常",
        "ERR008": "未接收到邮件",
        "ERR011": "邮箱账号或密码错误！",
        "ERR012": "邮件服务器连接超时！"
    },
    "errorType":{
        "speed":"风速",
        "direction":"风向",
        "humidity":"温度",
        "temperature":"湿度",
        "air_pressure":"气压"
    }
};

function getMessage(msgCode) {
    return MSG_JSON.messages[msgCode];
}

function getSubJson(name){
    return MSG_JSON[name];
}