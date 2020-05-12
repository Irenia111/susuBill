<template>
    <div class="recordListWrapper">
        <div class="desWrapper">
        <div class="date">{{record.date}}</div>
        <div class="des">
            <div class="detail">
                支出: <span>{{record.totalSpent}}</span>
            </div>
            <div class="detail">
                收入: <span>{{record.totalEarned}}</span>
            </div>


        </div>
    </div>
        <div class="recordList">
            <ol  v-for="item in record.items" :key="item.id">
                <li class="recordItem" @click="goto(item.id)">
                    <div class="iconWrapper"><my-icon class="icon" :name="item.tag.iconName"/></div>
                    <div class="des">
                        <p class="name">{{item.tag.name}}</p>
                        <p class="note">{{item.note}}</p>
                    </div>
                    <div class="numberWrapper">
                        <span>{{item.type}}</span>
                        <span>{{item.number}}</span>
                    </div>
                </li>
            </ol>
        </div>

    </div>
</template>

<script>
    export default {
        name: "RecordList",
        props:["record"],
        methods:{
            goto(id){
            const path="/moneyedit/"+id ;
            this.$router.push(path);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/style";
    .recordListWrapper{
        margin-bottom: 20px;
        > .desWrapper{
            margin:10px 4px 6px 4px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: $fontsize-3;
            color:$font-color-2;
            > .date{
                margin-left: 4px;
            }
            > .des{
                display: flex;
                align-items: center;
                > .detail{
                    margin-right: 8px;
                    > span{
                        letter-spacing: -1px;
                    }
                }

            }
        }
        > .recordList{
            background: $background-color-1;
            border-radius: 8px;
            padding: 0 15px;
            > ol{
                >.recordItem{
                    border-bottom: 1px solid $background-color-2;
                    display: flex;
                    justify-content: space-between;
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
                        margin-left: 20px;

                        display: flex;
                        flex-direction: column;
                        align-items:flex-start;

                        > .name{
                            font-size: $fontsize-2*1.1;
                            font-weight: bold;
                            color: $font-color-0;
                            letter-spacing: 1px;
                        }
                        > .note{
                            font-size: $fontsize-3;
                            color: $font-color-2;
                        }
                    }
                    >.numberWrapper{
                        font-size: $fontsize-2;
                        color: $font-color-0;
                        letter-spacing: -1px;
                    }

                }
            }
        }

    }

</style>
