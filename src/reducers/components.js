import { pagesDictionary, initialStatePage } from "../utils/consts";

export const page = (state=initialStatePage, action)=>{
    if (Object.keys(pagesDictionary).includes(action?.type)) {
        state = pagesDictionary[action?.type](action.payload);
        return state;
    }
    return state;
}