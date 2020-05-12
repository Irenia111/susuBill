<template>
    <ve-line
            :data="chartData"
             :settings="chartSettings"
             width="100%"
             :height="chartHeight"
             :legend-visible="false"
             :grid="grid"
             :colors="colors"
             :set-option-opts="false"
    >
    </ve-line>
</template>

<script>
    export default {
        name: "LineChart",
        props:["chartHeight","dataList"],
        methods:{
            initData(data){
                if(data===[]){

                }else{
                    let result = [];
                    result[0]={
                        '日期':data[0].date,
                        '金额':data[0].total
                    };
                    for(let i=1; i<data.length;i++){
                        result.push({
                            '日期':data[i].date,
                            '金额':data[i].total
                        })
                    }
                    return result;
                }
            }
        },

        watch:{
            dataList(){
                //console.log("change")
                this.chartData.rows=[];
                this.chartData.rows= this.initData(this.dataList)
                //console.log(this.chartData.rows)
            }
        },
        data () {
            return {
                chartSettings:{
                    xAxisType: 'category',
                    yAxisType: ['KMB','KMB'],
                    area:true,
                    axisSite:{ right: ['金额'] },
                    scale:[true,true]
                },
                colors :['#ff4c00'],
                grid:[{
                    left: 0,
                    right: 0,
                }],
                //extens是设置echarts的配置
                lineChartExtens : {
                    xAxis: {
                        show:true
                    }
                },
                chartData: {
                    columns: ['日期', '金额'],
                    rows: []
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/style";




</style>
