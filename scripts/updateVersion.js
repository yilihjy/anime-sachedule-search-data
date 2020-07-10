const fs = require('fs');
const path = require('path');
const pkg = require('../package.json')

let version = pkg.version.split('.')
version[2] = version[2]-0+1
pkg.version = version.join('.')
fs.writeFileSync(path.join(__dirname,'..','package.json'),JSON.stringify(pkg))