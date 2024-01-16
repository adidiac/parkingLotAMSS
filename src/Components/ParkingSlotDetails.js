import { useParkingSlotDetailsHook } from "../EntityDefinitions/ParkSlotDetails"
import { GenericUpdateForm } from "../GenericComponents/GenericComponents"
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { useEffect, useState } from "react";
export default function ParkingSlotDetails({id, isUpdate})
{
    const {
        parkingSlotDetailsEntity,
        getDetails,
        updateDetails
     } = useParkingSlotDetailsHook(id, isUpdate);

    const [showUpdate, setShowUpdate] = useState();

    const [element, setElement] = useState(null)

    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    const setData = async () =>{
        const element = await getDetails(id);
        if(element) setElement(element);
    }

    useEffect(()=>{
        setData();
    },[])

    return <>
        {   element
            ? <Button variant="primary" onClick={handleShowUpdate}>
                Info
              </Button>
            : 'No info'
        }
        { 
            showUpdate && element && 
            <GenericUpdateForm
                data = { parkingSlotDetailsEntity.getFields().map((field)=>{
                    return field.createUpdateData(element[field.key]);
                })}
                onSubmit = {async (data)=>{
                    isUpdate && await updateDetails(id, data)
                    setData();
                }}
                title = {parkingSlotDetailsEntity.getEntityName()}
                submitButtonText = {isUpdate ? 'Update' : null}
                show = {showUpdate}
                handleClose = {handleCloseUpdate}
            />
        }
    </>
}