import { BaseApi,enumMethods } from "./BaseApi";

export class CompleteApi extends BaseApi {
    constructor() {
        super();
        this.loginPath = "/login/";
        this.parkOwner= "/park-owner/";
        this.user = "/users/";
        this.credentials = "/credentials/";
        this.park= "/park/";
        this.parkDetails= "/park-details/";
        this.floors= "/floors/";
        this.parkingSlots= "/parking-slots/";
        this.parkingSlotsAvailable= "/parking-slots/available/";
        this.parkingSlotsRules= "/parking-slots-rules/";
        this.bookings= "/bookings/";
    }
    
    //**
    // * @param {email, password} data
    // * @return {credentials_id, email, password} 
    // */
    login = async (data) => {
        return await this.apiCall(enumMethods.POST, this.loginPath, null, data);
    }

    updateUser = async (data) => {
        return await this.apiCall(enumMethods.PUT, this.user, data.user_id, data);
    }

    createCredentials = async (data) => {
        return  await this.apiCall(enumMethods.POST, this.credentials, null, data);
    }

    registerParkOwner = async (data) => {
        return await this.apiCall(enumMethods.POST, this.parkOwner, null, data);
    }
    registerUser = async (data) => {
        return await this.apiCall(enumMethods.POST, this.user, null, data);
    }

    getAllParkOwners = async () => {
        return await this.apiCall(enumMethods.GET, this.parkOwner, null, null);
    }

    getAllUsers = async () => {
        return await this.apiCall(enumMethods.GET, this.user, null, null);
    }

    getAllParkingSlotsAvailable = async () => {
        return await  this.apiCall(enumMethods.GET, this.parkingSlotsAvailable, null, null);
    }

    getAllParkingSlots = async () =>{
        return await this.apiCall(enumMethods.GET, this.parkingSlots, null, null);
    }

    getParkingSlot = async (id) => {
        return await this.apiCall(enumMethods.GET, this.parkingSlots, id, null);
    }

    getParkDetails = async (id) => {
        return await this.apiCall(enumMethods.GET,this.parkDetails, id, null);
    }

    updateParkDetails = async (id, data) => {
        return await this.apiCall(enumMethods.PUT, this.parkDetails, id, data);
    }

    getAllBookings = async () => {
        return await this.apiCall(enumMethods.GET, this.bookings, null, null);
    }

    createBooking = async (data) => {
        return await this.apiCall(enumMethods.POST, this.bookings, null, data);
    }

    updateParkingSlot = async (data) => {
        return await this.apiCall(enumMethods.PUT, this.parkingSlots, data.parking_slot_id, data);
    }
    createBooking = async (data) => {
        return await this.apiCall(enumMethods.POST, this.bookings, null, data);
    }
    deleteBooking = async (id) => {
        return await this.apiCall(enumMethods.DELETE, this.bookings, id, null);
    }

    getAllParkings = async () => {
        return await this.apiCall(enumMethods.GET, this.park, null, null);
    }

    addParking = async (data) => {
        return await this.apiCall(enumMethods.POST, this.park, null, data);
    }

    getAllFloors = async () => {
        return await this.apiCall(enumMethods.GET, this.floors, null, null);
    }

    addFloor = async (data) => {
        return await this.apiCall(enumMethods.POST, this.floors, null, data);
    }

    addParkingSlot = async (data) => {
        return await this.apiCall(enumMethods.POST, this.parkingSlots, null, data);
    }

    addPark = async (data) => {
        return await this.apiCall(enumMethods.POST, this.park, null, data);
    }

    addParkDetails = async (data) => {
        return await this.apiCall(enumMethods.POST, this.parkDetails, null, data);
    }
}

export const completeApiObj = new CompleteApi();