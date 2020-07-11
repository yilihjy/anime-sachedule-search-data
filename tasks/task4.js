const child_process = require('child_process');
const { user,email} = require('./var')
const saveDataSubject = require('../scripts/saveDataSubject');

saveDataSubject(4,6,()=>{
    child_process.execSync(`git config --local user.email ${email}`)
    child_process.execSync(`git config --local user.name ${user}`)
    child_process.execSync('git add .')
    child_process.execSync(`git commit -m 'Github Action auto commit for task4'`)
    child_process.execSync('git pull')
    child_process.execSync('git push')
});