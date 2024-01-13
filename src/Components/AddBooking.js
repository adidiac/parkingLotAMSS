import {useState} from 'react';
import { GenericAddForm } from "../GenericComponents/GenericComponents"
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { useAddParkingSlotBookingEntityDefinitionHook } from '../EntityDefinitions/AddParkingSlotBookingDefinition';

export default function AddBooking({id, price})
{
    const {
    addParkingSlotBookingEntityDefinition, 
    createNewBooking
     } = useAddParkingSlotBookingEntityDefinitionHook({id,price});
    
    const [showUpdate, setShowUpdate] = useState();

    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    return <>
    <Button variant="primary" onClick={handleShowUpdate}>
        Add booking
    </Button>
    { 
        showUpdate && 
        <GenericAddForm
            data = { addParkingSlotBookingEntityDefinition.getFields().map((field)=>{
                return field.createAddData();
            })}
            onSubmit = {createNewBooking}
            title = {addParkingSlotBookingEntityDefinition.getEntityName()}
            submitButtonText = "Create booking"
            show = {showUpdate}
            handleClose = {handleCloseUpdate}
        />
    }
</>
}