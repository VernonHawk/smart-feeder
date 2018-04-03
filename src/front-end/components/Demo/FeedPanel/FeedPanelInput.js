import React from "react";

export default function FeedPanelInput({ isFeeding, value, onChange }) {
    return (
        <div className="input-group">
            <div className="input-group-prepend">
                <span className="input-group-text">Eat</span>
            </div>
            <input 
                type="number" 
                className="form-control" 
                required
                min="1"
                max="100"
                value={value}
                disabled={isFeeding}

                onChange={ e => onChange(e) }
            />
            <div className="input-group-append">
                <span className="input-group-text">% of food</span>
            </div>
        </div>
    );
}