const fs = require('fs');
const pkg = require('./package.json')

let version = pkg.version.split('.')
version[2] = -version[2]+1
pkg.version = version.join('.')
fs.writeFileSync('package.json',JSON.stringify(pkg))