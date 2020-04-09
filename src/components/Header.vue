<template>
    <header>

        <div  class="link" @click="goPath()">
            <a-icon type="left"></a-icon>
        </div>

        <ul class="type">
            <li :class="type === '-'&& 'selected'" @click="selectType('-')">支出</li>
            <li :class="type === '+'&& 'selected'" @click="selectType('+')">收入</li>
        </ul>
        <div class="link">
            <slot></slot>
        </div>
    </header>
</template>

<script lang="ts">

    import Vue from 'vue';
    import {Component,Prop,Watch} from "vue-property-decorator";

    @Component
    export default class VHeader extends Vue {
        //type:string = '-';


        @Prop(String)
        readonly type!: string;

        selectType(type: string){
            if(type !== '-'&& type !== '+'){
                throw new Error("type is unknown");
            }

            this.$emit('update:value',type);
        }




        @Prop(String)
        readonly pathName!: string;

        path: Array<string> =["/home","/money"];

        goPath(){
            if(this.pathName === '0'){
                this.$router.push(this.path[0]);
            }else{
                this.$router.push(this.path[1]);
            }



                    }




    }
</script>

<style lang="scss">
    //为了slot传进来的组件
    @import '../assets/style';

    .anticon {
                font-size: $fontsize-1;
                color:black;
            }
     button{
            color: red;
        }

</style>

<style lang="scss" scoped>
    @import '../assets/style';
    header{
        display:flex;
        align-items: center;
        background:$background-color-1;
        justify-content: space-between;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
        > .link{
            margin: 10px 10px;

                > .anticon {
                    font-size: $fontsize-1;
                    color:black;
                }
            > a{
                display:block;
                > .anticon {
                    font-size: $fontsize-1;
                    color:black;
                }
            }
            > button{
                font-size: $fontsize-2-1;
                color: red;
            }
        }

        .type {
            align-self: center;
            display: flex;
            flex-direction: row;
            background: $background-color-3;
            padding:2px;
            border-radius: 8px;

            > li {
                justify-content: center;
                align-items: center;
                padding: 4px 20px;
                font-size: $fontsize-3;
                border-radius: 5px;
            }
            > li.selected{
                background: $background-color-1;
                box-shadow: 0px 0px 4px rgba(0,0,0,0.15);
            }

        }
    }

</style>
