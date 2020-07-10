const fs = require('fs');
const path = require('path');
const superagent = require('superagent');
const { dataURL, calendarURL, distDir, subjectDir } = require('./url');
async function buildData() {
    try {
        console.log(`开始获取${dataURL}`)
        const res = await superagent.get(dataURL)
        console.log(`获取${dataURL}完成`)
        const bangumiData = res.body;
        const items = bangumiData.items;
        items.forEach((element) => {
            if (element.sites) {
                element.sites.forEach(value => {
                    if (value.site == 'bangumi') {
                        try {
                            console.log(`准备读取${value.id}.json`)
                            const fsdata = fs.readFileSync(path.join(subjectDir, `${value.id}.json`))
                            console.log(`读取${value.id}.json完成`)
                            const objData = JSON.parse(fsdata.toString('utf-8'))
                            if (objData.images && objData.images.grid) {
                                element.image = objData.images.grid
                            }
                        } catch (error) {
                            console.error(error);
                        }
                    }
                })
            }
            if (!element.image) {
                element.image = '';
            }
        })
        console.log(`开始获取${calendarURL}`)
        const res2 = await superagent.get(calendarURL)
        console.log(`获取${calendarURL}完成`)
        const calendar = res2.body
        bangumiData.calendar = calendar
        console.log('开始构建data.json')
        fs.writeFile(path.join(distDir, 'data.json'), JSON.stringify(bangumiData), (err) => {
            if (err) { console.error(err); throw err; }
            console.log('构建完成')
        })
    } catch (err) {
        console.error(err);
        throw err
    }
}

module.exports = buildData;