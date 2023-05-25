<template>
    
    <div class="container w-64 m-auto bg-state-50 border-zinc-700 rounded-lg flex justify-center flex-col p-5
    shadow-2xl shadow-gray-200/50
    container-login
    ">
        <div class="text-center text-2xl text-white pb-5">
            Immo
        </div>

        <div class="mt-5 text-center text-xl bg-gray-100 opacity-50 p-1 rounded-lg mx-auto">
            Connection
        </div>

        <div class="mt-5 text-sm">
            <label for="email" class="ml-2 bg-gray-100 opacity-50 p-1 rounded-lg">Email</label>
            <input id="email" v-model="email" type="text" class="rounded-lg border-gray-200 py-1 w-full mt-1"/>
        </div>

        
        <div class="mt-5 text-sm mb-3">
            <label for="password" class="ml-2 bg-gray-100 opacity-50 p-1 rounded-lg">
                <span class="opacity-100"> Mot de passe </span>
            </label>
            <input id="password" v-model="password" type="password" class=" rounded-lg border-gray-200 py-1 w-full mt-1"/>
        </div>

        <div class="mt-5 text-sm mb-3">
            <label for="remenber" class="ml-2 bg-gray-100 opacity-50 p-1 rounded-lg">
                <span class="opacity-100">
                    Me garder connecter
                </span>
            </label>
            <input id="remenber" type="checkbox" class="ml-5" v-model="saveUser"/>
        </div>

        <Error :erreurTab="erreurTab" class="text-sm" />

        <div class="mt-4 flex justify-center opacity-75 hover:opacity-100">
            <button class="bg-white px-3 py-1 rounded-lg" @click="logInApiClick(email, password)">Se connecter</button>
        </div>
    </div>

</template>
<script>
import useUser from './feature/user/userServices'
import Error from './utils/Error.vue';
import userStoreLog from './feature/user/userStoreLog';

    const { logInApi, erreurTab } = useUser();

    export default {
    data() {
        return {
            email: undefined,
            password: undefined,
            erreurTab,
            userStoreLog,
            saveUser: false
        };
    },
    methods: {
        logInApi,
        async logInApiClick() {
            let user = await this.logInApi(this.email, this.password);
            if (user != undefined && user.token != "") {
                this.userStoreLog.login(user, this.saveUser);
                this.$router.push({ name: "dashboard" });
            }
        }
    },
    components: { Error }
}
</script>
<style>

    .container-login{
        background-image: url('/assets/images/image-login.jpg');
        background-size:  cover;
    }

</style>