<template>
    <svg class="icon" aria-hidden="true">
        <use :xlink:href="`#icon-${name}`" />
    </svg>
</template>

<script>
    import '../assets/iconfont.js';
    export default {
        name: "Icon",
        props:["name"]
    };

</script>

<style scoped>
    .icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
        color: black;
        font-size: inherit;
    }
</style>
