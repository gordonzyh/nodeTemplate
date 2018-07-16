let comm = require('../controllers/common/common');

function beforStart(cli) {

}

exports.socketRoutes = function socketRoutes(cli) {
    beforStart(cli)
    // comm.boundScksUrl(cli, "dataManage/getWindSpeedChart", dataManage.getWindSpeedChart);
};

