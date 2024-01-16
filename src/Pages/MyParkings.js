import { Container,Image,Row,Col,Card, Button ,Accordion} from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons'
import { useParkingSlotsHook } from "../EntityDefinitions/Parkings";
import MyParkingsSlots from "../Components/MyParkingsSlots";
import { useEffect, useState } from "react";
import { GenericAddForm, GenericUpdateForm } from "../GenericComponents/GenericComponents";
import ParkingSlotDetails from "../Components/ParkingSlotDetails";
export default function MyParkings(){
    const  {
        getAllParks,
        getDataParkings,
        addParkEntity,
        addParkMethod,
        addFloorEntity,
        addParkingSlotEntity,
        addFloorMethod,
        addParkingSlotMethod,
        getFloorsByPark
    } = useParkingSlotsHook()

    const [parks, setParks] = useState([])
    const [openAddPark, setOpenAddPark] = useState(false)
    const [openAddFloor, setOpenAddFloor] = useState(false)
    const [openAddParkingSlot, setOpenAddParkingSlot] = useState(false)

    const getData = () =>{
        getAllParks().then(data=>{
            setParks(data)
        })
    }

    useEffect(()=>{
        getData()
    },[])

    return <Container style={{textAlign:'center',marginTop:200
    }}>
        <h2 style={{textAlign:'center', fontWeight:'bold', color:'white'}}>My Parkings</h2>
        <Button style={{marginBottom:20, background:'transparent', border:'none', color:'white', fontSize:30
        }} variant='link'
        onClick={()=>{setOpenAddPark(true)}}>
            <Icon.PlusCircle></Icon.PlusCircle>
        </Button>
        { openAddPark && 
        <GenericAddForm
            data = { addParkEntity.getFields().map((field)=>{
                return field.createAddData();
            })}
            onSubmit = {async (data)=>{
                await addParkMethod(data)
                getData()
            }}
            title = {addParkEntity.getEntityName()}
            submitButtonText = "Create Park"
            show = {openAddPark} 
            handleClose = {()=>setOpenAddPark(false)}
        />
        }
        <hr style={{borderTop:'1px solid white'}}/>
        <Accordion defaultActiveKey={['0']}>
            {
                parks.map((el,idx)=>{
                    return (
                        <Accordion.Item eventKey={idx}>
                            <Accordion.Header style={{textAlign:'center', fontWeight:'bold'}}>
                                <h5>{el.toString(el)}</h5>
                            </Accordion.Header>
                            <Accordion.Body>
                            <Row>
                               <Col md={{ span: 1, offset: 1 }}>
                               <Button onClick={()=>{
                                setOpenAddFloor(true)
                                }}>
                                    Add Floor
                               </Button>
                                <GenericAddForm 
                                    data = { addFloorEntity.getFields().map((field)=>{
                                        return field.createAddData();
                                    })}
                                    onSubmit = {async (data)=>{
                                        await addFloorMethod(data,el.park_id)
                                        getData()
                                    }}
                                    title = {addFloorEntity.getEntityName()}
                                    submitButtonText = "Create Floor"
                                    show = {openAddFloor} 
                                    handleClose = {()=>setOpenAddFloor(false)}
                                />
                                </Col>
                                    <Col md={{ span: 1, offset: 1 }}>
                               <Button onClick={async ()=>{
                                const floors = await getFloorsByPark(el.park_id)
                                console.log(floors)
                                addParkingSlotEntity.withFloors(floors);
                                setOpenAddParkingSlot(true)
                                }}>
                                    Add Slot
                                 </Button>
                                 <GenericAddForm 
                                    data = { addParkingSlotEntity.getFields().map((field)=>{
                                        return field.createAddData();
                                    })}
                                    onSubmit = {async (data)=>{
                                        await addParkingSlotMethod(data,el.park_id)
                                        getData()
                                    }}
                                    title = {addParkingSlotEntity.getEntityName()}
                                    submitButtonText = "Create Slot"
                                    show = {openAddParkingSlot} 
                                    handleClose = {()=>setOpenAddParkingSlot(false)}
                                />
                                </Col>
                                <Col md={{ span: 1, offset: 1 }}>
                                    <ParkingSlotDetails id={el.park_details} isUpdate={true}/>
                                </Col>
                                 </Row> 
                                <MyParkingsSlots park={el.park_id}/>
                            </Accordion.Body>
                        </Accordion.Item>
                    )
                })  
            }
        </Accordion>
    </Container>
}