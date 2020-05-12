import {getTagRecord} from "../api";
import tagRecordList from "@/assets/tagRecord";
import recordListDemo from "@/assets/recordList";




const mutations = {
    fetchTagRecord(state){
        //console.log( window.localStorage.getItem("tagRecord") ==null)
        if(window.localStorage.getItem("tagRecord") ==null){
            //console.log("hi")
            /*
            getTagRecord().then((tagList)=>{
                window.localStorage.setItem("tagRecord",JSON.stringify(tagList));
                state.tagRecord = JSON.parse(window.localStorage.getItem("tagRecord"));
                state.createTagIndex = state.tagRecord[state.tagRecord.length - 1].index
            });
             */
            window.localStorage.setItem("tagRecord",JSON.stringify(tagRecordList));
            state.tagRecord = JSON.parse(window.localStorage.getItem("tagRecord"));
            state.createTagIndex = state.tagRecord[state.tagRecord.length - 1].index
        }else{
            state.tagRecord = JSON.parse(window.localStorage.getItem("tagRecord"));
            state.createTagIndex = state.tagRecord[state.tagRecord.length - 1].index;
        }

    },
    initShowTagList(state,type){
        //console.log(window.localStorage.getItem("tagRecord")==null)

        if(window.localStorage.getItem("tagRecord")==null){
            /*
            getTagRecord().then((tagList)=>{
                //console.log(tagList);
                state.showTagRecord = tagList.filter(function(item){return  item.type === type;});
                //console.log(state.showTagRecord);
            });
             */
            state.showTagRecord = tagRecordList.filter(function(item){return  item.type === type;});
        }else{
            const tagList0 = JSON.parse(window.localStorage.getItem("tagRecord"));
            //console.log(tagList0);
            state.showTagRecord = tagList0.filter(function(item){return  item.type === type;});
        }
    },
    fetchRecordList(state){
        state.recordList = JSON.parse(window.localStorage.getItem("recordList"))||[];
            //recordListDemo;
    },
    fetchBudgetList(state){
        state.budgetList = JSON.parse(window.localStorage.getItem("budgetList")) || [];
    },
    searchBudgetItem(state,dateStr){
        let index = -1;
        for(let i=0;i<state.budgetList.length;i++){
            if(state.budgetList[i].date === dateStr){
                index = i;
                break;
            }
        }
        state.currentBudget = index === -1?0:state.budgetList[index].number;
    },
    setBudgetItem(state,item){
        let index = -1;
        for(let i=0;i<state.budgetList.length;i++){
            if(state.budgetList[i].date === item.date){
                index = i;
                break;
            }
        }
        if(index===-1){
            state.budgetList.push({
                date:item.date,
                number:item.number
            });
            window.localStorage.setItem("budgetList",JSON.stringify(state.budgetList));
        }else{
            state.budgetList[index].number = item.number;
            window.localStorage.setItem("budgetList",JSON.stringify(state.budgetList));
        }
        state.currentBudget = item.number;
    },
    deleteRecordItem(state,id){

            let delIndex = -1;
            for(let i=0;i<state.recordList.length;i++){
                if(state.recordList[i].id === id){
                    delIndex = i;
                    break;
                }
            }

            if(delIndex !== -1) {
                state.recordList.splice(delIndex, 1);
                this.commit("saveRecordListtoLocal");
            }
     },
    editRecordList(state,item){
        //console.log(item);
        let editIndex = -1;
        for(let i=0;i<state.recordList.length;i++){
            if(state.recordList[i].id === item.id){
                editIndex = i;
                break;
            }
        }
        if(editIndex !== -1) {
            state.recordList[editIndex].type=item.type;
            state.recordList[editIndex].tag=JSON.parse(JSON.stringify(item.tag));
            state.recordList[editIndex].note=item.note;
            state.recordList[editIndex].date=item.date;
            state.recordList[editIndex].number=item.number;
        }
        //console.log(state.recordList[editIndex]);
        this.commit("saveRecordListtoLocal");
    },
    saveRecordList(state,item){
        const deepCopy =JSON.parse(JSON.stringify(item));
        state.recordList.push(deepCopy);
        this.commit("saveRecordListtoLocal");
    },
    saveRecordListtoLocal(state){
        window.localStorage.setItem("recordList",JSON.stringify(state.recordList));
    },
    createIndex(state){
        state.createTagIndex += 1;
    },
    saveTagRecord(state,item){
        const newItem = {
            "index": item.index,
            "type": item.type,
            "iconName":item.iconName,
            "name":item.name
        };
        state.tagRecord.push(newItem);
        this.commit("saveTagRecordtoLocal");
    },
    //检查tag名称是否重复
    nameCheck(state,name){
        const nameList = state.tagRecord.map(item => item.name);
        state.tagNameCheckFlag = nameList.indexOf(name) >= 0;
    },
    editTagRecord(state,item){
        let editIndex = -1;
        for(let i=0;i<state.tagRecord.length;i++){
            if(state.tagRecord[i].index === itme.index){
                editIndex = i;
                break;
            }
        }
        if(editIndex!==-1){
            state.tagRecord[editIndex].type=item.type;
            state.tagRecord[editIndex].name=item.name;
            state.tagRecord[editIndex].iconName=item.iconName;
        }
        this.commit("saveTagRecordtoLocal");
    },
    deleteTagRecord(state,name){
        //const delIndex = state.tagRecord.indexOf(item);
        //上面的方法找不到item的index，所以只能遍历
        let delIndex = -1;
        for(let i=0;i<state.tagRecord.length;i++){
            if(state.tagRecord[i].name === name){
                delIndex = i;
                break;
            }
        }

        if(delIndex !== -1){
            console.log(state.tagRecord[delIndex]);
            console.log(delIndex);
            state.tagRecord.splice(delIndex,1);
            this.commit("saveTagRecordtoLocal");
            return 1
        }else{
            return 0;
        }

    },
    saveTagRecordtoLocal(state){
        window.localStorage.setItem("tagRecord",JSON.stringify(state.tagRecord));
    }



};

export default mutations;
