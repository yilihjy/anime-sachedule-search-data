const fs = require('fs');
const path = require('path');
const superagent = require('superagent');

const bangumiData = require('bangumi-data');
const items = bangumiData.items;
let weekData = []
let length = items.length;
let cur = 0;
function queue(fn) {
    if (cur < length) {
        fn(cur)
    } else {
        fs.writeFile(path.join('.', 'err.json'), JSON.stringify(failList), () => {
        })
        after()
    }
}
const failList = []
function fun(index) {
    const item = items[index]
    const bangumiSite = item.sites.filter((value) => {
        return value.site == 'bangumi'
    })
    if (bangumiSite[0]) {
        const id = bangumiSite[0].id
        superagent
            .get(`https://api.bgm.tv/subject/${id}?responseGroup=large`)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                    failList.push(id)
                    fs.writeFile(path.join('.', 'err.json'), JSON.stringify(failList), () => {
                        cur++
                        setTimeout(() => {
                            queue(fun)
                        }, 100);
                    })
                } else {
                    if (res && res.body) {
                        fs.writeFile(path.join('.', 'dist', 'subject', `${id}.json`), JSON.stringify(res.body), () => {
                            console.log(`${id}完成,进度${index + 1}/${length}=${((index + 1) / length * 100).toFixed(2)}%`)
                            cur++
                            setTimeout(() => {
                                queue(fun)
                            }, 100);
                        })
                    }
                }
            });
    }
}


function after() {
    superagent.get('https://api.bgm.tv/calendar').end((err, res) => {
        if (res && res.body) {
            weekData = res.body
            fs.writeFile(path.join('.', 'dist', 'calendar.json'), JSON.stringify(weekData), () => {
                console.log('保存https://api.bgm.tv/calendar')
                handleData()
            })
            let weekId = []
            weekData.forEach(week => {
                week.items.forEach(item => {
                    weekId.push(item.id)
                })
            })
            let weekCur = 0
            console.log(weekId)
            function weekqueue() {
                if (weekCur < weekId.length) {
                    superagent
                        .get(`https://api.bgm.tv/subject/${weekId[weekCur]}?responseGroup=large`)
                        .end((err, res) => {
                            console.log(weekCur, weekId[weekCur])
                            if (err) {
                                console.log(err)
                                failList.push(weekId[weekCur])
                                fs.writeFile(path.join('.', 'err.json'), JSON.stringify(failList), () => {
                                    setTimeout(() => {
                                        weekCur++
                                        weekqueue()
                                    }, 100);
                                })
                            } else {
                                if (res && res.body) {
                                    fs.writeFile(path.join('.', 'dist', 'subject', `${weekId[weekCur]}.json`), JSON.stringify(res.body), () => {
                                        console.log(`${weekId[weekCur]}完成,进度${weekCur + 1}/${weekId.length}=${((weekCur + 1) / weekId.length * 100).toFixed(2)}%`)
                                        setTimeout(() => {
                                            weekCur++
                                            weekqueue()
                                        }, 100);
                                    })
                                }
                            }
                        });
                } else {
                    fs.writeFile(path.join('.', 'err.json'), JSON.stringify(failList), () => {
                    })
                }
            }
            weekqueue()
        }
    });
}

function handleData() {
    items.forEach((element, index) => {
        if (element.sites) {
            element.sites.forEach(value => {
                if (value.site == 'bangumi') {
                    const fsdata = fs.readFileSync(path.join('.', 'dist', 'subject', `${value.id}.json`))
                    const objData = JSON.parse(fsdata.toString('utf-8'))
                    if (objData.images && objData.images.grid) {
                        element.image = objData.images.grid
                    }
                }
            })
        }
    })
    fs.writeFile(path.join('.', 'dist', 'data.json'), JSON.stringify({
        siteMeta: bangumiData.siteMeta,
        items: items,
        calendar: weekData
    }), () => {

    })
}

queue(fun)
// handleData()
// after()