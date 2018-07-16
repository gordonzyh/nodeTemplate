exports.log4js = {
    "customBaseDir": "/logs/",
    "customDefaultAtt": {
        "type": "dateFile",
        "absolute": true,
        "alwaysIncludePattern": true
    },
    "appenders": [
        {"type": "console", "category": "console"},
        {"pattern": "debug/yyyy-MM-dd.txt", "category": "logDebug"},
        {"pattern": "info/yyyy-MM-dd.txt", "category": "logInfo"},
        {"pattern": "warn/yyyy-MM-dd.txt", "category": "logWarn"},
        {"pattern": "err/yyyy-MM-dd.txt", "category": "logErr"}
    ],
    "replaceConsole": true,
    "levels": {"logDebug": "DEBUG", "logInfo": "DEBUG", "logWarn": "DEBUG", "logErr": "DEBUG"}
}