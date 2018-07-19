/**
 * 通用方法
 */
let config = require("../../config/config").config;
let _this = this;
exports.boundAppsUrl = function (app, url, func, options) {
    let boundUrl = '/' + config.projectInfo.projectName + (url ? "/" + url : "");
    if (options["submitTpe"].toLocaleLowerCase()==="post"){
        app.post(boundUrl, func);
    }else if (options["submitTpe"].toLocaleLowerCase()==='get'){
        app.get(boundUrl, func);
    }
};
exports.boundScksMsg = function (cli, msg, callback, options) {
    cli.on(msg, function (cdata) {
        callback(cdata, cli);
    });
};

// 获取socket路径(子工程需要在config.json里配置PATH属性)
exports.getSocketURL = function getSocketURL(req) {
    let socketUrl;
    if (_this.isEmpty(config.socket)) {
        console.log.writeWarn("请检查配置文件中是否配置socket的ip和端口！");
        socketUrl = null;
    } else {
        socketUrl = config.socket.serviceType + "://" + config.socket.IP + ":" + config.socket.PORT;
        if (!_this.isEmpty(config.socket.PATH)) {
            socketUrl += config.socket.PATH;
        }
    }
    return socketUrl;
}

exports.isEmptyObject = function (obj) {
    let name;
    for (name in obj) {
        return false;
    }
    return true;
}

exports.toFix = function (obj, num) {
    let result = obj;
    try {
        if (!isEmpty(obj)) {
            obj = parseFloat(obj).toFixed(num);
            if (!isNaN(obj)) {
                result = obj;
            }
        }
    } catch (e) {
        console.log("2ztoFix error obj=" + obj + " num=" + num + "-->" + e);
    }
    return result;
}

exports.isNull = function isNull(obj) {
    return undefined == obj || null == obj;
}

exports.isEmpty = function (obj) {
    return undefined == obj || null == obj || "" == obj || "undefined" == obj;
};

exports.dateAddDays = function (date, addDays) {
    return date.add({days: addDays});
};

exports.compareTo = function (date1, date2) {
    return date1.compareTo(date2);
};

exports.dateIsBefore = function (date1, date2) {
    return date1.isBefore(date2);
};
exports.dateIsBeforeOrEquals = function (date1, date2) {
    return date1.isBefore(date2) || date1.equals(date2);
};

function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n
}

exports.formatDate = function (date, format) {
    var formateArr = [];
    var returnArr = [];

    if (format.indexOf('YYYY') >= 0) {
        returnArr.push(date.getFullYear());
        formateArr.push('YYYY')
    } else if (format.indexOf('YY') >= 0) {
        returnArr.push(date.getFullYear().toString().substr(2, 2));
        formateArr.push('YY')
    }

    if (format.indexOf('MM') >= 0) {
        returnArr.push(formatNumber(date.getMonth() + 1));
        formateArr.push('MM')
    }

    if (format.indexOf('DD') >= 0) {
        returnArr.push(formatNumber(date.getDate()));
        formateArr.push('DD')
    }

    if (format.indexOf('HH') >= 0) {
        returnArr.push(formatNumber(date.getHours()));
        formateArr.push('HH')
    } else if (format.indexOf('hh') >= 0) {
        var hours = formatNumber(date.getHours());

        if (hours > 12) {
            hours = hours - 12;
        }
        returnArr.push(formatNumber(hours));
        formateArr.push('hh')

    }

    if (format.indexOf('mm') >= 0) {
        returnArr.push(formatNumber(date.getMinutes()));
        formateArr.push('mm')
    }

    if (format.indexOf('ss') >= 0) {
        returnArr.push(formatNumber(date.getSeconds()));
        formateArr.push('ss')
    }

    for (var i = 0; i < returnArr.length; i++) {
        format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
}

exports.currentYear = function (date, format) {
    let curDate = new Date();
    return _this.formatDate(curDate, 'YYYY');
}

exports.lastMonth = function (date, format) {
    let curDate = new Date();
    let vYear = curDate.getFullYear();
    let vMon = curDate.getMonth();
    if (vMon == 0) {
        return (vYear - 1) + '12';
    }
    return vYear + '' + (vMon < 10 ? '0' + vMon : vMon);
}
//sortType =1 升序 =-1降序
exports.objArraySort = function (arr, sortKey, sortType) {
    if (!_this.isArray(sortKey)) {
        arr.sort(function (t1, t2) {
            if (t1[sortKey] === t2[sortKey]) {
                return 0;
            } else if (t1[sortKey] > t2[sortKey]) {
                return 1 * sortType;
            } else {
                return -1 * sortType;
            }
        });
    } else {
        arr.sort(function (t1, t2) {
            return compary(t1, t2, sortKey, sortType, 0);
        });
    }
};

function compary(t1, t2, sortKey, sortType, sortIndex) {
    if (t1[sortKey[sortIndex]] > t2[sortKey[sortIndex]]) {
        return 1 * sortType[sortIndex]
    } else if (t1[sortKey[sortIndex]] === t2[sortKey[sortIndex]]) {
        if (sortIndex === sortKey.length) {
            return 0
        } else {
            return compary(t1, t2, sortKey, sortType, ++sortIndex)
        }
    } else {
        return -1 * sortType[sortIndex]
    }
}

exports.isEmptyArray = function (obj) {
    return undefined === obj || null === obj || obj.length === 0;
};
exports.isArray = function isArray(o) {
    return Object.prototype.toString.call(o) == '[object Array]';
};
exports.extendCom = function extendCom(json1, json2) {
    for (key in json2) {
        json1[key] = json2[key];
    }
    return json1;
};

exports.render = function (req, res, htmlName, option) {
    option["socketURL"]= _this.getSocketURL(req);
    if (!req.authJson) {
        option["authJson"] = '{}'
    } else {
        option["authJson"] = req.authJson
    }
    option["projectViewName"] =config.projectInfo.projectViewName;
    res.render(htmlName, _this.extendCom(option));
}
/**************************************时间格式化处理************************************/
exports.dateFtt = function dateFtt(fmt, date) { //author: meizz
    var o = {
        "M+": date.getMonth() + 1,                 //月份
        "d+": date.getDate(),                    //日
        "h+": date.getHours(),                   //小时
        "m+": date.getMinutes(),                 //分
        "s+": date.getSeconds(),                 //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

exports.consoleLog = function (msg, param) {
    let now = _this.dateFtt('yyyy-MM-dd hh:mm:ss.S', new Date())
    console.log(now + " - " + msg + " - " + (param ? ("param:" + JSON.stringify(param)) : ""))
}
