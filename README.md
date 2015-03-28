bts-config
==========

Simple yaml based config factory

# Install

```
npm install bts-config
```

# Overview

App configuration factory based on [nconf](https://github.com/indexzero/nconf) and using 
[js-yaml](https://github.com/nodeca/js-yaml) for yaml file support.

Uses [nconf](https://github.com/indexzero/nconf)'s hierarchical abilities to load configuration values in the order:
 
1. Command-line arguments
2. Environment variables
3. One or more yaml files (as passed to configuration function defined below)

# Configuration

`require('bts-config')` returns a configuration function which takes the following args:
 
`function(pathToConfigDir, configFileName1, configFileName2, ...)`

Each config file name can use one or more "{ENV_VAR_NAME}" templates which get replaced with the corresponding 
environment variable values.

Define a `config.js` file in your application project as follows:
 
```js
// Configure path to your config file directory. E.g:
var path = require('path');
var configDirPath = path.join(__dirname, '../config/');

// Configure and export bts-config
module.exports = require('bts-config')(configDirPath, 'app-{NODE_ENV}.yml', 'db-{NODE_ENV}.yml');
```

So, if the `NODE_ENV` environment variable is `prod`, this will use `../config/app-prod.yml` and `../config/db-prod.yml` 
files to populate the configuration store.

# Usage

Assuming you've configured a `config.js` file in your own project as defined above, and have a yaml file as follows:
 
```yaml
dbname: foo
```

then the usage looks like:

```js
var config = require('./config'); // Path to your config.js file as described above

var dbName = config.get('dbname);
assert.equals(dbName, 'foo');

// Or:
var dbName = config.getRequired('dbname);  // will throw if `dbName` is falsy

```


# License

MIT
