<template>

    <main class="w-full">
        <TitlePage :title="getTitle" />
        <section class="sm:container mx-auto p-3 bg-state-50">
            <InfoUser :userBase="getUserUse" :updatePassword="canUpdatePassword" :user_id="user_id" deleteProps="true"/>
        </section>
    </main>

</template>
<script>
import TitlePage from '../../utils/TitlePage.vue';
import userStoreLog from './userStoreLog';
import InfoUser from './InfoUser.vue';
import userServices from "./userServices.js";

const { user, getUser } = userServices()

    export default {
        data() {
            return {
                user_id: parseInt(this.$route.params.user_id),
                user
            }
        },
        methods: {
            getUser
        },
        computed: {
            getUserUse() {
                if (this.$route.name == "me"){
                    return userStoreLog.getUserLog
                }
                return user
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
        async mounted() {
            if (this.$route.name == "me"){

            } else if (this.$route.params.user_id == 'new'){
                this.user_id = "new"
            } else if (isNaN(this.user_id)) {
                this.$router.push({ name: "proprio.menu" });
            } else {
                if (!await this.getUser(this.user_id)){
                    this.$router.push({ name: "proprio.menu" });
                }
            }
        },
        updated(){
            if (this.$route.params.user_id != this.user_id){
                this.user_id = this.$route.params.user_id
                this.getUser(this.user_id)
            }
        },
        components: { TitlePage, InfoUser }
    }

</script>