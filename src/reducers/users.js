import { userInitialState } from "../utils/consts";

const storeToLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
}

const takeFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('user'));
}

const removeFromLocalStorage = () => {
    localStorage.removeItem('user');
}
export const user = (state=userInitialState,action)=>{
    //verify if user is logged in
    if(state===null){
        state=takeFromLocalStorage();
    }
    if(action.type==='LOGIN'){
        state=action.payload;
        console.log('user logged',state);
        storeToLocalStorage(state);
        return state;
    }
    if(action.type==='LOGOUT'){
        state=null;
        removeFromLocalStorage();
        return state;
    }
    return state;
}