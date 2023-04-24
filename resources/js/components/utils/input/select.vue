<template>
    <div class="block mx-2 my-1">
        <div :for="label" class="ml-2 mb-1" v-if="label">{{ label }}</div>
            <Dropdown :text-botton="getLabel" >

                <slot></slot>

                <div class="w-full h-full my-1">
                    <div  class="hover:bg-slate-200 w-full px-2 cursor-pointer" @click="change(-1)">
                        --
                    </div>
                    <div :key="param.id" v-for="param in getParams" class="hover:bg-slate-300 w-full px-2 cursor-pointer" :class="{ 'bg-slate-200': param.id == value }" @click="change(param.id)">
                        {{ fonc(param) }}
                    </div>
                </div>

            </Dropdown>
    </div>
</template>
<script>
import Dropdown from '../component/Dropdown.vue';

    export default {
    props: {
        valueDefault : [String, Number, Object, Array],
        label : [String, Number, Object, Array],
        default : [String, Number, Object, Array],
        textDefault : [String, Number, Object, Array],
        param : [String, Number, Object, Array],
        fonc : {
            default (){
                return  (param) =>  param.nom;
            }
        }
    },
    data () {
        return {
            value : this.valueDefault
        }
    },
    methods: {
        change(id) {
            this.value = id
            this.$emit("changeValue", this.value);
        }
    },
    computed: {
        getLabel() {
            if (this.value == -1){
                return this.textDefault == undefined ? '--' : this.textDefault
            }

            let textButton = '--';
            if (this.param != undefined){
                this.param.forEach(element => {
                    if (element.id == this.value){
                        textButton = this.fonc(element);
                    }
                });
            }
            return textButton;
        },
        getParams() {
            return this.param
        }
    },
    mounted() {
        if (this.value == undefined) {
            this.value = -1;
        }
    },
    watch: {
        valueDefault(newValue) {
            this.value = newValue;
        },
    },
    components: { Dropdown }
}
</script>