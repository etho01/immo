<template>

    <div class="">
        <Error :erreurTab="erreurTab" />
        <Title title="Informations" />
        <div class="grid grid-cols-1 mt-3">
            <Text label="Nom" :value="getUserUse.name" @changeValue="changeName"/>
            <Text label="Email" :value="getUserUse.email" @changeValue="changeEmail" />
        </div>

        <div v-if="canUpdatePassword" class="flex flex-col justify-center">
            <Title title="Changer le mot de passe" />
            <div class="grid grid-cols-1 w-1/2 self-center">
                <Text label="Mot de passe" @changeValue="changePassword" />
            </div>
        </div>
        <div class="mt-5 flex justify-end" v-if="update">
            <div class="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md cursor-pointer" @click="updateUserClick">
                Modifier
            </div>
            <div class="bg-red-400 hover:bg-red-500 px-3 py-1 rounded-md ml-2 cursor-pointer" v-if="canDelete" @click="deleteUserClick">
                Supprimer
            </div>
        </div>
        <div v-else class="mt-5 flex justify-end">
            <div class="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md cursor-pointer" @click="createUserClick">
                Créer
            </div>
        </div>
    </div>

</template>
<script>
import Text from '../../utils/input/Text.vue';
import Title from '../../utils/title/Title.vue';

import useUser from './userServices.js'
import Error from '../../utils/Error.vue';

import userStoreLog from './userStoreLog';

const { user, getUser, createUser, updateUser, deleteUser, erreurTab } = useUser()
    export default {
        props: [
            'userBase',
            'updatePassword',
            'user_id',
            'deleteProps'
        ],
        data() {
            return {
                erreurTab,
                data: {
                    password: undefined,
                    name: undefined,
                    email: undefined
                }
            }
        },
        methods: {
            createUser,
            updateUser,
            deleteUser,
            async createUserClick(){
                let idNewIdUser = await this.createUser(this.data)
                if (idNewIdUser != 0) {
                    this.$router.push({name: 'user.show', params: { user_id: idNewIdUser }})
                }
            },
            updateUserClick(){
                this.updateUser(this.getUserUse.id, this.data);
            },
            async deleteUserClick(){
                if (await this.deleteUser(this.getUserUse.id)){
                    this.$router.push({ name: 'user.menu'})
                }
            },
            changeName(value) {
                this.data = {...this.data, name: value}
            },
            changePassword(value) {
                this.data = {...this.data, password: value}
            },
            changeEmail(value) {
                this.data = {...this.data, email: value}
            }
        },
        computed: {
            getUserUse() {
                if (this.user_id == 'new'){
                    return {}
                } else if (this.$route.name == "me"){
                    return this.userBase
                }
                return this.userBase.value
            },
            canUpdatePassword() {
                if (this.updatePassword == true ||this.user_id == 'new' || userStoreLog.getUserLog.id == this.getUserUse.id){
                    return true
                }
                return false
            },
            update() {
                if (this.user_id != "new" || this.$route.name == "me"){
                    return true;
                }
            },
            canDelete() {
                return this.deleteProps == "true" && userStoreLog.getUserLog.id != this.getUserUse.id
            }
        },
        watch: {
            userBase() {

            }
        },
        components: { Title, Text, Error }
}

</script>