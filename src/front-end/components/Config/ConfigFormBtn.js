import React from "react";

export default function FeedPanelBtn({ disabled, isConfigured }) {
    return (
        <button 
            type="submit" 
            className="btn btn-outline-success"
            disabled={disabled}
        >
            {isConfigured ? "Update" : "Start"}
        </button>
    );
}