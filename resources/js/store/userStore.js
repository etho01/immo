import { defineStore } from 'pinia'

export const useUserStore = defineStore('user',{
    state: () => ({
        infosUser: {},
        isLog: false
    }),
    actions: {
        login(infosUser) {
            this.infosUser = infosUser;
            console.log(this.infosUser);
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
        }
    }
})