<template>
    <div class="content">
        <VHeader class="myHeader" :type="record.type" @update:value="onUpDateType">
            <button @click="deleteItem">删除</button>
        </VHeader>
            <LableList class="lable-List" :type="record.type" :show-tag-list="showTagList" :tagRecord="record.tag" @update:value="onUpDateTag"></LableList>
            <NumPad class="num"  @update="onUpDateContent" @save="saveRecord" :recordItem="record"></NumPad>
        <a-modal :title="confirmVisible2?'确认修改':'确认删除'" v-model="confirmVisible1" @ok="handleOk" cancelText="取消" okText="确认">
            <p>{{confirmVisible2?"保存当前账目记录修改？":"删除当前账目记录？"}}</p>
        </a-modal>

    </div>

</template>

<script>
    import LableList from '@/components/LableList.vue';
    import VHeader from "@/components/Header.vue";
    import NumPad from "@/components/NumPad.vue";
    //import {getTagRecord} from "@/api";

    //设置本地数据库的版本号，方便之后升级数据库
    window.localStorage.setItem('version',"0.01");

    export default {
        name: "MoneyEdit",
        components: {NumPad, VHeader, LableList},
        data(){
            return {
                record:{
                    id:"",
                    type:'-',
                    tag:{
                        index:0,
                        name:"",
                        iconName:""
                    },
                    note:'',
                    date:'',
                    number:0.0,
                },
                confirmVisible1:false,
                confirmVisible2:false
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
        beforeCreate() {
            this.$store.commit("fetchTagRecord");
            this.$store.commit("fetchRecordList");

        },
        created(){
            const index = this.$route.params.index;

            let itemIndex = -1;
            for(let i=0;i<this.recordList.length;i++){
                if(this.recordList[i].id === index){
                    itemIndex = i;
                    break;
                }
            }

            //console.log( this.recordList[itemIndex])

            const item = this.recordList[itemIndex];
            this.record.id=item.id;
            this.record.type=item.type;
            this.record.tag=JSON.parse(JSON.stringify(item.tag));
            this.record.note=item.note;
            this.record.date=item.date;
            this.record.number=item.number;

            this.$store.commit("initShowTagList",this.record.type);
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
            deleteItem(){
                this.confirmVisible1 = true;
            },
            handleOk(){
                if(this.confirmVisible2===true){
                    this.$store.commit("editRecordList",this.record);
                    this.$message.loading('修改成功');
                    this.confirmVisible2 = false;
                }
                else{
                    this.$store.commit("deleteRecordItem",this.record.id);
                    this.$message.loading('删除成功')
                }
                this.confirmVisible1 = false;
                this.$router.back();

            },
            //这是一个异步的函数，所以修改的值传不出去，只能用promise传出
            saveRecord(saveFlag){
                if(saveFlag===true){
                    this.confirmVisible2 = true;
                    this.confirmVisible1 = true;
                }
            },
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
            flex-shrink: 0;
            min-height: 8vh;
        }

        > .lable-List{
            flex-grow: 1;
            overflow: auto;
            margin: 1.54vw 2.3vw 0px 2.3vw;
        }
        > .num{
            flex-shrink: 0;
            margin: 1.54vw 2.3vw 3.08vw 2.3vw;
        }
    }




</style>
