<template>
        <div class="wrapper">
                <VHeader class="myHeader" :type="recordType" @update:value="onUpDateType">
                        <button @click="goto">添加</button>
                </VHeader>
                <div class="tagListWrapper">
                        <!--{{showTagList}} -->

                <ul class="tagList">
                        <li class="tagItem" v-for="item in showTagList" :key="item.index">
                                <div class="iconRight" @click="delTagRecord(item.name)"><a-icon type="minus-circle" theme="filled" /></div>
                                <div class="tagContent">
                                        <div class="iconWrapper"><my-icon  :name="item.iconName"/></div>
                                        <p class="des">{{item.name}}</p>
                                </div>
                                <div class="iconLeft" >
                                        <router-link :to="`/subjectreedit/${item.index}`">
                                        <a-icon type="menu"></a-icon>
                                        </router-link>
                                </div>
                        </li>

                </ul>

                </div>

                <a-modal title="保存删除" v-model="confirmVisible" @ok="handleOk" cancelText="取消" okText="确认">
                        <p>删除当前记录类目？</p>
                </a-modal>


        </div>

</template>

<script>
    import VHeader from "@/components/Header.vue";
    export default {
        name: "Subject",
        components:{VHeader},
        created(){
                    this.$store.commit("fetchTagRecord");
                    this.$store.commit("initShowTagList",this.recordType)
        },
        data(){
                return{
                        recordType:"-",
                        confirmVisible:false,
                        delItemName:""
                }
        },
        computed: {
              tagList(){
                   return this.$store.state.tagRecord
              },
              showTagList:{
                  get:function(){
                     //console.log("getter")
                     return this.$store.state.showTagRecord;
              },
                  set:function(newValue){
                  //console.log("setter")
                   this.$store.state.showTagRecord = newValue;
                    }
               }
            },

        methods:{
              onUpDateType(type){
                   this.recordType = type;
                   this.showTagList = this.tagList.filter(function(item){return  item.type === type;});
              },
               goto(){
                      this.$router.push("/subjectedit");
              },
               delTagRecord(name){
                     this.delItemName = name;
                     this.confirmVisible=true;
                    },
               handleOk(){
                    this.$store.commit("deleteTagRecord",this.delItemName);
                    this.$store.commit("initShowTagList",this.recordType);
                    this.confirmVisible=false;
                    //this.refresh()
                    // 页面刷新没有用，因为是数据的改变，所以重新加载ShowTagLis
                    }

            },

    }
</script>

<style scoped lang="scss">
        @import '../assets/style';
        .wrapper{
                height: 100vh;
                /* Fallback for browsers that do not support Custom Properties */
                height: calc(var(--vh, 1vh) * 100);
                display: flex;
                flex-direction: column;

                > .myHeader{
                        flex-shrink: 0;
                        min-height: 8vh;
                        z-index: 1;
                }


                >.tagListWrapper{
                        padding: 25px 6vw;
                        overflow: auto;
                        flex-grow: 1;
                        background: $background-color-2;
                        >.tagList{
                                background: $background-color-1;
                                border-radius: 8px;
                                padding: 0 15px;
                                >.tagItem{
                                        border-bottom: 1px solid $background-color-2;
                                        display: flex;
                                        justify-content: space-between;
                                        align-items:center;
                                        padding: 15px 0;

                                        >.iconRight{

                                                >.anticon {
                                                        font-size: $fontsize-1;
                                                        color: red;
                                                }
                                        }

                                        >.tagContent{

                                                flex-grow: 1;
                                                margin-left: 16px;

                                                display: flex;
                                                align-items: center;
                                                >.iconWrapper{

                                                        height:38px;
                                                        width:38px;
                                                        border-radius: 50%;
                                                        display: flex;
                                                        justify-content: center;
                                                        align-items: center;
                                                        background: $theme-color;
                                                        color:white;
                                                        font-size: $fontsize-1;




                                                }
                                                >.des{
                                                        margin-left: 16px;
                                                        color:$font-color-0;
                                                        font-size: $fontsize-2*1.1;
                                                        letter-spacing: 1px;
                                                }


                                        }
                                        >.iconLeft{

                                                >.anticon {
                                                        font-size: $fontsize-1;
                                                }
                                        }

                                }

                        }

                }

        }



</style>
