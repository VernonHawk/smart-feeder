import React from "react";

export default function FeedPanelBtn({ isFeeding }) {
    let text = "Feed";
    let color = "success";

    if (isFeeding) {
        text = "End";
        color = "warning";
    }

    return (
        <button type="submit" className={ `btn btn-${color}` } >
            { text }
        </button>
    );
}