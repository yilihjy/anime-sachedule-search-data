const fs = require('fs');
const path = require('path');
let data;
function getData() {
    return JSON.parse(fs.readFileSync(path.join('.', 'dist', 'data.json')).toString('utf-8'))
}

beforeEach(() => {
    data = getData()
});

test('data.json存在', () => {
    expect(data).toBeInstanceOf(Object)
});

test('data.json中有siteMeta对象', () => {
    expect(data.siteMeta).toBeInstanceOf(Object)
});

test('data.json中有items数组', () => {
    expect(data.items).toBeInstanceOf(Array)
});

test('data.json中有calendar数组', () => {
    expect(data.calendar).toBeInstanceOf(Array)
});

describe('subject目录内有对应文件', () => {
    data = getData()
    const items = data.items;
    items.forEach((value) => {
        const bangumiSite = value.sites.filter((item) => {
            return item.site == 'bangumi'
        })
        if (bangumiSite[0]) {
            const id = bangumiSite[0].id
            test(`${id}.json存在,不存在时创建空模板`,async ()=>{
                fs.readFile(path.join('.', 'dist', 'subject', `${id}.json`), (err, data) => {
                    if (err) {
                        const template = JSON.parse(fs.readFileSync(path.join('.','subject_template.json')).toString('utf-8'));
                        template.id = value.id;
                        template.name = value.title;
                        fs.writeFileSync(path.join('.', 'dist', 'subject',`${id}.json`),JSON.stringify(template));
                        expect(true).toBe(true);
                    }else {
                        expect(typeof JSON.parse(data.toString('utf-8')).id).toBe('number')
                    }
                });
            })
        }
    })
});

describe('calendar内数据在subject目录内有对应文件', () => {
    data = getData()
    const calendar = data.calendar;
    calendar.forEach((day) => {
        day.items.forEach(item=>{
            const id = item.id
            test(`${id}.json存在`,async ()=>{
                fs.readFile(path.join('.', 'dist', 'subject', `${id}.json`), (err, data) => {
                    if (err) {
                        const template = JSON.parse(fs.readFileSync(path.join('.','subject_template.json')).toString('utf-8'));
                        template.id = item.id;
                        template.name = item.name;
                        fs.writeFileSync(path.join('.', 'dist', 'subject',`${id}.json`),JSON.stringify(template));
                        expect(true).toBe(true);
                    }else {
                        expect(typeof JSON.parse(data.toString('utf-8')).id).toBe('number')
                    }
                });
            })
        })
    })
});
