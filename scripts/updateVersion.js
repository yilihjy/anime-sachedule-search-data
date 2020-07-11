const fs = require('fs');
const path = require('path');
const pkg = require('../package.json')

function updateVersion(fn) {
    let version = pkg.version.split('.')
    version[2] = version[2] - 0 + 1
    const newVersion = version.join('.')
    pkg.version = newVersion
    fs.writeFileSync(path.join(__dirname, '..', 'package.json'), JSON.stringify(pkg))
    fn(newVersion)
}

module.exports = updateVersion


