<template>

    <div class="success-message">
        <SuccessMessage :message="message" :index="index" v-for="( message , index) in successMessageStore.getMessages" @deleteSuccessMessage="deleteSuccessMessage"/>
    </div>

</template>
<script>
import SuccessMessage from './SuccessMessage.vue';
import successMessageStore from './SuccessMessageStore';

    export default {
    data() {
        return {
            successMessageStore
        };
    },
    methods: {
        deleteSuccessMessage(index) {
            this.successMessageStore.deleteSuccessMessage(index);
        }
    },
    components: { SuccessMessage }
}

</script>
<style>

    .success-message {
        position: absolute;
        bottom: 4em;
        left: 1em;
        width: 13rem ;
    }

</style>