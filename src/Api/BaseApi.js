import axios from 'axios';
import BaseStorage from '../LocalStorage/BaseStorage';
const backendUrl = "http://localhost:8000/ParkingApp";
export class BaseApi {
    constructor() {
        this.baseStorage = new BaseStorage();
    }

    addJwtToHeaders() {
        try {
            const jwt = this.baseStorage.getStorage('jwt');
            if (jwt)
                axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            }
        catch (error) {
            console.error('Error while adding jwt to headers', error);
            return error;
        }
    }

    extractJwtFromHeaders() {
        try {
            const jwt = axios.defaults.headers.common['Authorization'].split(' ')[1];
            this.baseStorage.updateStorage('jwt', jwt);
        }
        catch (error) {
            console.error('Error while extracting jwt from headers', error);
            return error;
        }
    }

    async apiCall (method, path, id, entity) {
        try {
            //TODO : uncomment this after fixing the jwt issue
            // this.addJwtToHeaders();
            let result = null;
            switch (method) {
                case enumMethods.GET:
                    result = await this.getAllApi(path, id);
                break;
                case enumMethods.PUT:
                    result = await this.updateApi(path, id, entity);
                break;
                case enumMethods.DELETE:
                    result = await this.deleteApi(path, id);
                break;
                case enumMethods.POST:
                    result = await this.insertApi(path, entity);
                break;
                default:
                    console.error('Invalid method');
            }
            //TODO : uncomment this after fixing the jwt issue
            // this.extractJwtFromHeaders();
            return result;
        } catch (error) {
            console.error('Error while calling api', error);
            return {status: 500};
        }
    }

    async updateApi(path, id, entity) {
        try {
            const result = await axios.put(backendUrl + path + id + '/', entity);
            return result;
        } catch (error) {
            return {status: 500};
        }
    }

    async deleteApi(path, id) {
        try {
            const result = await axios.delete(backendUrl + path + id + '/');
            return result;
        } catch (error) {
            return {status: 500};
        }
    }

    async getAllApi(path,id) {
        try {
            if (id)
                return await axios.get(backendUrl + path + id+'/');
            const result = await axios.get(backendUrl + path);
            return result;
        } catch (error) {
            return {status: 500};
        }
    }

    async insertApi(path, entity) {
        try {
            const result = await axios.post(backendUrl + path, entity);
            return result;
        } catch (error) {
            return {status: 500};
        }
    }
}

export const enumMethods = {
    GET: 'GET',
    PUT: 'PUT',
    DELETE: 'DELETE',
    POST: 'POST'
}