const config = require("../../config/config").config;
const client = require('../../lib/rdb');
const COMMON = require("../common/common");
const dbName = config.mongodb.DBNAME;
//总首页 目录
exports.index = function (req, res, next) {
    client.hmset("testKey", {id: 123}, function (err) {
        console.log(err)
    });

    //读取JavaScript(JSON)对象
    client.hgetall('testKey', function (err, object) {
        console.log(object);
    });

    COMMON.render(req, res, 'index', {
        userName: "test",
    });
};