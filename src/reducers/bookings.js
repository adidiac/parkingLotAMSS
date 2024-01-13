import { verifySameObject } from "../utils/toStringMethods";
export const bookings = (state = [], action) => {
    if (action.type === 'ADD_BOOKING') {
        return [...state, action.payload]
    }
    if (action.type === 'REMOVE_BOOKING') {
        return state.filter((booking) => !verifySameObject(booking, action.payload))
    }
    if (action.type === 'REMOVE_ALL_BOOKINGS') {
        return []
    }
    return state;
}