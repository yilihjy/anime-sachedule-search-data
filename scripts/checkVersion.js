const child_process = require('child_process');
const pkg = require('../package.json');
const remoteVersion = child_process.execSync(`npm view ${pkg.name} version`).toString('utf-8').trim();
const localVersion = pkg.version;
if(remoteVersion==localVersion) {
    throw new Error(`版本号相同 local:${localVersion} remote: ${remoteVersion}`)
}
const remoteVersionList = remoteVersion.split('.');
const localVersionList = localVersion.split('.');
if(remoteVersionList[0]==localVersionList[0] &&remoteVersionList[1]==localVersionList[1] && (remoteVersionList[2]-0)<(localVersionList[2]-0)){
    console.log(`本地版本号更高 local:${localVersion} remote: ${remoteVersion}`);
    process.exit(0)
}else {
    throw new Error(`本地版本号低 local:${localVersion} remote: ${remoteVersion}`)
}