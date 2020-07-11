const child_process = require('child_process');
const { user,email} = require('./var')
const buildData = require('../scripts/buildData');

buildData(()=>{
    child_process.execSync(`git config --local user.email ${email}`)
    child_process.execSync(`git config --local user.name ${user}`)
    child_process.execSync('git add .')
    child_process.execSync(`git commit -m 'Github Action auto commit for task5'`)
    child_process.execSync('git pull')
    child_process.execSync('git push')
});