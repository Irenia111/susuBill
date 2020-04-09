<template>
    <div class="content">
        <VHeader path-name="0" :type="record.type" @update:value="onUpDateType">
            <router-link  to="/subject">
                <a-icon type="menu"></a-icon>
            </router-link>
        </VHeader>
            <LableList class="lable-List" :type="record.type" :label-index="0" @update="onUpDateLable"></LableList>
            <NumPad class="num"  @update="onUpDateContent" @save="saveRecord"></NumPad>
<!--
{{recordList}}
-->

    </div>

</template>

<script>
    import LableList from '@/components/LableList.vue';
    import VHeader from "@/components/Header.vue";
    import NumPad from "@/components/NumPad.vue";

    //设置本地数据库的版本号，方便之后升级数据库
    window.localStorage.setItem('version',"0.01");

    export default {
        name: "Money",
        components: {NumPad, VHeader, LableList},
        data(){
            return {
                record:{
                    type:'-',
                    label:'',
                    note:'',
                    date:'',
                    number:0.0
                },
                //从本地内存中取出recordList
                recordList:JSON.parse(window.localStorage.getItem('recordList'))||[],

            }
        },
        watch:{
            recordList:function () {
                window.localStorage.setItem("recordList",JSON.stringify(this.recordList));
            }
        },
        methods:{
            onUpDateType(value){
                this.record.type = value;
            },
            onUpDateLable(value){
                this.record.lable = value;
            },
            onUpDateContent(value){
                console.log(typeof (value.date));
                this.record.note = value.note;
                this.record.date = value.date;
                this.record.number = value.number;
            },

            saveRecord(saveflag){
                if(saveflag===true){
                    console.log("saveRecord");
                    /* this.recordList.push(this.record);
                    直接push对象，是对象的浅拷贝（引用），会将对象的的地址push进数组，导致每次都是最新的对象
                    需要深拷贝对象之后，再push
                     */
                    const deepCopy =JSON.parse(JSON.stringify(this.record));
                    this.recordList.push(deepCopy);
                    //这样的保存可能会重复，所以用watch监测recordList
                    // localStorage.setItem('recordList',JSON.stringify(deepCopy));

                }
            },
            //使用JSON.stringify()和JSON.parse()确实可以实现深拷贝，在新对象中修改对象的引用时，并不会影响老对象里面的值
            // 但是在JSON.stringify()做序列时，undefined、任意的函数以及symbol值，在序列化过程中会被忽略
            //通过递归实现深拷贝,但是这个代码似乎不能用
            /*
            copy(obj) {
                if (!obj || typeof obj !== 'object') {
                    return
                }
                let newObj = obj.constructor === Array ? [] : {}
                for (let key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (typeof obj[key] === 'object' && obj[key]) {
                            newObj[key] = this.copy(obj[key])
                        } else {
                            newObj[key] = obj[key]
                        }
                    }
                }
                return newObj
            },
             */

        }
    }
</script>


<style lang="scss" scoped>
    @import '../assets/style';
    .content{
        height: 100vh;
        /* Fallback for browsers that do not support Custom Properties */
        height: calc(var(--vh, 1vh) * 100);
        display: flex;
        flex-direction: column;
        background: $background-color-2;

        > .lable-List{
            flex-grow: 1;
            overflow: auto;
            border:1px black solid;
            margin: 10px 2.3vw 0px 2.3vw;
        }
        > .num{
            margin: 5px 2.3vw 10px 2.3vw;
        }
    }




</style>
