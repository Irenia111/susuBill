<template>
    <nav>
            <router-link to="/home" class="item" active-class="selected" exact>
                <!--加了exact之后，'/'根路径就不匹配了-->
                <a-icon type="account-book" />
                <p>账本</p>
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
        name: "MyNav"
    }
</script>

<style lang="scss"  scoped>
    @import "../assets/style";
    nav {
        display: flex;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

        >.item{
            display: flex;
            margin: 4px 0px;
            width: 50%;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            > .anticon {
                margin: 2px auto;
                font-size: $fontsize-1;
                color:$font-color-2;
            }

            >p{
                font-size: $fontsize-2;
                margin:0;
                padding:0;
                color:$font-color-2;
            }
        }
        .item.selected > .anticon{
            color:$font-color-0;
        }
        .item.selected > p{
            color:$font-color-0;
        }
    }





    .add{
        position: fixed;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
        bottom: 15px;
        left: 0px;
        right: 0px;
        margin: 0 auto;
        border:3px $background-color-1 solid;

        > .add-icon {
            font-size: 46px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            color: $theme-color;
        }


    }

</style>
