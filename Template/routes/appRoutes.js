//路由集合
let comm = require('../controllers/common/common');
var index = require('../controllers/apps/index');

module.exports = function (app, passport) {
    comm.boundAppsUrl(app, "", index.index,{submitTpe:"get"});
    comm.boundAppsUrl(app, "index", index.index,{submitTpe:"get"});
};
