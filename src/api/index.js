import {get} from './helper.js';
const getTagData = get('/js/tagData.json');
const getTagRecord = get('/js/tagRecord.json');
const getTotal =  function(list){
    let result =list.length === 0? 0:list.reduce(function(a,b,index,array) {return a+b});
    return result;

};
const compareItemByDay =function compare(a,b){
    if(a.date.split("-")[2]<b.date.split("-")[2]){
        return 1
    }else{
        return -1
    }
};
const compareItemById =function compare(a,b){
    if(a.id+0 < b.id+0){
        return 1
    }else{
        return -1
    }
};
const compareItemByTotal=function compare(a,b){
    if(a.total < b.total){
        return 1
    }else{
        return -1
    }
};
const compareItemByName=function compare(a,b) {
    if(a.tag.name < b.tag.name){
        return 1
    }else{
        return -1
    }
};
const clone = function (item) {
    return JSON.parse(JSON.stringify(item))
}

export {
    getTagData,
    getTagRecord,
    getTotal,
    compareItemByDay,
    compareItemById,
    compareItemByTotal,
    compareItemByName,
    clone

}
