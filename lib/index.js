var nconf = require('nconf');
var path = require('path');
var jsYaml = require('js-yaml');
var assert = require('assert');
var debug = require('debug')('bts-config');
var fileNameMaker = require('./fileNameMaker');

module.exports = function(configDirPath) {
    assert(configDirPath, 'Must provide configDirPath');

    var yaml = {
        parse: jsYaml.safeLoad,
        stringify: jsYaml.safeDump
    };

    var fileNameTmpls = Array.prototype.slice.call(arguments, 1);
    var fileNames = fileNameTmpls.map(function(fileNameTmpl) {
       return fileNameMaker.getFileName(fileNameTmpl);
    });
    debug('Config dir "%s"; Files: [%s]', configDirPath, fileNames.join(','));

    nconf.argv();
    nconf.env();
    fileNames.forEach(function(fileName) {
        nconf.file(fileName, {
            file: path.join(configDirPath, fileName),
            format: yaml
        });
    });

    // Add a 'getRequired' convenience method to nconf api:
    nconf.getRequired = function(key) {
        var val = nconf.get(key);
        if (!val) {
            throw new Error('Missing required config "' + key + '"');
        }
        return val;
    };

    return nconf;
};