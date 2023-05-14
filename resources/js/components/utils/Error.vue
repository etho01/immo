<template>

    <div v-if="isShow" class="rounded-xl bg-red-400 bg-red px-5 py-2 flex justify-between flex-wrap">
        <div class="block">
            <div class="" v-for="erreur in erreurTab" :key="error">
                {{ erreur }}
            </div>
        </div>
        <div>
            <div class="py-2 px-3 hover:bg-red-500 h-auto rounded-md cursor-pointer" @click="hide">
                <font-awesome-icon :icon="['fas', 'xmark']" />
            </div>
        </div>
    </div>

</template>
<script>

export default {
    props: ['erreurTab'],
    data() {
        return {
            show: true
        }
    },
    computed: {
        isShow() {
            return this.erreurTab.length != 0 && this.show
        }
    },
    methods: {
        hide() {
            this.show = false;
        }
    },
    watch: {
        erreurTab() {
            this.show = true
        }
    }
}

</script>