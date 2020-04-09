<template>
    <div class="wrapper">
        <VHeader pathName="1" :type="label.type" @update:value="onUpdateType">
            <button @click="save">确定</button>
        </VHeader>
            <div class="iconShow">
                <div class="iconSelected">
                    <my-icon :name="iconData"></my-icon>
                </div>
            </div>
        <input class="labelName" type="text" placeholder="类型名称（不超过四个汉字）"/>
            <div class="iconList" >
                <ul></ul>
            </div>
    </div>

</template>

<script>
    import VHeader from "@/components/Header.vue";
    import MyIcon from "@/components/MyIcon";
    export default {
        name: "SubjectEdit.vue",
        components: {VHeader,MyIcon},

        beforeCreate: function () {

                const self = this;
                this.$http.get("").then(response => {
                    console.log('数据加载成功')
                    console.log(JSON.parse(response.data));
                    // self.tableContent.push(response.body);
                }, response => {
                    console.log('数据加载失败')
                })


        },
        data(){
            return{
                label:{
                    type:"-",
                    iconName:"",
                    name:""
                }
            }
        },
        methods:{
            onUpdateType(type){
                this.label.type = type;
            },
            save(){
                console.log("saveEdit");
            }
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

        >.iconShow{
            height:20vh;
            display: flex;
            align-items: center;
            justify-content: center;

            >.iconSelected{
                height: 84px;
                width: 84px;
                background: green;
                border-radius: 50%;
            }

        }
        > .labelName{
            height:42px;
            margin: 0px 20px 20px 20px;
            background: $background-color-1;
            border-radius: 5px;
            box-shadow: 0px 0px 8px rgba(0,0,0,0.015);
            text-align: center;

        }

        >.iconList{
            border:black 1px solid;
            flex-grow:1;
            overflow: auto;
        }

    }

</style>
