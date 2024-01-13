import { Field, EntityDefinition } from "../GenericComponents/GenericComponents";
import {completeApiObj} from "../Api/CompleteApi";
import { useMemo } from "react";
import {getMap} from "../utils/geo"
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
    getComponent: (data, handleChange) => <img src={getMapUrls(data)} style={{width:"100%",height:200}}></img> 
}

const parkingSlotDetailsFields = [
    new Field("address","string","","Address",null,null,null,true),
    new Field("latitude","string","","Latitude",null,null,null,true),
    new Field("longitude","string","","Longitude",null,null,null,true),
    new Field("height_limit","string","","Height limit",null,null,null,true),
    new Field("weigh_limit","string","","Weigh limit",null,null,null,true),
    new Field("map","","", "Map of location", specialFieldMap, null, null, true)
]

export const useParkingSlotDetailsHook = (id) => {
    const parkingSlotDetailsEntity = useMemo(()=>{
        return new ParkingSlotDetailsEntityDefinition(parkingSlotDetailsFields,"Parking slot details")
    });
    const getDetails = async () => {
        const result = await completeApiObj.getParkDetails('1');
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

    return {parkingSlotDetailsEntity, getDetails}
}