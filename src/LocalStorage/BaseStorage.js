export default class BaseStorage {
    constructor()
    {
        this.storage = window.localStorage;
    }

    async updateStorage(key, value) {
        try {
            this.storage.setItem(key, value);
        } catch (error) {
            console.error('Error while updating data', error);
            return error;
        }
    }

    async deleteStorage(key) {
        try {
            this.storage.removeItem(key);
        } catch (error) {
            console.error('Error while deleting data', error);
            return error;
        }
    }

    async getAllStorage() {
        try {
            const result = this.storage;
            return result;
        } catch (error) {
            console.error('Error while getting data', error);
            return error;
        }
    }

    async insertStorage(key, value) {
        try {
            this.storage.setItem(key, value);
        } catch (error) {
            console.error('Error while inserting data', error);
            return error;
        }
    }

    async getStorage(key) {
        try {
            const result = this.storage.getItem(key);
            return result;
        } catch (error) {
            console.error('Error while getting data', error);
            return error;
        }
    }
}