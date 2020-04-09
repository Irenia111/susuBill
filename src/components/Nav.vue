<template>
    <nav>
            <router-link to="/home" class="item" active-class="selected" exact>
                <!--加了exact之后，'/'根路径就不匹配了-->
                <a-icon type="account-book" />
                <p>明细</p>
            </router-link>
            <router-link to="/money" >
                <div class="add">
                <a-icon type="plus-circle" theme="filled" class="add-icon" />
                </div>

             </router-link>
            <router-link to="/statistics" class="item" active-class="selected" exact>
                <a-icon type="line-chart"/>
                <p>图表</p>
            </router-link>
    </nav>
</template>

<script>
    export default {
        name: "Nav"
    }
</script>

<style lang="scss"  scoped>
    @import "../assets/style";
    nav {
        display: flex;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

        >.item{
            display: flex;
            width: 50%;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            border: red 1px solid;

            > .anticon {
                margin: 2px auto;
                font-size: $fontsize-1;
                color:black;
            }

            >p{
                font-size: $fontsize-2;
                margin:0;
                padding:0;
                color:rgba(0, 0, 0, 0.65);
                border: black 1px solid;
            }
        }
        .item.selected > .anticon{
            color:red;
        }
    }





    .add{
        position: fixed;
        width: 54px;
        height: 54px;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        bottom: 15px;
        left: 0px;
        right: 0px;
        margin: 0 auto;

        border:3px green solid;
    }
    .add-icon{
        position: relative;
        font-size: 46px;
        margin: 1px;
        color:red;
    }

</style>
