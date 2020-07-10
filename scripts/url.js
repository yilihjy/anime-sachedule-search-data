const path = require('path');
const dataURL = 'https://cdn.jsdelivr.net/npm/bangumi-data@0.3/dist/data.json';
const calendarURL = 'https://api.bgm.tv/calendar';
function subjectURL(id) {
    return `https://api.bgm.tv/subject/${id}?responseGroup=large`;
}
const distDir = path.join(__dirname,'..','dist');
const subjectDir = path.join(distDir,'subject');
const sourceDir = path.join(distDir,'source')

module.exports ={
    dataURL,
    calendarURL,
    subjectURL,
    distDir,
    subjectDir,
    sourceDir
}