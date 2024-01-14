import { Container,Image,Row,Col,Card, Button ,Accordion} from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons'
import { useParkingSlotsHook } from "../EntityDefinitions/Parkings";
import MyParkingsSlots from "../Components/MyParkingsSlots";
import { useEffect, useState } from "react";
import { GenericAddForm } from "../GenericComponents/GenericComponents";
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
    } = useParkingSlotsHook()

    const [parks, setParks] = useState([])
    const [open, setOpen] = useState([])

    const [openAddPark, setOpenAddPark] = useState(false)
    const [openAddFloor, setOpenAddFloor] = useState(false)
    const [openAddParkingSlot, setOpenAddParkingSlot] = useState(false)


    const openPark = (idx) =>{
        setOpen(prevState=>{
            const newState = [...prevState]
            newState[idx] = !newState[idx]
            return newState
        })
    }

    useEffect(()=>{
        getAllParks().then(data=>{
            setParks(data)
            setOpen(data.map(()=>false))
        })
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
            onSubmit = {(data)=>{
                addParkMethod(data)
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
                               <Button >
                                    Add Floor
                               </Button>
                                 </Col>
                                    <Col md={{ span: 1, offset: 1 }}>
                               <Button>
                                    Add Slot
                                 </Button>
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