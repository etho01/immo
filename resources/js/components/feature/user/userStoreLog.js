import piniaUse from "../../../store/pinia";
import { defineStore } from 'pinia'

import router from "../../../router";
import getCoockie from "../../../utils/utils"

const useUserLogStore = defineStore('userLoh',{
    state: () => ({
        infosUser: {},
        isLog: false
    }),
    actions: {
        login(infosUser) {
            this.infosUser = infosUser;
            document.cookie = 'user=' + JSON.stringify(this.infosUser) +';max-age=86400';
            this.isLog = true;
        },
        disconect() {
            this.infosUser = {}
            document.cookie = 'user=;max-age=86400';
            this.isLog = false
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