import { Field, EntityDefinition} from "../GenericComponents/GenericComponents";
import { completeApiObj } from "../Api/CompleteApi";
import { pages, userRoles } from "../utils/enums";
import { Notification, info, success, warning, error } from "../notify";
import {useDispatch} from 'react-redux'
import { useMemo } from "react";
class UserEntityDefiniton extends EntityDefinition {
    constructor(path, fields, entityName) {
        super(path, fields, entityName);
    }
}
const registerNormalUserFields = [
    new Field("first_name", "text", "Enter First Name", "First Name").withRegex(/^[a-zA-Z]+$/),
    new Field("last_name", "text", "Enter Last Name", "Last Name").withRegex(/^[a-zA-Z]+$/),
    new Field("number_plate", "text", "Enter Number Plate", "Number Plate").withRegex(/^[a-zA-Z0-9]+$/),
    new Field("vehicle_type", "text", "Enter Vehicle Type", "Vehicle Type").withRegex(/^[a-zA-Z0-9]+$/),
    new Field("email", "email", "Enter Email", "Email").withRegex(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/),
    new Field("password", "password", "Enter Password", "Password").withRegex(/^[a-zA-Z0-9]+$/),
];

export const useRegisterNormalUserHook = () =>
{
    const dispatch = useDispatch();

    const registerNormalUserEntity = useMemo(()=>{
        return new UserEntityDefiniton(registerNormalUserFields, "User");
    },[])

    const registerNormalUser = async (entity) => {
        const responseCredentials = await completeApiObj.createCredentials({
            email: entity.email,
            password: entity.password
        })

        if(responseCredentials.status < 400){
            const dataCredentials = responseCredentials.data; // {credentials_id, email, password}
            const entityUser = {
                credentials: dataCredentials.credentials_id,
                first_name: entity.first_name,
                last_name: entity.last_name,
                number_plate: entity.number_plate,
                vehicle_type: entity.vehicle_type,
                verified: false
            }
            const response = await completeApiObj.registerUser(entityUser);
            if (response.status < 400) {
                const data = response.data; // {first_name, last_name, credentials, number_plate, vehicle_type, verified, user_id}
                dispatch({type: 'LOGIN', payload: 
                {
                    ...data,
                    email: dataCredentials.email,
                    role: userRoles.NORMAL
                }});
                dispatch({type: pages.PARKING});
                success("Registration successful",true);
            }
            else {
                error("Registration failed",true);
            }
        }
        else {
            error("Registration failed", true);
        }

    }

    return {registerNormalUserEntity, registerNormalUser}
}