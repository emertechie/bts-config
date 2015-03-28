var util = require('util');
var MARKER_L = '{';
var MARKER_R = '}';

var fileNameMaker = {
    getFileName: function(templateStr) {
        do {
            var envVarName = extractEnvVarName(templateStr, MARKER_L, MARKER_R);
            if (envVarName) {
                var envVarValue = process.env[envVarName];
                if (envVarValue === undefined) {
                    throw new Error(util.format('Could not find environment variable "%s"', envVarName));
                }
                templateStr = templateStr.replace(MARKER_L + envVarName + MARKER_R, envVarValue);
            }
        } while(envVarName);
        return templateStr;
    }
};

function extractEnvVarName(templateStr, markerL, markerR) {
    var lPos = templateStr.indexOf(markerL);
    var rPos = templateStr.indexOf(markerR, lPos);
    if (lPos === -1 || rPos === -1) {
        return null;
    }
    return templateStr.substring(lPos + 1, rPos);
}

module.exports = fileNameMaker;