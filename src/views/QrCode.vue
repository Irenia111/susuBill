<template>
    <div class="wrapper">
        <div class="qrWrapper">
            <h1>为保证预览效果，请扫描二维码</h1>
            <img src="../assets/img/qrCode.png">
        </div>
    </div>
</template>

<script>
    export default {
        name: "QrCode"
    }
</script>

<style lang="scss" scoped>
    @import '../assets/style';
    .wrapper {
        height: 100vh;
        /* Fallback for browsers that do not support Custom Properties */
        height: calc(var(--vh, 1vh) * 100);
        background: $font-color-0;

        > .qrWrapper{
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-60%);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            > h1{
                white-space: nowrap;
                margin-bottom: 20px;
                font-size: $fontsize-0;
                color:$theme-color;
            }

        }

    }


</style>
