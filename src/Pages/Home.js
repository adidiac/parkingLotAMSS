import { Button, Container,Row,Col } from 'react-bootstrap';
import background1 from '../assets/background1.png';
import background2 from '../assets/background2.png';
import { GenericAddForm } from '../GenericComponents/GenericComponents';
import {useRegisterParkingOwnerHook} from '../EntityDefinitions/ParkingOwner';
import {useRegisterNormalUserHook} from '../EntityDefinitions/User';
import { useState } from 'react';
export default function Home() {
  const containerCenter = (leftOrRight)=>
  {
    if (leftOrRight === "left") 
    return {
      position: "absolute",
      left: "0",
      top: "0",
      width: "50%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
    }
    else if (leftOrRight === "right")
    return {
      position: "absolute",
      right: "0",
      top: "0",
      width: "50%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
    }
  }
  const [showNormalUser, setShowNormalUser] = useState(false);
  const [showParkOwnerUser, setShowParkOwnerUser] = useState(false);

  const {
    registerParkOnwerEntity,
    registerParkingOwner
  } = useRegisterParkingOwnerHook();

  const  {
    registerNormalUserEntity,
    registerNormalUser
   } = useRegisterNormalUserHook();

    return (
        <div className="demo image above">
          <div id="user-screen" className="left">
          <img id="image_home"  src={background1}></img>
          <Container style={containerCenter("left")}>
            <Col style={{marginLeft:'5vh'}}>
              <Row>
                  <h1>Find</h1>
              </Row>
              <Row>
                  <h1>a Parking Spot</h1>
              </Row>
              <Row>
                  <h1>at any hour</h1>
              </Row>
              <Row>
              <Button variant="primary" size="lg" style={{maxWidth:'30vh'}} onClick={()=>setShowNormalUser(true)}>
                Get Started
               </Button>
              </Row>
            </Col>
          </Container>
          </div>
          <div id="api" className="right">
          <img id="image_api" src={background2}></img>
          <Container style={containerCenter("right")}>
          <Col style={{marginLeft:'50vh'}}>
              <Row>
                  <h1>Register </h1>
              </Row>
              <Row>
                  <h1>your Parking Spot</h1>
              </Row>
              <Row>
                <Button variant="primary" size="lg" style={{maxWidth:'30vh'}} onClick={()=>setShowParkOwnerUser(true)}>
                    Get Started
                </Button>
              </Row>
            </Col>
          </Container>
          </div>
            <GenericAddForm
                data={registerNormalUserEntity.getFields().map((field, idx)=>field.createAddData())}
                onSubmit={registerNormalUser}
                title="Register"
                submitButtonText="Register"
                show={showNormalUser}
                handleClose={()=>setShowNormalUser(false)}
            />
            <GenericAddForm
                data={registerParkOnwerEntity.getFields().map((field, idx)=>field.createAddData())}
                onSubmit={registerParkingOwner}
                title="Register"
                submitButtonText="Register"
                show={showParkOwnerUser}
                handleClose={()=>setShowParkOwnerUser(false)}
            />
      </div>
    );
}