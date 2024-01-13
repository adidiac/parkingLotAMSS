import { Field, EntityDefinition } from "../GenericComponents/GenericComponents";
import {completeApiObj} from "../Api/CompleteApi";
import { Notification, info, success, warning, error } from "../notify";
import { userRoles, pages } from "../utils/enums";
import { useDispatch } from "react-redux";
import { useMemo } from "react";
class CredentialsEntityDefiniton extends EntityDefinition {
    constructor(path, fields, entityName) {
        super(path, fields, entityName);
    }
}

const loginUsersFields = [
    new Field("email", "email", "Enter Email", "Email").withRegex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    new Field("password", "password", "Enter Password", "Password").withRegex(/^[a-zA-Z0-9]+$/),
];

export const useLoginUser = () => {

    const loginEntityDefinition = useMemo(() => {
        return new CredentialsEntityDefiniton(loginUsersFields, "User login");
    }, []);

    const dispatch = useDispatch();

    const loginUser = async (entity) => {
        const response = await completeApiObj.login(entity);
        if (response.status === 200) {
            const data = response.data; // {credentials_id, email, password}
            // let's get all the users to verify credentials_id
            const users = await completeApiObj.getAllUsers();

            if(users.status !== 200) {
                error("Internal error",true);
                return null;
            }

            const user = users.data.find(user => user.credentials === data.credentials_id);

            const parkOwners = await completeApiObj.getAllParkOwners();

            if(parkOwners.status !== 200) {
                error("Internal error",true);
                return null;
            }

            const parkOwner = parkOwners.data.
                find(parkOwner => parkOwner.email === data.email && parkOwner.password === data.password);

            if (user) {
                
                dispatch({type: 'LOGIN', payload: {...user, role: userRoles.NORMAL}});
                dispatch({type: pages.PARKING});
                success("Login successful",true);
            }
            else if (parkOwner) {
                dispatch({type: 'LOGIN', payload: {...parkOwner, role: userRoles.PARKOWNER}});
                dispatch({type: pages.MYPARKINGS});
                success("Login successful",true);
            }
            else {
                error("Login Failed, wrong email or password",true);
                return null;
            }
        }
        else {
            error("Login Failed, wrong email or password",true);
            return null;
        }
    }

    return {loginEntityDefinition, loginUser};

}