import React from "react";

import ConfigFormGroup from "./ConfigFormGroup";

export default function ConfigFormInputRow({variable, data, onChange, disabled}) {
    const groups = [];

    for (let size in data) {
        groups.push(
            <ConfigFormGroup 
                key={variable + size}

                variable={variable} 
                size={size}
                value={data[size]}
                disabled={ disabled }

                onChange={onChange}
            />
        );
    }

    return (
        <div className="row justify-content-center">
            {groups}
        </div>
    );
}