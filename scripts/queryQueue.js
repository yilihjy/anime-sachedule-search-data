const fs = require('fs');
const path = require('path');
const superagent = require('superagent');
const { subjectURL, subjectDir } = require('./url');


function queryQueue(list, wait) {
    return new Promise((resolve) => {
        const length = list.length;
        let cursor = 0;
        const run = async () => {
            if (cursor < length) {
                console.log(`队列运行中，当前第${cursor + 1}项，剩余${length - cursor}项`);
                try {
                    const id = list[cursor];
                    console.log(`准备查询${id}`)
                    const res = await superagent.get(subjectURL(id));
                    console.log(`查询${id}完毕，准备写入`)
                    fs.writeFile(path.join(subjectDir, `${id}.json`), JSON.stringify(res.body), (err) => {
                        if (err) { console.error(err); }
                        console.log(`写入${id}.json完成，进度${cursor + 1}/${length}=${((cursor + 1) / length * 100).toFixed(2)}%`)
                    })
                } catch (error) {
                    console.error(error);
                }
                setTimeout(() => {
                    cursor++;
                    console.log(`已经等待${wait}毫秒，准备开始下一次`)
                    run()
                }, wait);
            } else {
                console.log('队列已完成');
                resolve();
            }
        }
        run()
    })
}

module.exports = queryQueue;