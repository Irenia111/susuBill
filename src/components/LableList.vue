<template>
    <div class="wrapper">

    <router-link to="/subjectedit" class="label-item">
        <div class="icon-wrapper"><a-icon type="setting"></a-icon></div>
        <p>添加</p>
    </router-link>

    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component,Prop} from 'vue-property-decorator';

    @Component
    export default class LableList extends Vue {

        @Prop(String)
        readonly type !: string;


    }
</script>

<style lang="scss" scoped>
    @import '../assets/style';
    .label-item{
        display:flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        font-size: $fontsize-3;

        > .icon-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height:30px;
            background: greenyellow;
            border-radius: 50%;
            > .anticon {

                font-size: $fontsize-1;
                color: inherit;
            }
        }

    }

</style>
