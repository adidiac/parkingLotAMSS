import { Field, EntityDefinition } from "../GenericComponents/GenericComponents";
import {completeApiObj} from "../Api/CompleteApi";
import { Notification, info, success, warning, error } from "../notify";
import { userRoles, pages } from "../utils/enums";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { booleanToString } from "../utils/toStringMethods";
import ParkingSlotDetails from "../Components/ParkingSlotDetails"
import AddBooking from "../Components/AddBooking";
import {getMap} from "../utils/geo"

class ParkingsEntityDefinition extends EntityDefinition
{
    constructor(fields, entityName)
    {
        super(fields, entityName);
    }
}

const getMapUrls = (data) =>{
    const [lat, long] = data.split(" ")
    return getMap(parseInt(long),parseInt(lat));
}
const specialFieldMap = {
    getComponent: (data, dataValues) =>{
        const dataValue = dataValues["map"]
        const value = dataValue ?? data.defaultValue
        if(value === undefined) return <></>
        return <img src={getMapUrls(value)} style={{width:"100%",height:200}}></img> 
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

const addParkFields = [
    new Field("no_floors","number","Number of floors", "Number of floors",null,null, null, false).withRegex(),
    new Field("total_spots","number","Total spots", "Total spots",null,null, null, false).withRegex(),
    new Field("address","string","Address", "Address",null,null, null, false).withRegex(),
    new Field("latitude","number","Latitude", "Latitude",null,null, null, false).withRegex(),
    new Field("longitude","number","Longitude", "Longitude",null,null, null, false).withRegex(),
    new Field("height_limit","number","Height limit", "Height limit",null,null, null, false).withRegex(),
    new Field("weigh_limit","number","Weigh limit", "Weigh limit",null,null, null, false).withRegex(),
    new Field("map","","", "Map of location", specialFieldMap, "30 30", null, true).withCallbackOnChange((dataValues, setStateValues) =>{
        const longitude = dataValues["longitude"];
        const latitude = dataValues["latitude"];
        if (longitude && latitude) {
            setStateValues({...dataValues, map: `${longitude} ${latitude}`});
        }
    })
]

const addFloorFields = [
    new Field("floor_number","number","Floor number", "Floor number",null,null, null, false).withRegex(),
]

const addParkingSlotFields = [
    new Field("floor","number","", "Floor", "",null, null, null).withRegex(),
    new Field("slot_number","number","","Slot number", "",null, null, null).withRegex(),
    new Field("has_charger","checkbox","","Has charger", "", null, null, null).withRegex(),
    new Field("physical_available","checkbox","","Physical available", "", null, null, null).withRegex(),
    new Field("standard_price","number","", "Standard price", "", null, null, null).withRegex(),
]
        

export const useParkingSlotsHook = () =>{

    const user = useSelector(state=>state.user)

    const parkingSlotsEntity = useMemo(()=>{
        return new ParkingsEntityDefinition(parkingsFields, "Parkings")
    })

    const parkingSlotEntityById = useMemo(()=>{
        return new ParkingsEntityDefinition(parkingsFields.slice(0,4), "Parking")
    })

    const parkingSlotEntityAdministration = useMemo(()=>{
        return new ParkingsEntityDefinition(parkingFieldsAdmin, "Parking Administration")
    },[])

    const addParkEntity = useMemo(()=>{
        return new ParkingsEntityDefinition(addParkFields, "Add park")
    },[])

    const addFloorEntity = useMemo(()=>{
        return new ParkingsEntityDefinition(addFloorFields, "Add floor")
    },[])

    const addParkingSlotEntity = useMemo(()=>{
        return new ParkingsEntityDefinition(addParkingSlotFields, "Add parking slot")
    },[])

    const getData =  async ( update = false, parkId) => {
        const result = await completeApiObj.getAllParkingSlots()
        if(result.status < 400)
        {
            const data = result.data
            console.log('Parking slots', data)
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
                    info: <ParkingSlotDetails id = {parkId ?? parkingSlot.parking_slot_id} />,
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

    const getDataByPark = async (id) => {
        const allParksSlots = await getData(true, id)
        const floors = await completeApiObj.getAllFloors()
        console.log('Floors',floors.data)
        const floorsData = floors.data.filter (floor => floor.park === id)
        const allParksSlotsData = allParksSlots.filter(parkingSlot => {
            return floorsData.some(floor => floor.floor_id === parkingSlot.floor)
        })
        return allParksSlotsData
    }

    const getAllParks = async () => {
        const resultParks = await completeApiObj.getAllParkings()
        if(resultParks.status < 400)
        {
            const dataParks = resultParks.data
            console.log('Parks', dataParks)
            success("Succesfully retrieve parks", true)
            return dataParks
            .filter(park=>park.park_owner === user.park_owner_id)
            .map(park=>{
                return {...park,
                toString: (park) => {
                    return `Parking id: ${park.park_id} \n 
                    Total floors: ${park.no_floors} \n
                    Total slots: ${park.total_spots} \n
                    `
                }}
            })
        }
        else{
            error("Problem in retrieve parks", true);
            return []
            
        }
    }

    const addParkMethod = async (data) => {
        const park_owner = user.park_owner_id
        const parkDetails = {
            address : data.address,
            latitude : data.latitude,
            longitude : data.longitude,
            height_limit : data.height_limit,
            weigh_limit : data.weigh_limit
        }

        const result = await completeApiObj.addParkDetails(parkDetails)
        if(result.status < 400)
        {
            const park = {
                no_floors : data.no_floors,
                total_spots : data.total_spots,
                park_owner : park_owner,
                park_details : result.data.park_details_id
            }
            const resultPark = await completeApiObj.addPark(park)
            if(resultPark.status < 400)
            {
                success("Succesfully add park", true)
            }
            else{
                error("Problem in add park", true);
            }
        }
    }

    const addFloorMethod = async (data, parkId) => {
        console.log('park id add flor', parkId, data)
        // const result = await completeApiObj.addFloor(data)
        // if(result.status < 400)
        // {
        //     success("Succesfully add floor", true)
        // }
        // else{
        //     error("Problem in add floor", true);
        // }
    }

    const addParkingSlotMethod = async (data, parkId) => {
        console.log('park id add park slot', parkId, data)
        // const result = await completeApiObj.addParkingSlot(data)
        // if(result.status < 400)
        // {
        //     success("Succesfully add parking slot", true)
        // }
        // else{
        //     error("Problem in add parking slot", true);
        // }
    }

    return {
        parkingSlotsEntity,
        getData,
        parkingSlotEntityById,
        getDataById,
        parkingSlotEntityAdministration,
        updateData,
        getDataByPark,
        getAllParks,
        addParkEntity,
        addParkMethod,
        addFloorEntity,
        addParkingSlotEntity,
        addFloorMethod,
        addParkingSlotMethod
    }
}