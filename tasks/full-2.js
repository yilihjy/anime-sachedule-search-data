const child_process = require('child_process');
const { user,email} = require('./var')
const saveCalendarSubject = require('../scripts/saveCalendarSubject');
const saveDataSubject = require('../scripts/saveDataSubject');
const buildData = require('../scripts/buildData');
// const updateVersion = require('../scripts/updateVersion');

saveCalendarSubject(() => {
    saveDataSubject(2500,5000,()=>{
        buildData(()=>{
            child_process.execSync(`git config --local user.email ${email}`)
            child_process.execSync(`git config --local user.name ${user}`)
            child_process.execSync('git add .')
            child_process.execSync(`git commit -m 'Github Action daily update 2'`)
            child_process.execSync('git pull')
        });
    })
})
