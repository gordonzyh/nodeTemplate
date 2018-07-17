//redis数据库连接配置相关内容
var fs = require("fs");
var basePath = process.cwd();
basePath = basePath.indexOf("bin") != -1?basePath.substr(0,basePath.indexOf("bin")-1):basePath;
var objConfig = require(basePath + "/config/config").config;;
var isOnCloudServer = true;
if(undefined != objConfig.redisInfo.isOnCloudServer && null != objConfig.redisInfo.isOnCloudServer && "false" == objConfig.redisInfo.isOnCloudServer){
	isOnCloudServer = false;
}

var client ;
if(isOnCloudServer){
	console.log("连接集群redis");
	var redis4Cluster = require("ioredis");
	if(undefined != objConfig.redisInfo.redis4Cluster && null != objConfig.redisInfo.redis4Cluster){
		client = new redis4Cluster.Cluster(objConfig.redisInfo.redis4Cluster);
	}else{
		console.log("Redis参数不正确：当前参数为集群模式，请正确配置redis4Cluster参数");
		throw new Error("Redis配置错误");
	}
}else{
	console.log("连接单机redis");
	var redis = require("redis");
	var blueBird = require("bluebird"); //blueBird使redis查询同步
	blueBird.promisifyAll(redis.RedisClient.prototype);
	blueBird.promisifyAll(redis.Multi.prototype);
	if(undefined != objConfig.redisInfo.redis && null != objConfig.redisInfo.redis){
		client = redis.createClient(objConfig.redisInfo.redis.PORT,objConfig.redisInfo.redis.IP);
		client.auth(objConfig.redisInfo.redis.REQUIREPASS,function(){
			console.log("通过权限验证");
		});
	}else{
		console.log("Redis参数不正确：当前参数为单机模式，请正确配置redis参数");
		throw new Error("Redis配置错误");
	}
}

client.on("error", function(err){
	console.log("REIDS Error: " + err);
});
client.del("userLimit");
module.exports = client;
