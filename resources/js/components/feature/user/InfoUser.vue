<template>

    <div class="">
        <Error :erreurTab="user.erreurTab" />
        <Title title="Informations" />
        <div class="grid grid-cols-1 mt-3">
            <Text label="Nom" :value="user.getUser.name" @changeValue="changeName"/>
            <Text label="Email" :value="user.getUser.email" @changeValue="changeEmail" />
        </div>

        <div v-if="canUpdatePassword" class="flex flex-col justify-center">
            <Title title="Changer le mot de passe" />
            <div class="grid grid-cols-1 w-1/2 self-center">
                <Text label="Mot de passe" @changeValue="changePassword" />
            </div>
        </div>
        <div class="mt-5 flex justify-end" v-if="!user.isNewUser">
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
import Error from '../../utils/Error.vue';

import userStoreLog from './userStoreLog';
import successMessageStore from '../../navbar/SuccessMessageStore';

    export default {
        props: [
            'user',
            'deleteProps',
            'updatePassword'
        ],
        data() {
            return {
                data: {
                    password: undefined,
                    name: undefined,
                    email: undefined
                }
            }
        },
        methods: {
            async createUserClick(){
                let idNewIdUser = await this.user.createUser(this.data)
                if (idNewIdUser != 0) {
                    successMessageStore.addSuccessMessage('L\'utilisateur a été créé');
                    this.$router.push({name: 'user.show', params: { user_id: idNewIdUser }})
                }
            },
            async updateUserClick(){
                if (await this.user.updateUser(this.data)){
                    successMessageStore.addSuccessMessage('L\'utilisateur a été modifié')
                    if (this.user.isUserLog) {
                        userStoreLog.updateUserLog(this.user.getUser)
                    }
                }
            },
            async deleteUserClick(){
                if (await this.user.deleteUser()){
                    successMessageStore.addSuccessMessage('L\'utilisateur a été suprimé')
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
            canUpdatePassword() {
                if (this.updatePassword == true || this.user.canUpdatePassword){
                    return true
                }
                return false
            },
            canDelete() {
                return this.deleteProps == "true" && !this.user.isUserLog
            }
        },
        components: { Title, Text, Error }
}

</script>