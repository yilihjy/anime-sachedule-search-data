const child_process = require('child_process');
const { user,email} = require('./var')
const saveCalendarSubject = require('../scripts/saveCalendarSubject');
const saveDataSubject = require('../scripts/saveDataSubject');
const buildData = require('../scripts/buildData');
const updateVersion = require('../scripts/updateVersion');

saveCalendarSubject(() => {
    saveDataSubject(()=>{
        buildData(()=>{
            updateVersion((version)=>{
                console.log(`已经修改package版本号为${version}`)
            });
        });
    })
})
