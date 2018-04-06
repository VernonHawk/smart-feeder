import React from "react";

import FeedPanelBtn   from "./FeedPanelBtn";
import FeedPanelInput from "./FeedPanelInput";

export default function FeedPanel({ isFeeding, value, onInputChange, onSubmit}) {
    return (
        <div className="card">
            <div className="card-body">
                <form onSubmit={ onSubmit }>
                    <div className="row">
                        <div className="col-9">
                            <div className="form-group align-content-center">
                                <FeedPanelInput 
                                    isFeeding={ isFeeding } 
                                    value={ value } 
                                    onChange={ onInputChange }
                                />
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="row justify-content-center">
                                <FeedPanelBtn isFeeding={ isFeeding } />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}