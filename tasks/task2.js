const child_process = require('child_process');
const { user,email} = require('./var')
const saveDataSubject = require('../scripts/saveDataSubject');

saveDataSubject(0,30,()=>{
    child_process.execSync(`git config --local user.email ${email}`)
    child_process.execSync(`git config --local user.name ${user}`)
    child_process.execSync('git add .')
    child_process.execSync(`git commit -m 'Github Action auto commit for task2'`)
    child_process.execSync('git pull')
});