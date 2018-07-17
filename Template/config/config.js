let customConfig = require('./customConfig').config;
let objAssign = require('object-assign');
let config = objAssign({
    projectInfo:{
        projectName: "windTower",
        projectViewName:"测风塔管理系统"
    },
    serverInfo:{
        appPort: "3000",
        fengYunServerUrl: "http://172.161.11.82:30000",
    },
    socket: {
        serviceType: "http",
        IP: "127.0.0.1",
        PORT: 9999
    },
    mongodb: {
        USERNAME: "test",
        PASSWORD: "test123",
        IP: "172.161.10.20",
        DBNAME: "cloud_dev",
        PORT: "27018"
    },
    redisInfo:{
        isOnCloudServer: "false",
        redis: {
            REQUIREPASS: "sja123",
            //     IP: "172.161.11.82",
            IP: "106.12.3.7",
            PORT: 6379
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
    },
    palo: {
        host: "172.172.50.25",
        user: "root",
        password: "",
        database: "cloud_palo_dev",
        port: 9022
    },
    auth: {
        check: "off",
        host: "172.161.11.82",
        port: "3333"
    },
    systemVersion: {
        versionNo: "v1.01"
    },
}, customConfig);

exports.config = config;