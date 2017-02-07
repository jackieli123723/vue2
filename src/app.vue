<style lang="scss" rel="stylesheet/scss">
    @import 'base';


</style>
<template>
    <div class="layout">
        <comp-header></comp-header>
        <router-view></router-view>
    </div>
</template>
<script type="text/babel">
    import {
            header
    } from '/src/components/layout'

    export default {
        components: {
            compHeader: header
        }
    }
</script>
