<template>
    <ul class="tabWrapper">
        <li :class="tabSelected === tabItem[0]&& 'selected'" @click="selectTab">{{tabItem[0]}}</li>
        <li :class="tabSelected === tabItem[1]&& 'selected'"  @click="selectTab">{{tabItem[1]}}</li>
    </ul>
</template>

<script>
    export default {
        name: "myTab",
        props:["tabItem"],
        mounted() {
            this.tabSelected = this.tabItem[0]
        },
        data(){
            return{
                tabSelected:"",
            }
        },
        methods:{
            selectTab(e){
                //console.log(e.target.textContent)
                this.tabSelected = e.target.textContent;
                //console.log(this.tabSelected === this.tabItem[1])
                //console.log(this.tabItem[1])

                this.$emit('update:selectedTab',this.tabSelected);
            }
        }

    }
</script>

<style lang="scss" scoped>
    @import '../assets/style';

    .tabWrapper {

        display: flex;
        flex-direction: row;
        background: #e3e2e8;
        padding:2px;
        border-radius: 8px;
        color: $font-color-0;
        font-size: $fontsize-2;
        font-weight: bold;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.25);

        > li{
            justify-content: center;
            align-items: center;
            padding: 1.5vw 6.7vw;
            border-radius: 5px;
        }
        > li.selected{
            background: $background-color-1;
            box-shadow: 0 0 4px rgba(0,0,0,0.15);
        }

    }


</style>
