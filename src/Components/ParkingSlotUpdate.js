import { useParkingSlotsHook } from "../EntityDefinitions/Parkings";
import * as Icon from 'react-bootstrap-icons'
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {GenericUpdateForm} from "../GenericComponents/GenericComponents";

export default function ParkingSlotUpdate({id, callback})
{
    const {
        parkingSlotEntityAdministration,
        getDataById, 
        updateData
     } = useParkingSlotsHook(id);

    const [showUpdate, setShowUpdate] = useState();

    const [element, setElement] = useState(null)

    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    const setData = async () =>{
        const element = await getDataById(id, true);
        if(element) setElement(element);
    }

    useEffect(()=>{
        setData();
    },[])

    return <>
        {   element
            ? <Button variant="primary" onClick={handleShowUpdate} style={{borderRadius:50, height:40, width:40}}>
                <Icon.PencilSquare />
              </Button>
            : 'No info'
        }
        { 
            showUpdate && element && 
            <GenericUpdateForm
                data = { parkingSlotEntityAdministration.getFields().map((field)=>{
                    return field.createUpdateData(element[field.key]);
                })}
                onSubmit = {async (data) => {
                    await updateData(data);
                    if(callback) callback();
                    setData();
                }}
                title = {parkingSlotEntityAdministration.getEntityName()}
                submitButtonText = {"Update"}
                show = {showUpdate}
                handleClose = {handleCloseUpdate}
            />
        }
    </>
}