<template>

    <div class="border-2 rounded-lg border-gray-200 py-1 w-full px-3" @click="toogle">
        {{ textBotton }}
    </div>
    <div v-show="show" class="border-2 rounded-lg border-gray-200 absolute bg-white mt-2">
        <slot></slot>
    </div>

</template>
<script>
    export default {
        props: [
            "textBotton",
        ],
        data () {
            return {
                show: false
            }
        },
        methods: {
            toogle() {
                this.show = !this.show;
            }
        }
    }
</script>