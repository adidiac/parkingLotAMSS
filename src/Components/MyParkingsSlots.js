import { Container,Image,Row,Col,Card, Button ,Alert} from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons'
import { useParkingSlotsHook } from "../EntityDefinitions/Parkings";
import ParkingSlotUpdate from "./ParkingSlotUpdate";
import { useEffect, useState } from "react";
export default function MyParkingsSlots({
    park
}) {
    const  {
        getDataByPark,
        parkingSlotEntityAdministration,
    } = useParkingSlotsHook()

    const [parkingSlots, setParkingSlots] = useState([])
    const content = {header:'Parking Slot',body:'Parking Location'}
    const additionalButtons = []

    const getDataParkings = async () =>{
        getDataByPark(park).then(data=>{
            setParkingSlots(data)
        })
    }

    useEffect(()=>{
        getDataByPark(park).then(data=>{
            setParkingSlots(data)
        })
    },[])

    return <Container variant={'info'} style={{margin:10}}>
           <Row style={{justifyContent:''}}>
            { 
                parkingSlots.map((el,idx)=>
                {
                    return ( 
                        <Card style={{margin:20, width:'20%'}}>
                            <Card.Header>
                                <Row id={idx}>
                                    <Col>{content.header+': '+el.id}</Col>
                                    <Col>
                                        <ParkingSlotUpdate id={el.id} callback={getDataParkings}/>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                {content.body+': '+el.toString(el)}
                            </Card.Body>
                        </Card>);
                })
            }
            { additionalButtons.map((el)=>el) }
        </Row>
    </Container>
}