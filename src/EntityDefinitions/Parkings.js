import { Field, EntityDefinition } from "../GenericComponents/GenericComponents";
import {completeApiObj} from "../Api/CompleteApi";
import { Notification, info, success, warning, error } from "../notify";
import { userRoles, pages } from "../utils/enums";
import { useDispatch } from "react-redux";
import { useMemo } from "react";
import { booleanToString } from "../utils/toStringMethods";
import ParkingSlotDetails from "../Components/ParkingSlotDetails"
import AddBooking from "../Components/AddBooking";

class ParkingsEntityDefinition extends EntityDefinition
{
    constructor(fields, entityName)
    {
        super(fields, entityName);
    }
}
//TODO: add regex
const parkingsFields = [
    new Field("floor","number","", "Floor", "",null, null, true).withRegex(),
    new Field("slot_number","number","","Slot number", "",null, null, true).withRegex(),
    new Field("has_charger","text","","Has charger", "", null, null, true).withRegex(),
    new Field("physical_available","text","","Physical available", "", null, null, true).withRegex(),
    new Field("standard_price","number","", "Standard price", "", null, null, true).withRegex(),
    new Field("info","","", "More info", "", "").withRegex(),
    new Field("add","","", "Add booking", "", "").withRegex(),
]

const parkingFieldsAdmin = [
        new Field("parking_slot_id","hidden","", "Parking slot id", "",null, null,null).withRegex(),
        new Field("floor","number","", "Floor", "",null, null, null).withRegex(),
        new Field("slot_number","number","","Slot number", "",null, null, null).withRegex(),
        new Field("has_charger","checkbox","","Has charger", "", null, null, null).withRegex(),
        new Field("physical_available","checkbox","","Physical available", "", null, null, null).withRegex(),
        new Field("standard_price","number","", "Standard price", "", null, null, null).withRegex(),
]
export const useParkingSlotsHook = () =>{

    const parkingSlotsEntity = useMemo(()=>{
        return new ParkingsEntityDefinition(parkingsFields, "Parkings")
    })

    const parkingSlotEntityById = useMemo(()=>{
        return new ParkingsEntityDefinition(parkingsFields.slice(0,4), "Parking")
    })

    const parkingSlotEntityAdministration = useMemo(()=>{
        return new ParkingsEntityDefinition(parkingFieldsAdmin, "Parking Administration")
    },[])

    const getData =  async ( update = false) => {
        const result = await completeApiObj.getAllParkingSlots()
        if(result.status < 400)
        {
            const data = result.data
            success("Succesfully retrieve parking slots", true)
            return data.map(parkingSlot=>{
                return {
                    ...parkingSlot,
                    id:parkingSlot.parking_slot_id,
                    has_charger: update ? parkingSlot.has_charger :
                    booleanToString(parkingSlot.has_charger),
                    physical_available: update ? parkingSlot.physical_available :
                    booleanToString(parkingSlot.physical_available),
                    toString: (parkingSlot) => {
                        return `Floor: ${parkingSlot.floor} \n 
                        Slot number: ${parkingSlot.slot_number} \n
                        Has charger: ${parkingSlot.has_charger} \n
                        Physical available: ${parkingSlot.physical_available} \n
                        Standard price: ${parkingSlot.standard_price}`
                    },
                    info: <ParkingSlotDetails id = {parkingSlot.parking_slot_id} />,
                    add: <AddBooking id = {parkingSlot.parking_slot_id} price = {parkingSlot.standard_price} />
                }
            })
        }
        else{
            error("Problem in retrieve parking slots", true);
            return []
        }
    }

    const getDataById = async (id, isUpdate = false) => {
        const result = await completeApiObj.getParkingSlot(id)
        if(result.status < 400)
        {
            const parkingSlot = result.data
            return {
                ...parkingSlot,
                parking_slot_id:parkingSlot.parking_slot_id,
                has_charger: isUpdate ? parkingSlot.has_charger :
                booleanToString(parkingSlot.has_charger),
                physical_available: isUpdate ? parkingSlot.physical_available :
                booleanToString(parkingSlot.physical_available),
            }
        }
        else{
            error("Problem in retrieve parking slot", true);
            return {}
        }
    }

    const updateData = async (data) => {
        const result = await completeApiObj.updateParkingSlot(data)
        if(result.status < 400)
        {
            success("Succesfully update parking slot", true)
        }
        else{
            error("Problem in update parking slot", true);
        }
    }

    return {parkingSlotsEntity, getData, parkingSlotEntityById, getDataById, parkingSlotEntityAdministration, updateData}
}