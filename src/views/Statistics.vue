<template>
    <div class="layoutWrapper">

        <div class="tabWrapper">
                <my-tab  class="tab" :tab-item="tab1" @update:selectedTab="onUpDateDateType"></my-tab>
                <my-tab  class="tab" :tab-item="tab2" @update:selectedTab="onUpDateTagType"></my-tab>
        </div>
        <div class="statistics">
            <div class="tittleWrapper">
                <div class="tittle">

                    <p class="totalName">{{recordType==="-"?"总支出":"总收入"}}</p>
                    <p class="totalNumber">{{total}}</p>

                    <div class="dateWrapper">


                        <a-month-picker class="date" :locale="locale" v-model="dateSelected"
                                        placeholder="请选择" @change="onChange">
                            <span style="font-weight: bold">{{dateShow}}<span class="iconWrapper"><a-icon type="caret-down"/></span></span>
                        </a-month-picker>

                    </div>
                    <div class="chart">
                        <line-chart chartHeight="370px" :dataList="chartData" ></line-chart>
                    </div>
                </div>
                <p class="name">明细</p>
            </div>
            <div class="recordWrapper">
                <chart-record-list :record="recordShow"></chart-record-list>
            </div>
        </div>

        <my-nav class="nav"></my-nav>
    </div>
</template>

<script>
    import MyTab from "@/components/MyTab";
    import MyNav from "@/components/MyNav";
    import ChartRecordList from "@/components/ChartRecordList";
    import LineChart from "@/components/LineChart";

    import moment from 'moment';
    import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
    import 'moment/locale/zh-cn';

    import {getTotal, compareItemByTotal,compareItemByName} from "@/api";
    export default {
        name: "Statistics",
        components: {LineChart, ChartRecordList, MyNav, MyTab},
        data(){
            return{
                locale,
                tab1:["月","年"],
                tab2:["支出","收入"],
                dateSelected:moment(),
                dateShow: moment().format("YYYY 年 MM 月"),
                dateUsed: moment().format().toString().split("T")[0],
                dataType:"月",
                tagType:"支出",
                recordType:"-",
                total:0,
                recordShow:[],
                chartData:[]
            }
        },
        beforeCreate() {
            this.$store.commit("fetchRecordList");
            //console.log(this.$store.state.recordList);
        },
        mounted(){
            this.freshRecordShow(this.recordType,this.dataType,moment().format().toString().split("T")[0]);
            this.freshChartData(this.recordType,this.dataType,moment().format().toString().split("T")[0]);

        },
        methods:{
            onUpDateDateType(value){
                this.dataType = value;

                this.freshRecordShow(this.recordType,this.dataType,this.dateUsed);
                this.freshChartData(this.recordType,this.dataType,this.dateUsed);

            },
            onUpDateTagType(value){
                this.tagType = value;
                this.recordType = value === "支出"? "-":"+";
                //console.log(this.recordType)
                //console.log(this.dateUsed)
                this.freshRecordShow(this.recordType,this.dataType,this.dateUsed);
                this.freshChartData(this.recordType,this.dataType,this.dateUsed);

            },
            freshRecordShow(type,dateType,date){
                let list = [];
                if(dateType==="月"){
                    list = this.$store.state.recordList.filter(
                        function (item) {
                            return (item.date.split("-")[0]=== date.split("-")[0] )&&(item.date.split("-")[1]===  date.split("-")[1])&&(item.type === type)
                        })
                }else{
                     list = this.$store.state.recordList.filter(
                        function (item) {
                            return (item.date.split("-")[0]=== date.split("-")[0])&&(item.type === type)
                        })
                }

                if(list.length === 0){
                    this.total = 0;
                    this.recordShow=[];
                }else{


                    //计算total
                    this.total = getTotal(list.map(item => item.number));

                    //初始化recordShow,先排序，之后好去重
                    //console.log(TagList)
                    list.sort(compareItemByName);
                    let NameList=[];
                    let result = [];
                    NameList[0]=list[0].tag.name;
                    result[0]= {
                        id:0,
                        name: list[0].tag.name,
                        iconName: list[0].tag.iconName,
                        items:[],
                        total:0,
                        percent:0
                    };
                    for(let i=1;i<list.length;i++){
                        if((list[i].tag.name !== NameList[0])
                            && (list[i].tag.name !== list[i-1].tag.name)){
                            NameList.push(list[i].tag.name);
                            result.push({
                                id:i,
                                name: list[i].tag.name,
                                iconName: list[i].tag.iconName,
                                items:[],
                                total:0,
                                percent:0
                            })
                        }
                    }

                    //console.log(NameList)
                    //console.log(result)

                    for(let i=0;i<NameList.length;i++){

                        let numberList=list.
                        filter(function (item) {return item.tag.name === NameList[i]});
                        numberList = numberList.map(item => item.number);
                        //console.log(numberList);

                        result[i].total = getTotal(numberList);
                        result[i].percent = ((Math.round((
                            (result[i].total/this.total) * 10000)))/100.00)
                            .toFixed(2)+"%"
                    }
                    result.sort(compareItemByTotal);
                    //console.log(this.recordShow)
                    this.recordShow=result;

                }
            },
            freshChartData(type,dateType,date,){
                //console.log("fresh");
                this.chartData=[];
                //console.log(this.chartData);

                let list = [];
                let dateRange = 0;

                if(dateType==="月"){
                    list = this.$store.state.recordList.filter(
                        function (item) {
                            return (item.date.split("-")[0]=== date.split("-")[0])&&(item.date.split("-")[1]===  date.split("-")[1]) &&(item.type === type)
                        });
                    dateRange=31;
                }else{
                    list = this.$store.state.recordList.filter(
                        function (item) {
                            return (item.date.split("-")[0]=== date.split("-")[0]) &&(item.type === type)
                        });
                    dateRange=12;
                }

                this.chartData=[];
                for(let i=0;i<dateRange;i++){
                    this.chartData.push(
                        {
                        date:(i+1).toString(),
                        total:0
                        })
                }

                if(list.length !== 0){
                    for(let i=0;i<dateRange;i++){
                        const numberList = list.filter(
                            function (item) {
                                //console.log(item.date.split('-')[2]-0)
                                return item.date.split('-')[2]-0 === i+1}
                        ).map(item=>item.number);
                        //console.log(numberList)
                        this.chartData[i].total = getTotal(numberList)
                    }
                }
                //console.log(this.chartData);


            },
            onChange(value) {

                this.dateSelected = value;
                this.dateShow = value.format("YYYY 年 MM 月");
                this.dateUsed = value.format().toString().split("T")[0];


                this.freshRecordShow(this.recordType,this.dataType,this.dateUsed);
                this.freshChartData(this.recordType,this.dataType,this.dateUsed);

            }

        }
    }
</script>

<style lang="scss" scoped>
    @import '../assets/style';

    .layoutWrapper{
        height: 100vh;
        /* Fallback for browsers that do not support Custom Properties */
        height: calc(var(--vh, 1vh) * 100);
        display: flex;
        flex-direction: column;
        background: $background-color-2;
        > .nav{
            z-index: 1;
            background: $background-color-1;
        }
        > .tabWrapper{
            padding: 0 6vw;
            margin: 5vw 0 4vw 0;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
        }
        > .statistics{
            padding: 0 6vw;
            flex-grow: 1;
            overflow: auto;

            > .tittleWrapper{
                font-size: $fontsize-2-1;
                font-weight: bolder;
                color: $font-color-2;

                > .tittle{
                    background: $background-color-1;
                    border-radius: 8px;
                    padding: 14px;
                    > .totalName{
                        font-size: $fontsize-2-1*1.1;
                        color: $font-color-3;
                        letter-spacing: 1px;

                    }
                    > .totalNumber{
                        margin-top: 3px;
                        font-size: $fontsize-0;
                        color:$font-color-0;
                        font-family: Consolas;
                    }

                    > .dateWrapper {
                        display: flex;
                        align-items: center;
                        margin-bottom: 10px;

                        > .date {
                            > span {
                                display: flex;
                                align-items: center;
                                color: $font-color-2;
                                font-size: $fontsize-2-1;
                                > .iconWrapper {
                                    position: relative;
                                    width: 20px;
                                    height: 20px;
                                    border-radius: 50%;
                                    background: $font-color-1;
                                    margin-left: 6px;

                                    > .anticon {
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
                    > .chart{
                        margin: 5px 0;
                        height: 260px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        overflow: hidden;

                    }
                }
                > .name{
                    margin: 2vw 0 1vw 10px;
                    font-size: $fontsize-1;
                    letter-spacing: 1px;
                    color: $font-color-0;
                    font-weight: bolder;

                }

            }
            > .recordWrapper{

            }
        }

    }

</style>
