import React from 'react';

function isInvalid(valid, touched, shouldValidate) {
    return !valid && touched && shouldValidate;
}
const InputCreate = (props) => {
    const id = props.type + (Math.floor(Math.random() * 100) + 1); //генерируем специальный id
    return (
        <div className="form-group row">
            {
                isInvalid(props.valid, props.touched, props.shouldValidate)
                    ? <div className="error-message">
                        {props.errorMessage}
                    </div>
                    : null
            }
            <label htmlFor={id} className="col-sm-2 col-form-label">{props.label}</label>
            <div className="col-sm-10">
                <input
                    type={props.type}
                    className={isInvalid(props.valid, props.touched, props.shouldValidate)? 'form-control input-error' : 'form-control'}
                    id={id}
                    value={props.value}
                    onChange={props.onChange}
                    autoComplete={props.type}
                />
            </div>
        </div>
    )
};

export default InputCreate;