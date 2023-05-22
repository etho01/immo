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
                document.cookie = 'user=' + JSON.stringify(this.infosUser) +';max-age=86400'; // ajoute un coockie de log
            }
            // connect a user
        },
        disconect() {
            this.infosUser = {}
            this.isLog = false
            if (this.saveUser) {
                document.cookie = 'user=;max-age=86400';
            }
            router.push({name: 'login'})
        },
        checkCoockieConnect() { // check si un utilisateur est pas connecter par la presente d'un coockie
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
            this.infosUser = {...this.infosUser, ...data}; // modifie les infos de l'utilisateur connecter
            if (this.saveUser) {
                document.cookie = 'user=' + JSON.stringify(this.infosUser) +';max-age=86400';  // regenre le coockie de log
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
let userStoreLog = useUserLogStore(piniaUse); // permet d'avoir toujours meme intantce n'importe ou dans le projet
export default userStoreLog