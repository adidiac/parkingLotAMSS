import {Button, NavLink, Navbar} from "react-bootstrap";
import logo from "../assets/logo.png";
import { useState } from "react";
import { GenericAddForm  } from "../GenericComponents/GenericComponents";
import Modal from 'react-bootstrap/Modal';
import { loginEntityDefinition, useLoginUser } from "../EntityDefinitions/Credentials";
import { useDispatch, useSelector } from "react-redux";
import { userRoles, pages } from "../utils/enums";
import ModalCart from "./ModalCart";
import { GoogleLogin } from 'react-google-login';
import * as Icons from 'react-bootstrap-icons';
export function FloatingNavbar()
{
    const [show, setShow] = useState(false);
    const [showModalCart,setShowModalCart]=useState(false);
    const [showModalVerifyUser,setShowModalVerifyUser]=useState(false);

    const {loginEntityDefinition, loginUser,verifyUser} = useLoginUser();

    const responseGoogle =async  (response) => {
        if(response.error){
            console.log(response.error);
            return;
        }
        else {
            console.log(response);
            await verifyUser();
        }

        setShowModalVerifyUser(false);
    }

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const bookings = useSelector(state=> state.bookings)

    const pageDispatch = (option) => {
        dispatch({type: option});
    }

    const logoutHandler = () => {
        dispatch({type: 'LOGOUT'});
        dispatch({type: pages.HOME});
    }

    const navbarOptions = () => {
        if (user === null) {
            return (
                <>
                <Button variant="primary"
                        onClick={() => setShow(true)}
                        style={{marginRight: "20px",fontSize: "20px"}}>
                    Login
                </Button>
                </>

            );
        }
        if ( user && user.role == userRoles.NORMAL) {
            return (
                <>
                <NavLink onClick={() => pageDispatch(pages.PARKING)}
                style={{marginRight: "20px",fontSize: "20px", fontWeight: "bold"}}>
                    Parking Spots
                </NavLink>
                <NavLink onClick={() => pageDispatch(pages.BOOKING)}
                    style={{marginRight: "20px",fontSize: "20px", fontWeight: "bold"}}>
                    My Bookings
                </NavLink>
                {
                    user && user.role == userRoles.NORMAL && !user.verified &&
                    <Button variant="primary"
                            onClick={() => setShowModalVerifyUser(true)}
                            style={{marginRight: "20px",fontSize: "20px", position:'relative'}}
                    >
                        Verify
                        <span className="notification-badge">
                            !
                        </span>
                    </Button>

                }
                <Button variant="primary"
                        onClick={() => setShowModalCart(true)}
                        style={{marginRight: "20px",fontSize: "20px", position:'relative'}}
                        >
                            <Icons.Cart size={25}></Icons.Cart>
                            {
                                bookings && bookings.length>0 &&
                                <span className="notification-badge">
                                    {bookings.length}
                                </span>
                            }
                </Button>
                <Button variant="primary"
                        onClick={() => logoutHandler()}
                        style={{marginRight: "20px",fontSize: "20px"}}
                >Logout</Button>
                </>
            );
        }
        if ( user && user.role == userRoles.PARKOWNER ) {
            return (
                <>
                <NavLink onClick={() => pageDispatch(pages.PARKING)}
                 style={{marginRight: "20px",fontSize: "20px", fontWeight: "bold"}}>
                    Parking Spots
                </NavLink>
                <Button variant="primary"
                        onClick={() => logoutHandler()}
                        style={{marginRight: "20px",fontSize: "20px"}}
                >Logout</Button>
                </>
            );
        }
    }
        

    return (
        <>
        <Navbar bg="light" variant="dark" fixed="top">
            <Navbar.Brand style={{color:'black'}}>
                <img
                    alt=""
                    src={logo}
                    width="200"
                    height="70"
                    className="d-inline-block align-top"
                    style={{marginLeft: "100"}}
                />
                <h1 style={{display: "inline-block", margin:15}}>SmartParking</h1>
            </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
                {navbarOptions()}
            </Navbar.Collapse>
        </Navbar>
        <GenericAddForm
            data={loginEntityDefinition.fields.map((field, idx)=>field.createAddData())}
            onSubmit={loginUser}
            title="Login"
            submitButtonText="Login"
            show={show}
            handleClose={()=>setShow(false)}
        />
        <ModalCart
            modalShow={showModalCart}
            setModalShow={setShowModalCart}
        />
        <Modal show={showModalVerifyUser} onHide={()=>setShowModalVerifyUser(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Verify User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Verify your account by clicking the following link</p>
                <GoogleLogin
                    clientId="1014471883707-os54kb55pdobochl263dje9drgc6u1o8.apps.googleusercontent.com"
                    buttonText=""
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>setShowModalVerifyUser(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}