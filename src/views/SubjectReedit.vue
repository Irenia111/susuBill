<template>
    <div class="wrapper">
        <VHeader class="myHeader" :type="tagType" @update:value="onUpdateType">
            <button @click="save">保存</button>
        </VHeader>
        <div class="contentWrapper">
            <div class="iconShow">
                <div class="iconSelected">
                    <MyIcon :name="iconChoseName" class="icon"></MyIcon>
                </div>
            </div>
            <input class="labelName" type="text" v-model="label.name" placeholder="类型名称（不超过四个汉字）"/>
            <div class="iconListWrapper">
                <ul  class="iconList">
                    <li class="iconShow"  v-for="item in showTagList" :key="item.index" @click="onChangeIcon(item.iconName)">
                        <div   :class="item.iconName===iconChoseName && 'selected'">
                            <MyIcon :name="item.iconName" class="icon"></MyIcon>
                        </div>
                    </li>

                </ul>
            </div>
        </div>

        <a-modal title="保存确认" v-model="confirmVisible" @ok="handleOk" cancelText="取消" okText="确认">
            <p>保存记录类目修改？</p>
        </a-modal>

    </div>

</template>

<script>
    import VHeader from "@/components/Header.vue";
    import MyIcon from "@/components/MyIcon";
    import {getTagData} from "@/api";



    export default {
        name: "SubjectEdit.vue",
        components: {VHeader,MyIcon},
        computed: {
         tagRecord(){
                return this.$store.state.tagRecord
         },
        },
        beforeCreate() {
            this.$store.commit("fetchTagRecord");
        },
        created() {

            getTagData().then((tagList)=>{
                this.tagList = tagList;
                //console.log(this.tagType);
                const type = this.tagType;
                this.showTagList = tagList.filter(function(item){return  item.type === type;});
            })

        },
        mounted(){
            const index = this.$route.params.index;
            //console.log(index);
            let itemIndex = -1;
            for(let i=0;i<this.tagRecord.length;i++){
                if(this.tagRecord[i].index+"" === index){
                    //console.log(this.tagRecord[i]);
                    itemIndex = i;
                    break;
                }
            }
            //console.log(this.tagRecord);
            //console.log(itemIndex);
            //这个方法不能用
            //const item = this.tagRecord.filter(function(item){return item.index === index;});
            const item = this.tagRecord[itemIndex];
            //console.log(item);
            this.tagType = item.type;
            this.label = item;
            this.iconChoseName = item.iconName;
            //console.log(this.tagRecord[index].type);
            //因为删除了tagRecord的项目之后，index和顺序不匹配，所以不能用这种写法了
            //this.tagType = this.tagRecord[index].type;
           //this.label = this.tagRecord[index]
           //this.iconChoseName = this.tagRecord[index].iconName
        },
        data(){
            return{
                label:{
                    index:0,
                    type:"",
                    iconName:"",
                    name:""
                },
                tagList:{},
                showTagList:{},
                tagType:"",
                iconChoseName:"",
                confirmVisible:false
            }
        },
        methods:{
            onUpdateType(type){
                this.tagType = type;
                this.showTagList = this.tagList.filter(
                    (item)=>{

                        return  item.type === type;
                    }
                )
                this.iconChoseName = this.showTagList[0].iconName;

            },
            onChangeIcon(value){
                console.log(value)
                this.iconChoseName = value;
            },
            save(){
                if(this.label.name.length > 4){
                    this.$message.warning('类型名称超过四个汉字')
                }else if(this.label.name===""){
                    this.$message.warning('请输入类型名称')
                }else{
                    this.$store.commit("nameCheck",this.label.name);

                    if(this.$store.state.tagNameCheckFlag===true){
                        this.$message.warning('已存在同名项目，请修改类型名称')
                    }else{
                        this.confirmVisible=true;
                        this.label.type = this.tagType;
                        this.label.iconName = this.iconChoseName;
                    }
                }


            },
            handleOk() {
                this.$store.commit("editTagRecord",this.label)
                this.confirmVisible = false;
                this.$message.loading('保存成功')
                this.$router.back();
            },

        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/style";
    .wrapper{
        background: $background-color-2;
        display: flex;
        flex-direction: column;
        height: 100vh;
        /* Fallback for browsers that do not support Custom Properties */
        height: calc(var(--vh, 1vh) * 100);
        width: 100vw;

        >.myHeader{
            min-height: 8vh;
        }

        > .contentWrapper{
            padding: 0px 5.4vw;
            display: flex;
            flex-direction: column;


            >.iconShow{
                height:20vh;
                display: flex;
                align-items: center;
                justify-content: center;

                >.iconSelected{
                    height: 84px;
                    width: 84px;
                    color: $background-color-1;
                    background: $theme-color;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    >.icon{
                        font-size: $fontsize-0;
                    }
                }

            }
            > .labelName{
                height:42px;
                margin:0px 0px 5.4vw 0px;
                background: $background-color-1;
                border-radius: 5px;
                box-shadow: 0px 0px 8px rgba(0,0,0,0.015);
                text-align: center;

            }

            >.iconListWrapper{
                height: 60vh;
                overflow: auto;
                margin: 3vw -4.15vw 0px -4.15vw;
                padding-top: 2vw;


                > .iconList{
                    @extend %clearFix;
                    > .iconShow{
                        float:left;
                        width: 11.2vw;
                        height: 11.2vw;
                        border-radius: 50%;
                        background: $tag-background-corlor;
                        font-size: $fontsize-2-1;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0px 4.15vw 7vw 4.15vw;

                        > .selected{
                            width: 11.2vw;
                            height: 11.2vw;
                            border-radius: 50%;
                            background: $selected-background-color;
                            font-size: $fontsize-2-1;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            position: relative;

                        }
                        > .selected::after{
                            content:"";
                            position: absolute;


                            width: 15vw;
                            height:15.2vw;
                            border-radius: 50%;
                            border: $selected-border 3px solid;


                        }

                    }
                }
            }

        }

    }

</style>
