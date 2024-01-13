import React, {useState, useEffect} from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { BaseApi, enumMethods } from '../Api/BaseApi';
import { GenericAddForm, GenericUpdateForm } from './GenericComponents';

export function GenericTabel({
    entityDefinition = null,
    getDataMethod = null,
    addDataMethod = null,
    updateDataMethod = null,
    deleteDataMethod = null
})
{
    const [data, setData] = useState([]);
    const [showUpdate, setShowUpdate] = useState(false);
    const [showAdd, setShowAdd] = useState(false);

    const handleShowUpdate = () => setShowUpdate(true);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowAdd = () => setShowAdd(true);
    const handleCloseAdd = () => setShowAdd(false);

    const getData = async ()=>{
        if (!getDataMethod) return;
        const data = await getDataMethod();
        setData(data);
    }

    const updateData = async (data,id)=>{
        if (!updateDataMethod) return
        await updateDataMethod(data,id);
        getData();
    }

    const deleteData = async (id)=>{
        if (!deleteDataMethod) return
        await deleteDataMethod(id);
        getData();
    }

    const addData = async (data)=>{
        if (!addDataMethod) return
        const result = await addDataMethod(data);
        getData();
    }

    const updateComponent = (element) => {
        if (!updateDataMethod) return <></>
        return <>
        <Button variant="primary" onClick={handleShowUpdate}>
            Update
        </Button>
        { 
            showUpdate && 
            <GenericUpdateForm
                data = { entityDefinition.getFields().map((field)=>{
                    return field.createUpdateData(element[field.key]);
                })}
                onSubmit = {(data)=>updateData(data, element.id)}
                title = {"Update "+ entityDefinition.getEntityName()}
                submitButtonText = "Update"
                show = {showUpdate}
                handleClose = {handleCloseUpdate}
            />
        }
        </>
    }

    const deleteComponent = (element) => {
        if (!deleteDataMethod) return <></>
        return <Button variant="danger" onClick={()=>deleteData(element.id)}>Delete</Button>
    }

    const addComponent = () => {
        if(!addDataMethod) return <></>
        return <>
            <Button variant="primary" onClick={handleShowAdd}>
                Add
            </Button>
            <GenericAddForm
                data={ entityDefinition.getFields().map((field)=>{
                    return field.createAddData();
                })}
                onSubmit={(data)=>addData(data)}
                title={"Add "+entityDefinition.getEntityName()}
                submitButtonText="Add"
                show={showAdd}
                handleClose={handleCloseAdd}
            />
        </>
    }

    useEffect(()=>{
        getData();
    },[])

    return <Table striped bordered hover>
        <thead>
        <tr>
           <th>Index</th>
          {
            entityDefinition.getFields().map((field)=>{
                return <th>{field.label}</th>
            })
          }
          {
            (updateDataMethod!=null || deleteDataMethod!=null) && 
            <th>
                Actions
            </th>
           } 
        </tr>
        {addComponent()}
        </thead>
        <tbody>
        {data.map((element,idx)=>{
                return <tr key={idx}>
                    <td>{idx+1}.</td>
                    {
                        entityDefinition.getFields().map((field)=>{
                            return <td style={{textAlign:'center'}}>
                                {
                                element[field.key]
                                }
                                </td>
                        })
                    }
                    { (updateDataMethod!=null || deleteDataMethod !=null) && 
                    <td>
                        {updateComponent(element)}
                        {deleteComponent(element)}
                    </td>
                    }
                </tr>
            }
        )}
        </tbody>
    </Table>

}