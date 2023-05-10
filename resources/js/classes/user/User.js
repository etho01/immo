import useServices from '../../services/baseServices';
import userStore from '../../store/userStore';

const {getElement, updateElement, deleteElement, createElement} = useServices('user')

class User {

    constructor (data, newUser = false) {
        this.data = data
        this.dataTemp = {}
        this.newUser = newUser
    }
    
    static async getById(id) {
        let response = await getElement(id);
        if (response.haveError()) {
            return response.getError()
        }
        return new User(response.getSucces())
    }

    getData(nomData) {
        return this.data[nomData]
    }

    updateData(nomData, value) {
        this.dataTemp[nomData] = value
    }

    async sendUpdate() {
        let response = await updateElement(this.getId, this.dataTemp);
        if (response.haveError()) {
            return response.getError()
        }
        this.data = Object.create(this.dataTemp)
        return true 
    }

    async delete() {
        let response = await deleteElement(this.getId);
        if (response.haveError()) {
            return response.getError()
        }
        return true
    }

    async create() {
        let response = await createElement(this.dataTemp);
        if (response.haveError()){
            response.getError()
        }
    }

    isNew() {
        return this.newUser;
    }

    isMeLog() {
        return this.getData('id') == userStore.getUserLog.id
    }

    canDelete() {
        return this.isMeLog()
    }

    canUpdate() {
        return this.isNew() || this.isMeLog()
    }
}

export default User