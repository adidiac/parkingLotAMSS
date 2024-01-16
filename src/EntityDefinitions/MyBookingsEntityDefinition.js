import { Field, EntityDefinition } from "../GenericComponents/GenericComponents";
import {completeApiObj} from "../Api/CompleteApi";
import { useMemo } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Button} from 'react-bootstrap'
import { success,error } from "../notify";
import BookingDetail from "../Components/BookingDetail";
class MyBookingsEntityDefinition extends EntityDefinition
{
    constructor(fields, entityName)
    {
        super(fields, entityName);
    }
}

const myBookingsFields = [
    new Field("booking_start_date","date","", "Booking start date", "", "").withRegex(),
    new Field("booking_end_date","date","","Booking end date", "", "").withRegex(),
    new Field("price","number","","Price", "", "").withRegex(),
    new Field("info","","", "More info", "", "").withRegex(),
]


export const useMyBookingsHook=()=>
{
    const user = useSelector(state => state.user)

    const myBookingsEntity = useMemo(()=>{
        return new MyBookingsEntityDefinition(myBookingsFields, "MyBookings")
    })

    const getData =  async () => {
        const result = await completeApiObj.getAllBookings();
        if(result.status < 400)
        {
            const data = result.data
            const myBookings = data.filter(booking => booking.user === user.user_id);
            success("Succesfully retrieve my bookings", true)
            return myBookings.map(myBooking => {
                return  {
                    ...myBooking,
                    booking_start_date: new Date(myBooking.booking_start_date).toUTCString(),
                    booking_end_date: new Date(myBooking.booking_end_date).toUTCString(),
                    info: <BookingDetail id={myBooking.parking_slot} />,
                    id: myBooking.booking_id,
                }    
            })
        }
        else{
            error("Problem in retrieve my bookings", true);
            return []
        }
    }

    const createBooking = async (data) => {
        console.log(data)
        const result = await completeApiObj.createBooking(data);
        if(result.status < 400)
        {
            success("Succesfully create booking", true)
        }
        else{
            error("Problem in create booking", true);
        }
    }

    const deleteBooking = async (id) => {
        const result = await completeApiObj.deleteBooking(id);
        if(result.status < 400)
        {
            success("Succesfully delete booking", true)
        }
        else{
            error("Problem in delete booking", true);
        }
    }

    return {myBookingsEntity, getData, createBooking, deleteBooking}
}