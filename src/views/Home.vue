<template>

    <div class="layoutWrapper">
        <div class="wrapper">
            <div class="tittle">
                <p>账本</p>
                <a-icon type="pie-chart" theme="filled" @click="goTo"/>
            </div>
            <div class="dateWrapper">
                <a-month-picker class="date" :locale="locale" v-model="dateSelected"
                                placeholder="请选择" @change="onChange">
                    <span style="font-weight: bold">{{dateShow}}<span class="iconWrapper"><a-icon type="caret-down"/></span></span>
                </a-month-picker>

            </div>
            <div class="des">
                <div class="tittle">
                    <a-icon type="pay-circle" theme="filled" />
                    <p>总支出</p>
                </div>
                <p class="number">{{totalSpent}}</p>
                <div class="otherDes">
                        <p class="type">总收入</p>
                        <p class="number">{{totalEarned}}</p>
                        <p class="type" @click="setBudget">{{budget?"剩余预算":"点击设置当月预算"}}</p>
                        <p class="number">{{budget?budget-totalSpent:""}}</p>
                    </div>
                </div>
            </div>
            <div class="contentWrapper">
                <record-list v-for="item in recordShow" :key="item.date" :record="item">
                </record-list>
            </div>
        <my-nav class="nav"></my-nav>
        <a-modal title="设置当月预算" v-model="confirmVisible" @ok="onOk" cancelText="取消" okText="确认">
            <p>设置或修改当月预算</p>
            <a-input prefix="￥" suffix="RMB" v-model="budget" :placeholder="budget?budget:'当月预算'"/>
            {{budget}}
        </a-modal>
    </div>


</template>

<script>
    import moment from 'moment';
    import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
    import 'moment/locale/zh-cn';

    import RecordList from "@/components/RecordList";
    import MyNav from "@/components/MyNav";

    import {getTotal,compareItemByDay} from "../api";

    export default {
        name: "home",
        components: {RecordList,MyNav},
        data(){
            return{
                locale,
                dateSelected:moment(),
                dateShow:moment().format("YYYY 年 MM 月"),
                totalSpent:0,
                totalEarned:0,
                recordShow:[],
                confirmVisible:false,
                budget:this.$store.state.currentBudget||0
            }
        },
        computed:{

        },
        beforeCreate() {
            this.$store.commit("fetchRecordList");
            this.$store.commit("fetchBudgetList");
        },
        mounted(){
            this.fresh(moment());
        },

        methods:{
            goTo(){
                this.$router.push('/statistics');
            },
            fresh(date){
                //初始化预算值
                const dateValue = date.format().toString().split("T")[0];
                const dateStr = dateValue.split("-")[0].concat(dateValue.split("-")[1]);
                this.$store.commit("searchBudgetItem",dateStr);
                this.budget = this.$store.state.currentBudget;

                //初始化账目记录
                const list = this.$store.state.recordList.filter(
                    function (item) {
                        return (item.date.split("-")[0]=== date.format().toString().split("T")[0].split("-")[0])
                            &&(item.date.split("-")[1]=== date.format().toString().split("T")[0].split("-")[1])
                    }
                );
                if(list.length === 0){
                    this.totalSpent = 0;
                    this.totalEarned = 0;
                    this.recordShow=[];
                }else{
                    //计算totalSpent和totalEarned
                    let spentList = [];
                    let earnedList = [];
                    for(let i=0;i<list.length;i++){
                        list[i].type === "-"? spentList.push(list[i].number):earnedList.push(list[i].number)
                    }
                    this.totalSpent = getTotal(spentList);
                    this.totalEarned = getTotal(earnedList);

                    //初始化recordShow

                    list.sort(compareItemByDay);

                    let DateList = [];
                    let result = [];
                    DateList[0] = list[0].date;
                    result[0]= {
                        date: list[0].date,
                        items:[],
                        totalSpent:0,
                        totalEarned:0
                    };
                    for(let i=1;i<list.length;i++){
                        if(list[i].date !== DateList[0] &&
                            list[i].date !== list[i-1].date
                        ){
                            DateList.push(list[i].date);
                            result.push({
                                date: list[i].date,
                                items:[],
                                totalSpent:0,
                                totalEarned:0
                            })
                        }
                    }
                    //console.log(this.recordShow)

                    for(let i=0;i<DateList.length;i++){
                        result[i].date = DateList[i];
                        result[i].items=list.
                        filter(function (item) {return item.date === DateList[i]});

                        let spentList = [];
                        let earnedList = [];
                        for(let j=0;j<result[i].items.length;j++){
                            result[i].items[j].type === "-"?
                                spentList.push(result[i].items[j].number)
                                :earnedList.push(result[i].items[j].number)
                        }
                        result[i].totalSpent = getTotal(spentList);
                        result[i].totalEarned = getTotal(earnedList);
                    }
                    result.sort(compareItemByDay);

                    this.recordShow=result;
                }

            },
            onChange(value) {
                this.dateSelected = value;
                this.dateShow = value.format("YYYY 年 MM 月");
                this.fresh(value);
            },
            setBudget(){
                this.confirmVisible =true;
            },
            onOk(){
                const date = this.dateSelected.format().toString().split("T")[0];
                const dateStr = date.split("-")[0].concat(date.split("-")[1]);

                const budgetItem={
                    date:dateStr,
                    number:this.budget
                };
                this.$store.commit("setBudgetItem",budgetItem);
                this.confirmVisible =false;
            }



        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/style";
    .layoutWrapper{
        height: 100vh;
        /* Fallback for browsers that do not support Custom Properties */
        height: calc(var(--vh, 1vh) * 100);
        display: flex;
        flex-direction: column;

        > .nav{
            z-index: 1;
            flex-shrink: 0;
        }

        > .wrapper{
            flex-shrink: 0;
            background: $background-color-2;
            display: flex;
            flex-direction: column;
            padding: 0 6vw;
            font-weight: bolder;
            > .tittle{
                flex-shrink: 0;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                margin: 30px 0 20px 0;
                > p{
                    margin-left: 4px;
                    font-size: $fontsize-0*1.2;
                    color: $font-color-0;
                    font-weight: bolder;
                    letter-spacing: 3px;
                }
                > .anticon {
                    font-size: $fontsize-0;
                    color:$theme-color;
                    font-weight: bolder;
                    margin-right: 8px;
                }
            }
            > .dateWrapper{
                flex-shrink: 0;
                display: flex;
                align-items: center;
                > .date{
                    > span{
                        color:$font-color-0;
                        font-size: $fontsize-1;
                        letter-spacing: -1px;
                        display: flex;
                        align-items: center;
                        margin-left: 4px;

                        > .iconWrapper{
                            position: relative;
                            width: 20px;
                            height: 20px;
                            border-radius: 50%;
                            background: $font-color-0;
                            margin-left: 8px;
                            > .anticon{
                                position: absolute;
                                left: 50%;
                                top: 50%;
                                transform: translate(-50%,-50%);
                                color: white;
                                font-size: $fontsize-2;
                            }
                        }
                    }
                }

            }

            > .des{
                flex-shrink: 0;
                background: $background-color-1;
                border-radius: 8px;
                margin:8px 0 20px 0;
                padding: 12px 14px;
                > .tittle{
                    display: flex;
                    align-items: center;
                    > .anticon{
                        font-size: $fontsize-2*1.1;
                        color:$theme-color;
                    }
                    > p{
                        margin-left: 4px;
                        font-size: $fontsize-2;
                        color:$theme-color;
                    }

                }
                > .number{
                    font-size: $fontsize-0;
                    letter-spacing: -2px;

                    margin: 10px 0 0 0;
                    color:$font-color-0;

                }
                > .otherDes{
                    display: flex;
                    align-items: center;
                    font-size: $fontsize-2;

                    > .type{
                        color:$font-color-1;
                        margin-right: 5px;
                    }
                    > .number{
                        color:$font-color-3;
                        margin-right: 10px;
                        letter-spacing: -1px;
                    }

                }
            }

        }
        > .contentWrapper{
            flex-grow: 1;
            overflow: auto;
            background: $background-color-2;
            padding: 0 6vw;

        }
    }


</style>
