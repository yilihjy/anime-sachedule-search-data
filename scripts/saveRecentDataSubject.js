const fs = require('fs');
const path = require('path');
const superagent = require('superagent');
const { dataURL, calendarURL, subjectURL, distDir, subjectDir, sourceDir } = require('./url');
const queryQueue = require('./queryQueue');

async function saveRecentDataSubject(fn) {
    try {
        console.log(`开始获取${dataURL}`)
        const res = await superagent.get(dataURL)
        const data = res.body
        console.log(`获取${dataURL}完成`)
        fs.writeFile(path.join(sourceDir,'data.json'),JSON.stringify(data),async (err)=>{
            if (err) { console.error(err); throw err; }
            console.log('data.json完成');
            const subjectIds = [];
            const subset = data.items
            subset.forEach((item) => {
                const site = item.sites.filter((value) => {
                    return value.site == 'bangumi'
                })
                if (site[0]&& isRecent(item.begin)) {
                    subjectIds.push(site[0].id);
                }
            })
            await queryQueue(subjectIds,500);
            console.log('保存基础数据完成');
            fn()
        });
    } catch (err) {
        console.error(err);
        throw err
    }
}

function isRecent(date) {
    const tz = (new Date(date)).valueOf()
    return Math.abs((new Date()).valueOf()-tz) < 365*86400000
}

module.exports = saveRecentDataSubject;

