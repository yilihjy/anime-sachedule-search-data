const child_process = require('child_process');
const { user,email} = require('./var')
const saveCalendarSubject = require('../scripts/saveCalendarSubject');


saveCalendarSubject(() => {
    child_process.execSync(`git config --local user.email ${email}`)
    child_process.execSync(`git config --local user.name ${user}`)
    child_process.execSync('git add .')
    child_process.execSync(`git commit -m 'Github Action auto commit for task1'`)
    child_process.execSync('git pull')
})
