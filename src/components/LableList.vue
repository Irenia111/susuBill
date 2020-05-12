<template>
    <div>
        <div class="wrapper">
        <div class="label-item" v-for="item in showTagList" :key="item.index" @click="onChoseIcon(item)">
            <div class="icon-wrapper" :class="item.name===selectedItem.name && 'selected'"  ><my-icon class="icon" :name="item.iconName" ></my-icon></div>
            <p class="des">{{item.name}}</p>
        </div>
    <router-link to="/subjectedit" class="label-item">
        <div class="icon-wrapper"><a-icon type="setting"></a-icon></div>
        <p class="des">添加</p>
    </router-link>
        </div>
    </div>
</template>

<script>
    import MyIcon from "@/components/MyIcon";

    export default{
        name: "Lablelist",
        components:{MyIcon},
       created() {
            if(this.tagRecord){
                //console.log(this.tagRecord)
                this.selectedItem.index = this.tagRecord.index;
                this.selectedItem.name = this.tagRecord.name;
                this.selectedItem.iconName=this.tagRecord.iconName;
            }else{
                /*因为showTagList的值是一个回调，所以不能直接使用*/
                //console.log(this.showTagList)
                this.selectedItem.name = this.showTagList[0].name;
                this.selectedItem.index = this.showTagList[0].index;
                this.selectedItem.iconName = this.showTagList[0].iconName;

            }
        },
        watch:{
            showTagList:function () {
                this.selectedItem.name = this.showTagList[0].name;
                this.selectedItem.index = this.showTagList[0].index;
                this.selectedItem.iconName = this.showTagList[0].iconName;
            }
        },
        props:["showTagList","tagRecord"],
        data(){
            return{
                selectedItem:{
                    index: '',
                    name:'',
                    iconName:''
                }
            }

        },
        methods:{
            onChoseIcon(item){
                //console.log(item.index)
                this.selectedItem.index=item.index;
                this.selectedItem.name=item.name;
                this.selectedItem.iconName=item.iconName;
                this.$emit('update:value',JSON.parse(JSON.stringify(this.selectedItem)));

            }

        },


    }
</script>

<style lang="scss" scoped>
    @import '../assets/style';
    .wrapper{

        @extend %clearFix;

        .label-item{
            float:left;
            width: 16vw;
            height: 16vw;
            margin: 1.54vw;

            display:flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            font-size: $fontsize-3;

            > .icon-wrapper.selected{
                color: $background-color-1;
                background: $theme-color;
        }


            > .icon-wrapper {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height:40px;
                border-radius: 50%;
                font-size: $fontsize-1;

                > .anticon {
                    font-size: $fontsize-1;
                    color: inherit;
                }


            }
            > .des{
                font-size: $fontsize-2;
                color: inherit;
            }

        }

    }


</style>
