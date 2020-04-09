<template>
    <div class="wrapper">
        <div class="content">
            <slot></slot>
        </div>
            <Nav/>
    </div>
</template>

<script>

    import Nav from "@/components/Nav";
    export default {
        name: "Layout",
        components: {Nav}
    }
</script>

<style lang="scss" scoped>

    .wrapper{
        height: 100vh;
        /* Fallback for browsers that do not support Custom Properties */
        height: calc(var(--vh, 1vh) * 100);
        display: flex;
        flex-direction: column;

    }
.content{
    overflow:auto;
    flex-grow:1;

}

</style>
