import { defineStore } from "pinia";
import { useContratStore } from '../contrat/contratStore'

import userUser from './userServices.js';

import userStoreLog from "./userStoreLog";

import { deleteUndefine } from "../../../store/fonc";

const {
    user,
    users,
    getUser,
    getUsers,
    updateUser,
    deleteUser,
    createUser,
    page,
    gotoPage,
    nbPage,
    erreurTab,
    setUser,
    setUsers,
    refreshErreur
} = userUser()

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            users: [],
            user: {},
            page: 1,
            nbPage: 1,
            erreurTab,
            newUser : false,
            haveUserLoad: false,
            contrat : useContratStore()
        }
    },
    getters: {
        getUser: (state) => state.user,
        getUsers: (state) => state.users,
        isNewUser: (state) => state.newUser,
        isUserLog: (state) => state.user.id == userStoreLog.getUserLog.id,
        canUpdatePassword: (state) =>  state.newUser || state.user.id == userStoreLog.getUserLog['id'],
        canUdate: (state) => !state.newUser || this.getUser.id == userStoreLog.getUserLog.id
    },
    actions: {
        async updateUser(data) {
            if (this.haveUserLoad) {
                if ( await updateUser(this.getUser.id, data)) {
                    this.user = {...this.user, ...deleteUndefine(data)}
                    return true
                }
            }
            return false
        },
        async deleteUser() {
            if (this.haveUserLoad) {
                if (await deleteUser(this.getUser.id)) {
                    this.haveUserLoad = false
                    this.user = {}
                    return true
                }
            }
            return false
        },
        async createUser(data) {
            let idNewUser = await createUser(data)
            if (idNewUser != 0) {
                await this.getUserById(idNewUser)
                this.newUser = false
                return idNewUser
            }
            return idNewUser
        },


        async getUserById(id) {
            if (await getUser(id)){
                this.user = {...user.value}
                this.changeValueSetUser()
                return true
            }
            return false
        },
        getUserByObject(userObj) {
            this.user = userObj
            this.changeValueSetUser()
        },

        changeValueSetUser() {
            this.haveUserLoad = true
            this.newUser = false
            refreshErreur()
        },

        async getUsersByFiltre(filtre) {
            if (await getUsers(filtre)) {
                this.users = users.value
                this.page = page.value
                this.nbPage = nbPage.value
                return true
            }
            return false
        },
        async gotoPage(nbPageGo) {
            if (await gotoPage(nbPageGo)) {
                this.users = users.value
                this.page = page.value
                this.nbPage = nbPage.value
            }
        },
        setNewUser() {
            this.newUser = true
            this.user = {}
        }
    }
})