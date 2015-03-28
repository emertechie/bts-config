var chai = require('chai');
var assert = chai.assert;

var sut = require('../lib/fileNameMaker');

describe('fileNameMaker', function() {

    beforeEach(function() {
        process.env.FOO = 'foo-val';
        process.env.BAR = 'bar-val';
    });

    afterEach(function() {
        delete process.env.FOO;
    });

    it('returns file name with env variable templates replaced', function() {
        var result = sut.getFileName('A.{FOO}.B.{BAR}.yml');
        assert.equal(result, 'A.foo-val.B.bar-val.yml');
    });

    it('returns file name if no template present', function() {
        var result = sut.getFileName('foo.yml');
        assert.equal(result, 'foo.yml');
    });

    it('throws if no matching env var found', function() {
        assert.throw(function() {
            sut.getFileName('{unknown}.yml');
        }, /Could not find environment variable "unknown"/);
    });
});