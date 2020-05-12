<template>
    <div class="content">
        <VHeader class="myHeader" :type="record.type" @update:value="onUpDateType">
            <router-link  to="/subject">
                <a-icon type="menu"></a-icon>
            </router-link>
        </VHeader>
            <LableList class="lable-List" :type="record.type" :show-tag-list="showTagList" @update:value="onUpDateTag"></LableList>
            <NumPad class="num"  @update="onUpDateContent" @save="saveRecord"></NumPad>
        <a-modal title="保存确认" v-model="confirmVisible" @ok="handleOk" cancelText="取消" okText="确认">
            <p>保存当前账目记录？</p>
        </a-modal>





<!--
{{recordList}}
{{record.type}}
{{showTagList}}
{{tagList}}
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
                    id:"",
                    type:'-',
                    tag:{
                        index:"",
                        name:"",
                        iconName:""
                    },
                    note:'',
                    date:'',
                    number:0.0,
                },
                //从本地内存中取出recordList
                //recordList:JSON.parse(window.localStorage.getItem('recordList'))||[],
                //tagList:{},
                //showTagList:[],
                confirmVisible:false,
            }
        },
        computed: {
            tagList(){
                   return this.$store.state.tagRecord
            },
            showTagList:{
                get:function(){
                    return this.$store.state.showTagRecord;
                },
                set:function(newValue){
                    //console.log("setter")
                    this.$store.state.showTagRecord = newValue;
                    this.record.tag.index = this.$store.state.showTagRecord[0].index;
                    this.record.tag.name = this.$store.state.showTagRecord[0].name;
                    this.record.tag.iconName = this.$store.state.showTagRecord[0].iconName;


                }
            },
            recordList(){
                return this.$store.state.recordList;
            }

        },
        created(){
            this.$store.commit("fetchTagRecord");
            this.$store.commit("initShowTagList",this.record.type);
            this.$store.commit("fetchRecordList");

            /*
            getTagRecord().then((tagList)=>{
                this.tagList = tagList;
                console.log(this.record.type);
                const type = this.record.type;
                this.showTagList = this.tagList.filter(function(item){return  item.type === type;});
                //初始化选中的icon
                //this.iconChoseName = this.showTagList[0].iconName;
            });
            */

        },
        methods:{
            onUpDateType(value){
                this.record.type = value;
                //这里需要更新对应的showTagList
                this.showTagList = this.tagList.filter(function(item){return  item.type === value;});
            },
            onUpDateTag(value){
               //console.log(value)
                this.record.tag = value;
            },
            onUpDateContent(value){
                //console.log(typeof (value.date));

                this.record.note = value.note;
                this.record.date = value.date;
                this.record.number = value.number;
            },

            //这是一个异步的函数，所以修改的值传不出去，只能用promise传出


            saveRecord(saveflag){
                if(saveflag===true){

                    if(!this.record.tag.iconName){
                        this.record.tag.index = this.$store.state.showTagRecord[0].index;
                        this.record.tag.name = this.$store.state.showTagRecord[0].name;
                        this.record.tag.iconName = this.$store.state.showTagRecord[0].iconName;


                    }

                        this.confirmVisible = true;
                        //因为handleOk是异步的，所以要在handleok内完成保存
                        this.handleOk;


                }
            },
            handleOk() {
                //console.log(e.target.textContent);
                const date = new Date().toISOString();
                this.record.id= Date.parse(date).toString();
                //console.log( typeof Date.parse(new Date()).toString())
                this.$store.commit("saveRecordList",this.record);
                //这里在调用时采用函数的方式，就会直接赋值false，但是修改之后就可以用了，有些奇怪
                this.confirmVisible = false;
                //console.log(e.target.textContent);
                //console.log("saveRecord");
                /* this.recordList.push(this.record);
                直接push对象，是对象的浅拷贝（引用），会将对象的的地址push进数组，导致每次都是最新的对象
                需要深拷贝对象之后，再push
                 */
                //const deepCopy =JSON.parse(JSON.stringify(this.record));
                //this.recordList.push(deepCopy);
                //this.saveConfirm=false;
                //这样的保存可能会重复，所以用watch监测recordList
                // localStorage.setItem('recordList',JSON.stringify(deepCopy));
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

        > .myHeader{
            min-height: 8vh;
        }

        > .lable-List{
            flex-grow: 1;
            overflow: auto;
            margin: 1.54vw 2.3vw 0 2.3vw;
        }
        > .num{
            margin: 1.54vw 2.3vw 3.08vw 2.3vw;
        }
    }




</style>
