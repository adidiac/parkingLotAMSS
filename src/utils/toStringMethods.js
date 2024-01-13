export const booleanToString = (value)=>{
    return value ? 'True': 'False'
}

export const verifySameObject = (object1, object2) => {
    return JSON.stringify(object1) === JSON.stringify(object2)
}