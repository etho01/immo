<template>

    <div class="bg-green-500 rounded-xl mb-3 px-2 py-1">
        <div class="flex-success-message">
            <div class="flex items-center">
                {{ message }}
            </div>
            <div>
                <div class="py-2 flex items-center justify-center hover:bg-green-600 rounded-md cursor-pointer" @click="clear">
                    <font-awesome-icon :icon="['fas', 'xmark']" />
                </div>
            </div>
        </div>
    </div>

</template>
<script>

    export default {
        props: ['message', 'index'],
        mounted() {
            setTimeout(this.clear, 10000);
        },
        methods: {
            clear() {
                this.$emit('deleteSuccessMessage', this.index);
            }
        }
    }

</script>
<style>

    .flex-success-message {
        display: grid;
        grid-template-columns: 1fr 2em;
    }

</style>