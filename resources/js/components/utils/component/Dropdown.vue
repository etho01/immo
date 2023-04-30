<template>

    <div :class="getClassBtn" @click="toogle">
        {{ textBotton }}
    </div>
    <div v-show="show" :class="getClassDrop">
        <slot></slot>
    </div>

</template>
<script>
import { faThumbsDown } from '@fortawesome/free-regular-svg-icons';

    export default {
        props: [
            "textBotton",
            "btnClass",
            'dropClass'
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
        },
        computed: {
            getClassBtn() {
                if (this.btnClass == undefined){
                    return 'border-2 rounded-lg border-gray-200 py-1 w-full px-3 cursor-pointer';
                }
                return this.btnClass
            },
            getClassDrop() {
                if (this.dropClass == undefined) {
                    return "border-2 rounded-lg border-gray-200 absolute bg-white mt-2 z-50"
                }
                return "absolute "+this.dropClass
            }
        }
    }
</script>