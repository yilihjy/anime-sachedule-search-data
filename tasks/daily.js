const child_process = require('child_process');
const { user,email} = require('./var')
const saveCalendarSubject = require('../scripts/saveCalendarSubject');
const saveRecentDataSubject = require('../scripts/saveRecentDataSubject');
const buildData = require('../scripts/buildData');
const updateVersion = require('../scripts/updateVersion');

saveCalendarSubject(() => {
    saveRecentDataSubject(()=>{
        buildData(()=>{
            updateVersion((version)=>{
                child_process.execSync(`git config --local user.email ${email}`)
                child_process.execSync(`git config --local user.name ${user}`)
                child_process.execSync('git add .')
                child_process.execSync(`git commit -m 'Github Action auto commit for ${version}'`)
                child_process.execSync('git pull')
                console.log(`::set-output name=version::v${newVersion}`)
            });
        });
    })
})
