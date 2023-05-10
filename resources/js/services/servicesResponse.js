import { getErrors } from './fonc.js';

class Response {
    constructor () {
        this.isError = false;
        this.succes = []
        this.errors = []
    }

    addError (errors) {
        this.isError = true;
        this.errors = getErrors(errors)
    }

    addSuccess (data) {
        if (!this.haveError()) {
            this.succes = data.data.data;
        }
    }

    haveError() {
        return this.isError
    }

    getError() {
        if (this.haveError()) {
            return this.errors
        }
        return []
    }

    getSucces () {
        if (!this.haveError()) {
            return this.succes
        }
        return []
    }

    refresh() {
        this.haveError = false
        this.succes = []
        this.errors = []
    }
}

export default Response
