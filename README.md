# anime-sachedule-search-data

![Node.js Package](https://github.com/yilihjy/anime-sachedule-search-data/workflows/Node.js%20Package/badge.svg) 
![Node.js CI](https://github.com/yilihjy/anime-sachedule-search-data/workflows/Node.js%20CI/badge.svg)
![LICENSE](https://img.shields.io/npm/l/anime-sachedule-search-data)
![NPM](https://img.shields.io/npm/v/anime-sachedule-search-data)

AnimeScheduleSearch项目的数据源

## 使用方法

### 本地使用

#### 安装
`npm i anime-sachedule-search-data`  
OR  
`yarn add anime-sachedule-search-data`

#### 基础数据
```javascript
const data = require('anime-sachedule-search-data')
```

#### 详细数据
```javascript
const subjectData = require(`anime-sachedule-search-data/dist/subject/${id}.json`)
```

### CDN

#### 基础数据
```
https://cdn.jsdelivr.net/npm/anime-sachedule-search-data@0.1/dist/data.json
```

#### 详细数据
```
https://cdn.jsdelivr.net/npm/anime-sachedule-search-data@0.1/dist/subject/${id}.json
```

${id}替换为对应动画的在Bangumi上的id

## 数据结构
#### 基础数据
参考[bangumi-data](https://github.com/bangumi-data/bangumi-data/blob/master/CONTRIBUTING.md)

本项目在bangumi-data@0.3.x数据结构的基础上，在[番组数据](https://github.com/bangumi-data/bangumi-data/blob/v0.3.30/CONTRIBUTING.md#%E7%95%AA%E7%BB%84%E6%95%B0%E6%8D%AE)增加了一个`image`字段，图片地址不存在时候为`''`  

同时基础数据上增加一个`calendar`字段，数据来源此[API](https://bangumi.github.io/api/#/%E6%9D%A1%E7%9B%AE/get_calendar)

没有修改[站点元数据](https://github.com/bangumi-data/bangumi-data/blob/v0.3.30/CONTRIBUTING.md#%E7%AB%99%E7%82%B9%E5%85%83%E6%95%B0%E6%8D%AE)  

基础数据结构如下：
```js
{
    items:[], //番组数据对象的数组
    siteMeta：{}, // 站点元数据
    calendar:[] // 每日放送数据
}
```

#### 详细数据
来源此[API](https://bangumi.github.io/api/#/%E6%9D%A1%E7%9B%AE/get_subject__subject_id_)，responseGroup值为large



## 项目数据来源  
数据源1：  
[bangumi-data](https://github.com/bangumi-data/bangumi-data)   
数据修改部分见[数据结构](#数据结构)说明


数据源2：  
[Bangumi API](https://github.com/bangumi/api)  
数据修改部分见[数据结构](#数据结构)说明

## 协议
### 代码协议
本项目源代码部分遵循[MIT](./LICENSE)协议

### 数据协议

数据部分遵循[署名 4.0 国际 (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/deed.zh)

## 开发注意事项
开发工作在develop分支上进行，测试无误后再合并到master分支
