<template>
    <div class="block mx-2 my-1" :class="getClassInput">
        <label :for="label" class="ml-2" v-if="label">{{ label }}</label>
        <input :type="getType" v-model="valueInput" @keyup="appuieTouche()" :id="label" @change="appuieTouche()"
            :placeholder="placeholder"
            class="border-2 rounded-lg border-gray-200 py-1 w-full mt-1">
    </div>
</template>
<script>
    export default {
        props: [
            'value',
            'label',
            'placeholder',
            'type',
            'class'
        ],
        data(){
            return {
                valueInput: this.value
            }
        },
        methods: {
            appuieTouche() {
                this.$emit("changeValue", this.valueInput);
            }
        },
        computed: {
            getType() {
                if (this.type == undefined) {
                    return 'text'
                }
                return this.type
            },
            getClassInput() {
                return this.class;
            }
        },
        watch: {
            value(newValue) {
                this.valueInput = newValue;
            },
        }
    }
</script>