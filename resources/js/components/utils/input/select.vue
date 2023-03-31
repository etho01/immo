<template>
    <div class="block mx-2 my-1">
        <div :for="label" class="ml-2 mb-1" v-if="label">{{ label }}</div>
            <Dropdown :text-botton="getLabel" >

                <div class="w-full h-full my-1">
                    <div  class="hover:bg-slate-200 w-full px-2" @click="change(undefined)">
                        --
                    </div>
                    <div :key="param.id" v-for="param in getParams" class="hover:bg-slate-200 w-full px-2" @click="change(param.id)">
                        {{ param.name }}
                    </div>
                </div>

            </Dropdown>
    </div>
</template>
<script>
import Dropdown from '../component/Dropdown.vue';

    export default {
    props: [
        "valueDefault",
        "label",
        "default",
        'textDefault',
        'param'
    ],
    data () {
        return {
            value : this.valueDefault
        }
    },
    methods: {
        change(id) {
            this.value = id
            this.$emit("change", this.value);
        }
    },
    computed: {
        getLabel() {
            if (this.value == undefined){
                return this.textDefault == undefined ? '--' : this.textDefault
            }

            let textButton = '--';
            this.param.forEach(element => {
                if (element.id == this.value){
                    textButton = element.name;
                }
            });
            return textButton;
        },
        getParams() {
            return this.param
        }
    },
    components: { Dropdown }
}
</script>