import React from "react";

import vars from "resources/vars.json";

export default function ConfigFormGroup({ variable, size, value, onChange, disabled }) {
    const capitalizedSize = size[0].toUpperCase() + size.slice(1);

    return (
        <div className="form-group col-4">
            <label>
                { `${capitalizedSize} ${variable}:` }

                <input 
                    type="number" 
                    className="form-control" 
                    required
                    value={value}
                    min={vars[variable].minimum}
                    max={vars[variable].maximum}
                    disabled={ disabled }

                    onChange={e => onChange(e)}

                    data-size={size}
                    data-var={variable}
                />
            </label>
        </div>
    );
}