<template>

    <main class="w-full">
        <TitlePage :title="getTitle" />
        <section class="sm:container mx-auto p-3 bg-state-50">
            <InfoUser :user="user" deleteProps="true"/>
        </section>
    </main>

</template>
<script>
import TitlePage from '../../utils/TitlePage.vue';
import InfoUser from './InfoUser.vue';

import userStoreLog from './userStoreLog';

import { useUserStore } from './userStore';
const user = useUserStore()

    export default {
        data() {
            return {
                user_id: parseInt(this.$route.params.user_id),
                user
            }
        },
        computed: {
            getTitle() {
                if (this.getTitle != undefined){
                    return this.getTitle.name
                }
                return 'user';
            },
        },
        async mounted() {
            if (this.$route.name == "me"){
                this.user.getUserByObject(userStoreLog.getUserLog)
            } else if (this.$route.params.user_id == 'new'){
                this.user.setNewUser()
            } else if (isNaN(this.user_id)) {
                this.$router.push({ name: "user.menu" });
            } else {
                if (!await this.user.getUserById(this.user_id)){
                    this.$router.push({ name: "user.menu" });
                }
            }
        },
        async updated(){
            this.user_id = parseInt(this.$route.params.user_id);
            if (this.$route.name == "me"){
                this.user.getUserByObject(userStoreLog.getUserLog)
            } else if (this.$route.params.user_id == 'new'){
                this.user.setNewUser()
            } else if (isNaN(this.user_id)) {
                this.$router.push({ name: "user.menu" });
            } else {
                if (!await this.user.getUserById(this.user_id)){
                    this.$router.push({ name: "user.menu" });
                }
            }
        },
        components: { TitlePage, InfoUser }
    }

</script>