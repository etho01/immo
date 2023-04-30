<template>

    <main class="w-full">
        <TitlePage :title="getTitle" />
        <section class="sm:container mx-auto p-3 bg-state-50">
            <InfoUser :userBase="getUserUse" :updatePassword="canUpdatePassword" />
        </section>
    </main>

</template>
<script>
import TitlePage from '../utils/TitlePage.vue';
import userStore from '../../store/userStore';
import InfoUser from '../info/InfoUser.vue';

    export default {
        computed: {
            getUserUse() {
                if (this.$route.name == "me"){
                    return userStore.getUserLog
                }
            },
            getTitle() {
                if (this.getTitle != undefined){
                    return this.getTitle.name
                }
                return 'user';
            },
            canUpdatePassword() {
                if (this.$route.name == "me"){
                    return true
                }
                return false;
            }
        },
        mounted(){
            console.log(this.$route.name);
        },
        components: { TitlePage, InfoUser }
    }

</script>