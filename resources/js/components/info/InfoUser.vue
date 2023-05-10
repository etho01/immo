<template>

    <div class="">
        <Error :erreurTab="erreurTab" />
        <Title title="Informations" />
        <div class="grid grid-cols-1 mt-3">
            <Text label="Nom" :value="user.getData('name')" @changeValue="changeName"/>
            <Text label="Email" :value="user.getData('email')" @changeValue="changeEmail" />
        </div>

        <div v-if="updatePassword" class="flex flex-col justify-center">
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
import Text from '../utils/input/Text.vue';
import Title from '../utils/title/Title.vue';

import useUser from '../../services/userServices.js'
import Error from '../utils/Error.vue';

import userStore from '../../store/userStore';
import User from '../../classes/user/User.js';

    export default {
        props: [
            'userBase',
            'deleteProps'
        ],
        data() {
            return {
                erreurTab: [],
                user: this.userBase
            }
        },
        methods: {
            async createUserClick(){
                let newUser = await this.user.create();
                if (!newUser instanceof User){
                    this.$router.push({name: 'user.show', params: { user_id: newUser.getData('id') }})
                }
                this.$forceUpdate();
            },
            async updateUserClick(){
                let resp =  await this.user.sendUpdate()
                if (resp !== true){
                    this.erreurTab = resp
                }
                this.$forceUpdate();
            },
            async deleteUserClick(){
                if (await this.deleteUser(this.getUserUse.id)){
                    this.$router.push({ name: 'user.menu'})
                }
            },
            changeName(value) {
                this.user.updateData('name', value)
            },
            changePassword(value) {
                this.user.updateData('password', value)

            },
            changeEmail(value) {
                this.user.updateData('email', value)
            }
        },
        computed: {
            update() {
                return this.user.canUpdate()
            },
            canDelete() {
                return this.deleteProps == "true" && this.user.canDelete()
            },
            updatePassword() {
                return this.user.updatePassword()
            }
        },
        watch: {
            userBase(newUser) {
                this.user = newUser
            }
        },
        components: { Title, Text, Error }
}

</script>