import { Field, EntityDefinition } from "../GenericComponents/GenericComponents";
import {useDispatch} from 'react-redux';
import { useMemo } from "react";
import { Notification, info, success, warning, error } from "../notify";
import {completeApiObj} from "../Api/CompleteApi";
import { userRoles, pages } from "../utils/enums";

class ParkingOwnerEntityDefiniton extends EntityDefinition {
    constructor(path, fields, entityName) {
        super(path, fields, entityName);
    }
}

const registerParkOwnerUserFields = [
    new Field("first_name", "text", "Enter First Name", "First Name").withRegex(/^[a-zA-Z]+$/),
    new Field("last_name", "text", "Enter Last Name", "Last Name").withRegex(/^[a-zA-Z]+$/),
    new Field("email", "email", "Enter Email", "Email").withRegex(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/),
    new Field("password", "password", "Enter Password", "Password").withRegex(/^[a-zA-Z0-9]+$/),

]
export const useRegisterParkingOwnerHook = () =>
{
    const dispatch = useDispatch();

    const registerParkOnwerEntity = useMemo(() => {
        return new ParkingOwnerEntityDefiniton(registerParkOwnerUserFields, "Parking Owner");
    }, []);

    const  registerParkingOwner = async (entity) => {
        const response = await completeApiObj.registerParkOwner(entity);
        if (response.status < 400) {
            const data = response.data; // {first_name, last_name, park_owner_id, password, email}
            dispatch({type: 'LOGIN', payload: {...data, role: userRoles.PARKOWNER}});
            dispatch({type: pages.MYPARKINGS});
            success("Registration successful",true);
        }
        else {
            error("Registration failed",true);
        }
    }

    return {registerParkOnwerEntity, registerParkingOwner};
} 