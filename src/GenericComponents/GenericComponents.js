import React, {useState, useEffect, useCallback} from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { BaseApi, enumMethods } from '../Api/BaseApi';

/*
//* form Form Component
//* show boolean
//* onHide function
//* onSubmit function
//* title string
*/
export function GenericModal({form, show, onHide, onSubmit, title, submitButtonText, children})
{
    return <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={onSubmit}>
                {form}
                {children}
                {
                    submitButtonText!=null &&
                    <Button variant="primary" type="submit" style={{marginTop:10}}>
                        {submitButtonText}
                    </Button>
                }
            </Form>
        </Modal.Body>
    </Modal>
}

/*
//* data {name,type,placeholder,label}
*/
export function GenericAddForm(
    {data,onSubmit, title, submitButtonText, show, handleClose}
)
{
    const [formData, setFormData] = useState({});

     //* type [callbackOnChange]
     const callbacksOnChange = data.filter((data)=>data.callbackOnChange!=null).map((data)=>data.callbackOnChange);

const verifyIsCheckBox = (name) => {
        return data.filter((data)=>data.name===name)[0].type === 'checkbox'
    }
    const handleChange = (event)=>{
        const target = event.target;
        const name = target.name;
        const value = verifyIsCheckBox(name) ? target.checked : target.value;
        setFormData({...formData, [name]:value});
    }
    const handleSubmit = (event)=>{
        event.preventDefault();
        onSubmit(formData);
        handleClose();
    }
    
    const getValue = useCallback((data) => {
        if(formData[data.name]) return formData[data.name]
        if (data.defaultValue) 
            formData[data.name]=data.defaultValue
        return data.defaultValue
    },[formData])

    useEffect(()=>{
        callbacksOnChange.forEach((callback)=>{
            callback(formData, setFormData);
        })
    }, [formData]);

    return <>
        <GenericModal
            form={data.map((data, idx)=>{
                if (data.special) return data.special.getComponent(data, formData);
                if(data.type === 'checkbox')
                {
                    return <Form.Check // prettier-ignore
                    type="switch"
                    id="idx"
                    label={data.label}
                    name={data.name}
                    style={{margin:10}}
                    checked={formData[data.name]}
                    onChange={handleChange}
                  />
                }
                return <Form.Group controlId={data.name} key={idx}>
                    <Form.Label>{data.label}</Form.Label>
                    <Form.Control 
                        name={data.name} 
                        type={data.type} 
                        placeholder={data.placeholder}
                        isInvalid={!data.validate(formData[data.name])}
                        value={getValue(data)}
                        onChange={handleChange}/>
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid state.
                    </Form.Control.Feedback>
                </Form.Group>
            })}
            show={show}
            onHide={handleClose}
            onSubmit={handleSubmit}
            title= {title}
            submitButtonText= {submitButtonText}
        />
    </>
}
/*
//* data {name,type,placeholder,label}
*/
export const GenericUpdateForm = (
    { 
        data, 
        onSubmit, 
        title, 
        submitButtonText, 
        show, 
        handleClose
    }
    ) => {

    const [dataValues, setDataValues] = useState({});


    //* type [callbackOnChange]
    const callbacksOnChange = data.filter((data)=>data.callbackOnChange!=null).map((data)=>data.callbackOnChange);

    useEffect(()=>{
        let values={};
        data.forEach((data)=>{
            values[data.name]=data.value;
        })
        setDataValues(values);
    },[data]);
    
    const verifyIsCheckBox = (name) => {
        return data.filter((data)=>data.name===name)[0].type === 'checkbox'
    }

    const handleChange = (event)=>{
        const target = event.target;
        const name = target.name;
        const value = verifyIsCheckBox(name) ? target.checked : target.value;
        setDataValues({...dataValues,[name]:value});
    }

    useEffect(()=>{
        callbacksOnChange.forEach((callback)=>{
            callback(dataValues, setDataValues);
        })
    }, [dataValues]);

    const handleSubmit = (event)=>{
        event.preventDefault();
        onSubmit(dataValues);
        handleClose();
    }
    return <>
        <GenericModal
            form={data.map((data)=>{
                if (data.special)
                {
                    return data.special.getComponent(data.value, dataValues);
                }
                if(data.type === 'checkbox')
                {
                    return <Form.Check // prettier-ignore
                    type="switch"
                    id="idx"
                    label={data.label}
                    name={data.name}
                    style={{margin:10}}
                    checked={dataValues[data.name]}
                    onChange={handleChange}
                  />
                }
                return <Form.Group controlId={data.name}>
                    { data.type === 'hidden' ? null :
                    <Form.Label>{data.label}</Form.Label>
                    }
                    <Form.Control 
                            name={data.name} 
                            type={data.type} 
                            placeholder={data.placeholder} 
                            value={dataValues[data.name]}
                            readOnly={data.readonly}
                            isInvalid={!data.validate(dataValues[data.name])}
                           onChange={handleChange}/>
                       <Form.Control.Feedback type="invalid">
                           Please provide a valid state.
                       </Form.Control.Feedback>
                   </Form.Group>
            }
            )}
            show={show}
            onHide={handleClose}
            onSubmit={handleSubmit}
            title= {title}
            submitButtonText= {submitButtonText}
        />
    </>
}
export class Field {
    constructor(
        key,
        type,
        placeholder, 
        label, 
        special = null, 
        defaultValue = null, 
        regex = null,
        readonly = false
    ) 
    {
        this.key = key;
        this.type = type;
        this.placeholder = placeholder;
        this.label = label;
        this.special = special;
        this.defaultValue = defaultValue;
        this.regex = this.constructRegex(regex);
        this.value = defaultValue;
        this.readonly = readonly
        // function (dataValues, setDataValues)
        this.callbackOnChange = null;
    }

    getValue = () => {
        return this.defaultValue;
    }

    withRegex = (regex) => {
        this.regex = this.constructRegex(regex);
        return this;
    }

    withCallbackOnChange = (callback) => {
        this.callbackOnChange = callback;
        return this;
    }
    constructRegex = (regex) => {
        if (regex == null) return null;
        return new RegExp(regex);
    }

    validate = (value) => {
        if (this.regex && value) {
            return this.regex.test(value);
        }
        return true;
    }

    getSpecial = () => {
        return this.special;
    }

    createUpdateData = (value) => {
        return {
            name: this.key,
            value: this.defaultValue ? this.defaultValue : value,
            type: this.type,
            placeholder: this.placeholder,
            label: this.label,
            validate: this.validate,
            readonly: this.readonly,
            special: this.special,
            callbackOnChange: this.callbackOnChange
        }
    }

    createAddData = () => {
        return {
            name: this.key,
            type: this.type,
            placeholder: this.placeholder,
            defaultValue : this.defaultValue,
            label: this.label,
            validate: this.validate,
            readonly: this.readonly,
            special: this.special,
            callbackOnChange: this.callbackOnChange
        }
    }

    setIsReadOnly = (value) => {
        this.readonly = value;
    }

    setDefaultValue = (value) => {
        this.defaultValue = value;
    }
}

export class EntityDefinition {
    // @param path string
    // @param fields Field[]
    constructor(fields, entityName) {
        this.fields = fields;
        this.entityName = entityName;
        this.entity = null;
    }
    getPath = () => {
        return this.path;
    }
    getFields = () => {
        return this.fields;
    }
    getEntityName = () => {
        return this.entityName;
    }
    setEntity = (entity) => {
        this.entity = entity;
    }

    withReadOnly = () => {
        this.fields.forEach((field)=>{
            field.setIsReadOnly(true);
        })
        return this;
    }

    withOutReadOnly = () => {
        this.fields.forEach((field)=>{
            field.setIsReadOnly(false);
        })
        return this;
    }
}
