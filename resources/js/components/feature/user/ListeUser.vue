<template>

    <ListeElement
        :elements="user.getUsers"
        :cols="userCols" 
        @showUser="showUser"  
        @newUser="createUser" 
        @gotoPage="user.gotoPage" 
        :page="user.page" 
        :nbPage="user.nbPage"
    />

</template>
<script>
import ListeElement from '../../utils/component/liste/ListeElement.vue';
import userConst from './UserConst.js'
const { userCols } = userConst()

    export default {
        props: ['user',],
        data() {
            return {
                userCols
            }
        },
        methods: {
            showUser(id){
                this.$router.push({ name: 'user.show', params: { user_id: id } })
            },
            createUser() {
                this.$router.push({ name: 'user.show', params: { user_id: 'new' } })
            },
        },
        components: { ListeElement }
    }

</script>