import { Field, EntityDefinition } from "../GenericComponents/GenericComponents";
import {completeApiObj} from "../Api/CompleteApi";
import { useMemo } from "react";
import {getMap} from "../utils/geo"
import { error, success } from "../notify";
class ParkingSlotDetailsEntityDefinition extends EntityDefinition
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
const oldLonLat = {
    longitude: 0,
    latitude: 0
}

const parkingSlotDetailsFields = [
    new Field("park_details_id","hidden","","Id",null,null,null,null),
    new Field("address","string","","Address",null,null,null,null),
    new Field("latitude","string","","Latitude",null,null,null,null),
    new Field("longitude","string","","Longitude",null,null,null,null),
    new Field("height_limit","string","","Height limit",null,null,null,null),
    new Field("weigh_limit","string","","Weigh limit",null,null,null,null),
    new Field("map","","", "Map of location", specialFieldMap, null, null, true).withCallbackOnChange((dataValues, setStateValues) =>{
        const longitude = dataValues["longitude"];
        const latitude = dataValues["latitude"];
        if (oldLonLat.longitude !== longitude || oldLonLat.latitude !== latitude) {
            oldLonLat.longitude = longitude;
            oldLonLat.latitude = latitude;
            if (longitude && latitude) {
                setStateValues({...dataValues, map: `${longitude} ${latitude}`});
            }
        }
    })
]

export const useParkingSlotDetailsHook = (id = '1', isUpdate=false) => {
    const parkingSlotDetailsEntity = useMemo(()=>{
        const entity = new ParkingSlotDetailsEntityDefinition(parkingSlotDetailsFields ,"Parking slot details")
        return isUpdate ? entity.withOutReadOnly() : entity.withReadOnly();
    },[isUpdate])
    
    const getDetails = async (id = '1') => {
        const result = await completeApiObj.getParkDetails(id);
        if(result.status < 400)
        {
            const data = {
                ...result.data,
                map: result.data?.latitude+" "+result.data?.longitude
            }
            return data;
        }
        else
        {
            return null
        }
    }

    const updateDetails = async (id, data) => {
        const result = await completeApiObj.updateParkDetails(id, data);
        if(result.status < 400)
        {
            success("Succesfully update parking slot details", true)
        }
        else
        {
            error("Problem in update parking slot details", true);
        }
    }

    return {parkingSlotDetailsEntity, getDetails, updateDetails}
}