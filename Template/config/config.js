let customConfig = require('./customConfig').config;
let objAssign = require('object-assign');
let config = objAssign({
    projectName: "windTower",
    admin_org: "052ef5aa3cdb107a2532fa8a3ea89b83",
    admin_uid: "00abe3d566e477ea725a6b89ddcb74e6",
    appPort: "3000",
    mongodb: {
        USERNAME: "test",
        PASSWORD: "test123",
        IP: "172.161.10.20",
        DBNAME: "cloud_dev",
        PORT: "27018"
    },
    redis4Cluster: [
        {
            host: "172.160.0.140",
            port: 6379
        },
        {
            host: "172.160.0.140",
            port: 6380
        },
        {
            host: "172.160.0.140",
            port: 6381
        }
    ],
    redis: {
        REQUIREPASS: "sja123",
        //     IP: "172.161.11.82",
        IP: "106.12.3.7",
        PORT: 6379
    },
    socket: {
        serviceType: "http",
        IP: "127.0.0.1",
        PORT: 9999
    },

    IS_ON_CLOUD_SERVER: "false",
    systemVersion: {
        versionNo: "v1.01"
    },
    palo: {
        host: "172.172.50.25",
        user: "root",
        password: "",
        database: "cloud_palo_dev",
        port: 9022
    },
    FENG_YUN_SERVER_URL: "http://172.161.11.82:30000",

    auth: {
        check: "off",
        host: "172.161.11.82",
        port: "3333"
    },
    backend_url: "http://172.161.10.20:8081"
}, customConfig);

exports.config = config;