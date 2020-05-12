<template>
    <ol class="recordList">
        <li class="recordItem" v-for="item in record" :key="item.id">
            <div class="iconWrapper">
                <my-icon :name="item.iconName"></my-icon>
            </div>
            <div class="des">
                <div class="record">
                    <div class="recordName">
                        <p class="name">{{item.name}}</p>
                        <p class="recordPercent">{{item.percent}}</p>
                    </div>
                    <div class="recordNum">
                        <p>{{item.total}}</p>
                    </div>
                </div>
                <div class="chartBackground">
                    <div class="chartBody" :style="'width :'+ item.percent"></div>
                </div>
            </div>
        </li>
    </ol>
</template>

<script>
    export default {
        name: "ChartRecordList",
        props:["record"]
    }
</script>

<style lang="scss" scoped>

    @import "../assets/style";

    .recordList{
        background: $background-color-1;
        border-radius: 8px;
        padding: 0 15px;
        margin-bottom: 20px;
        >.recordItem{
        border-bottom: 1px solid $background-color-2;
        display: flex;
        align-items:center;
        padding: 15px 0;
             >.iconWrapper{

        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: $theme-color;

        display: flex;
        align-items: center;
        justify-content: center;
                 >.icon {
        font-size: $fontsize-1;
        color: white;
    }
    }

    >.des{
        flex-grow: 1;
        margin-left: 16px;

        display: flex;
        flex-direction: column;

        > .record{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 4px;
            > .recordName{
                display: flex;
                align-items: center;
                > .name{
                    font-weight: bolder;
                    font-size: $fontsize-2;
                    color: $font-color-0;
                }
                > .recordPercent{
                    margin-left: 10px;
                    font-size: $fontsize-2;
                    color: $font-color-2;
                }
            }
            > .recordNum{
                font-size: $fontsize-2;
                color: $font-color-0;
            }

        }
        > .chartBackground{
            position: relative;
            border-radius: 4px;
            width: 100%;
            height:6px;
            background: $background-color-2;

            > .chartBody{
                position: absolute;
                width: 50%;
                height:6px;
                background: $theme-color;
                border-radius: 4px;
            }
        }


    }


    }

    }

</style>
