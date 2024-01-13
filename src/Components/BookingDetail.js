import { useParkingSlotsHook } from '../EntityDefinitions/Parkings';
import { GenericUpdateForm } from "../GenericComponents/GenericComponents"
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { useEffect, useState } from "react";
export default function BookingDetail({id})
{
    const {
        parkingSlotEntityById,
        getDataById
     } = useParkingSlotsHook();

    const [showUpdate, setShowUpdate] = useState();

    const [element, setElement] = useState(null)

    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    const setData = async () =>{
        const element = await getDataById(id);
        if(element) setElement(element);
    }

    useEffect(()=>{
        setData();
    },[])

    return <>
        <Button variant="primary" onClick={handleShowUpdate}>
            Info
        </Button>
        { 
            showUpdate && element && 
            <GenericUpdateForm
                data = { parkingSlotEntityById.getFields().map((field)=>{
                    return field.createUpdateData(element[field.key]);
                })}
                onSubmit = {()=>{}}
                title = {parkingSlotEntityById.getEntityName()}
                submitButtonText = {null}
                show = {showUpdate}
                handleClose = {handleCloseUpdate}
            />
        }
    </>
}