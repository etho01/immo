import piniaUse from "../../../store/pinia";
import { defineStore } from 'pinia'

import router from "../../../router";
import getCoockie from "../../../utils/utils"

const useUserLogStore = defineStore('userLoh',{
    state: () => ({
        infosUser: {},
        isLog: false,
        saveUser: false
    }),
    actions: {
        login(infosUser, saveUser) {
            this.saveUser = saveUser
            this.infosUser = infosUser;
            this.isLog = true;
            if (this.saveUser) {
                document.cookie = 'user=' + JSON.stringify(this.infosUser) +';max-age=86400';
            }
        },
        disconect() {
            this.infosUser = {}
            this.isLog = false
            if (this.saveUser) {
                document.cookie = 'user=;max-age=86400';
            }
            router.push({name: 'login'})
        },
        checkCoockieConnect() {
            let valueCoockie = ""
            let name="user"
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) valueCoockie = parts.pop().split(';').shift();
            if (valueCoockie != "" ) {
                this.infosUser = JSON.parse(valueCoockie)
                this.isLog = true
                this.saveUser = true
            }
        },
        updateUserLog(data) {
            this.infosUser = {...this.infosUser, ...data};
            if (this.saveUser) {
                document.cookie = 'user=' + JSON.stringify(this.infosUser) +';max-age=86400';
            }
        }
    },
    getters: {
        getIsLog() {
            return this.$state.isLog;
        },
        getInfosCallApi() {
            if (this.isLog == true) {
                return {
                }
            }
        },
        getHeaderRequest() {
            return {
                headers: { 
                    'Authorization': `Bearer ${this.infosUser['token']}`
                  }
            }
        },
        getNom() {
            return this.infosUser['name']
        },
        getUserLog() {
            return this.infosUser;
        }
    }
})
let userStoreLog = useUserLogStore(piniaUse);
export default userStoreLog