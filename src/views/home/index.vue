<style lang="scss" rel="stylesheet/scss">
    @import 'env';

</style>
<template>
    <div>
        <ul>
            <li v-for="item in items">{{ item }}</li>
        </ul>
    </div>
</template>
<script type="text/babel">
    export default {
        data () {
            return {
                items: []
            }
        },
        methods: {
            updateData: function () {
                this.items = [1, 2, 3, 4, 5, 6, 7, 8, 9]
                this.$nextTick(function () {
                    console.log(this.$el)
                })
            }
        },
//        watch: {
//            '$route': 'updateData'
//        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.updateData()
            })
        },
    }
</script>
