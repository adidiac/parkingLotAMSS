import { Field, EntityDefinition } from "../GenericComponents/GenericComponents";
import {completeApiObj} from "../Api/CompleteApi";
import { useMemo } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { success } from "../notify";

class AddParkingSlotBookingEntityDefinition extends EntityDefinition
{
    constructor(fields, entityName)
    {
        super(fields, entityName);
    }
}



export const useAddParkingSlotBookingEntityDefinitionHook = (
    {id, price}
) => {
    const user = useSelector(state => state.user);

    const dispatch = useDispatch();

    const addParkingSlotBookingEntityDefinition = useMemo(() => {
        let startTimeOld = ''
        let endTimeOld = ''

        const addParkingSlotBookingFields = [
            new Field("booking_start_date","date","Enter the day you want to start booking","Start time",null,null,null,false),
            new Field("booking_end_date","date","Enter the day you want to end booking","End time",null,null,null,false),
            new Field("price","string","","Amount",null,price,null,true).withCallbackOnChange((dataValues, setStateValues) => {
                
                const startDate = dataValues["booking_start_date"];
                const endDate = dataValues["booking_end_date"];

                if( startDate == startTimeOld && endDate == endTimeOld) return

                startTimeOld = startDate
                endTimeOld = endDate
        
                if (startDate && endDate) {
                    const date1 = new Date(startDate);
                    const date2 = new Date(endDate);

                    // endDate - startDate are strings  
                    const differenceInMilliseconds = Math.abs(date2 - date1);
                    // Convert milliseconds to days
                    const millisecondsInADay = 1000 * 60 * 60 * 24;
                    const differenceInDays = Math.floor(differenceInMilliseconds / millisecondsInADay);
                    const price = differenceInDays * dataValues["price"];
                    setStateValues({...dataValues, price: price});
                }
            })
        ];
        return new AddParkingSlotBookingEntityDefinition(addParkingSlotBookingFields, "Add Parking Slot Booking");
    });

    const createNewBooking = (booking) => {

        const newBooking = {
            ...booking,
            user: user.user_id,
            parking_slot: id
        }
        success("Added booking, verify cart", true)

        dispatch({type:"ADD_BOOKING", payload: newBooking})
    }

    return {addParkingSlotBookingEntityDefinition, createNewBooking};
}
