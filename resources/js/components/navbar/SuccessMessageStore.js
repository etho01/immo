import { defineStore } from 'pinia';
import piniaUse from '../../store/pinia';

const useSuccessMessagesStore = defineStore('uccessMessages', {
    state: () => ({
        messages: []
    }),
    getters: {
        getMessages(state) {
            return state.messages;
        }
    },
    actions: {
        deleteSuccessMessage(index) {
            this.messages.splice(index, 1);
        },
        addSuccessMessage(message) {
            this.messages.push(message)
        }
    }
});

let successMessageStore = useSuccessMessagesStore(piniaUse)
export default successMessageStore