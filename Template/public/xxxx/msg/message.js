let message = {};
const commMsg = $.extend({
    EK0001: "测风塔编号为空{0}",
    EK0002: "接收时间{0}为空{1}",
    IK0003: "adsfasfadsfadfa",
    WK0004: "adsfadaasdfdsfdsf",
}, customMsg);

message.getMessage = function (msgCode, args) {
    let msg = commMsg[msgCode];

    if (args) {
        if (!comm.isArray(args)) {
            msg = comm.replace(msg, "\\{0\\}", args)
        } else {
            for (let i = 0; i < args.length; i++) {
                msg = comm.replace(msg, "\\{" + i + "\\}", args[i])
            }
        }
    }
    return msg;
}
