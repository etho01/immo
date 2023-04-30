import piniaUse from "./pinia";
import { defineStore } from 'pinia'

import router from "../router";
import axios from "../services/axios.js";

const useUserStore = defineStore('user',{
    state: () => ({
        infosUser: {},
        isLog: false
    }),
    actions: {
        login(infosUser) {
            this.infosUser = infosUser;
            this.isLog = true;
        },
        disconect() {
            this.infosUser = {}
            this.isLog = false
            router.push({name: 'login'})
        },
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
let userStore = useUserStore(piniaUse);
export default userStore