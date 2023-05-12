<template>

    <ListeElement
        :elements="getUsersLoad"
        :cols="userCols" 
        @showUser="showUser"  
        @newUser="createUser" 
        @gotoPage="gotoPage" 
        :page="page" 
        :nbPage="nbPage"
    />

</template>
<script>
import ListeElement from '../utils/component/liste/ListeElement.vue';
import userConst from '../../const/UserConst.js'
import userServices from "../../services/userServices.js";
const { userCols } = userConst()
const { users, getUsers, page, gotoPage, nbPage } = userServices();

    export default {
        props: ['userBase','filtres'],
        data() {
            return {
                users,
                page,
                nbPage,
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
            gotoPage,
            getUsers
        },
        computed: {
            getUsersLoad() {
                if (this.userBase == undefined){
                    return this.users
                }
                return this.userBase
            }
        },
        mounted () {
            if (this.userBase == undefined){
                this.getUsers(this.filtres)
            }
        },
        watch: {
            filtres: ((filtres) => {getUsers(filtres)})
        },

        components: { ListeElement }
    }

</script>