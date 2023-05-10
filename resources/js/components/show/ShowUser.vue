<template>

    <main class="w-full">
        <TitlePage title="df" />
        <section class="sm:container mx-auto p-3 bg-state-50">
            <InfoUser :userBase="user" deleteProps="true"/>
        </section>
    </main>

</template>
<script>
import TitlePage from '../utils/TitlePage.vue';
import userStore from '../../store/userStore';
import InfoUser from '../info/InfoUser.vue';
import userServices from "../../services/userServices.js";

import  User  from '../../classes/user/User';

    export default {
        data() {
            return {
                user_id: parseInt(this.$route.params.user_id),
                user : new User({})
            }
        },
        async mounted() {
            if (this.$route.name == "me"){
                this.user = new User(userStore.getUserLog);
            } else if (this.$route.params.user_id == 'new'){
                this.user = new User({}, true)
            } else if (isNaN(this.user_id)) {
                this.$router.push({ name: "proprio.menu" });
            } else {
                this.user = await User.getById(this.user_id)
                if (!this.user instanceof User){
                    this.$router.push({ name: "proprio.menu" });
                }
            }
        },
        async updated(){
            if (this.$route.params.user_id != this.user_id){
                this.user_id = this.$route.params.user_id
                this.user = await User.getById(this.user_id)
            }
        },
        components: { TitlePage, InfoUser }
    }

</script>