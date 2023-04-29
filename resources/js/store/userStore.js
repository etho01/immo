import piniaUse from "./pinia";
import { defineStore } from 'pinia'

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
        getToken() {
            return this.infosUser['token']+'d';
        }
    }
})
let userStore = useUserStore(piniaUse);
export default userStore