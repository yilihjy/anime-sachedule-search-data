const fs = require('fs');
const path = require('path');
const superagent = require('superagent');
const { dataURL, calendarURL, subjectURL, distDir, subjectDir, sourceDir } = require('./url');
const queryQueue = require('./queryQueue');

async function saveCalendarSubject() {
    try {
        console.log(`开始获取${calendarURL}`)
        const res = await superagent.get(calendarURL)
        const calendar = res.body
        console.log(`获取${calendarURL}完成`)
        fs.writeFile(path.join(sourceDir,'calendar.json'),JSON.stringify(calendar),async (err)=>{
            if (err) { console.error(err); throw err; }
            console.log('写入calendar.json完成');
            const subjectIds = [];
            calendar.forEach((day) => {
                day.items.forEach(item=>{
                    const id = item.id
                    subjectIds.push(id)
                })
            })
            await queryQueue(subjectIds,500);
            console.log('保存每日放送表数据完成');
        });
    } catch (err) {
        console.error(err);
        throw err
    }
}

module.exports = saveCalendarSubject;