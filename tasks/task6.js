const child_process = require('child_process');
const { user,email} = require('./var')
const updateVersion = require('../scripts/updateVersion');

updateVersion((version)=>{
    child_process.execSync(`git config --local user.email ${email}`)
    child_process.execSync(`git config --local user.name ${user}`)
    child_process.execSync('git add .')
    child_process.execSync(`git commit -m 'Github Action auto commit for task6,change version to ${version}'`)
    child_process.execSync('git pull')
    child_process.execSync('git push')
    console.log(`::set-output name=version::v${newVersion}`)
});