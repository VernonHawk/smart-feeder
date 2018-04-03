import React from "react";

import ConfigFormInputRow from "./ConfigFormInputRow";
import ConfigFormBtn from "./ConfigFormBtn";

export default function ConfigForm({
        food, time, 
        onSubmit, onInputChange, 
        disabled, isConfigured
    }) {
    return (
        <form onSubmit={e => onSubmit(e)}>
            <ConfigFormInputRow 
                variable="food" 
                data={food} 
                onChange={onInputChange}
                disabled={disabled} 
            />
            
            <hr/>

            <ConfigFormInputRow 
                variable="time" 
                data={time} 
                onChange={onInputChange} 
                disabled={disabled} 
            />

            <hr className="border-dark"/>

            <div className="row justify-content-center">
                <ConfigFormBtn 
                    disabled={disabled} 
                    isConfigured={isConfigured}
                />
            </div>
        </form>
    );
}