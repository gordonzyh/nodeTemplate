let comm = require('../controllers/common/common');

function onStart(cli) {

}

exports.socketRoutes = function socketRoutes(cli) {
    onStart(cli);
    // comm.boundScksMsg(cli, "getWindSpeedChart", dataManage.getWindSpeedChart);
};

