<template>

    <div :class="getClassBtn" @click="toogle" ref="btn">
        {{ textBotton }}
    </div>
    <div v-show="isShow" :class="getClassDrop" :style="getStyle" ref="element">
        <slot></slot>
    </div>

</template>
<script>
import { faThumbsDown } from '@fortawesome/free-regular-svg-icons';

    export default {
        props: [
            "textBotton",
            "btnClass",
            'dropClass',
            'dataPlacement'
        ],
        data () {
            return {
                show: false,
                size: 0,
                sizeBtn: 0
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
            },
            getStyle() {
                if (this.show) {
                    if (this.dataPlacement == "top"){
                        return {marginTop: '-' + (this.size + this.sizeBtn + 30) + "px"}
                    }
                }
            },
            
            isShow() {
                return this.show
            }
        },
        updated() {
            if (this.$refs.element != undefined && this.isShow){
                this.size = this.$refs.element.offsetHeight
                this.sizeBtn = this.$refs.btn.offsetHeight;
            }
        },
    }
</script>