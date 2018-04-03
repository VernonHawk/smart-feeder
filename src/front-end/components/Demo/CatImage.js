import React from "react";

import idle    from "media/idle.png";
import feeding from "media/feeding.png";

export default function CatImage({ isFeeding }) {
    const src = isFeeding ? feeding : idle;
    const alt = isFeeding ? "Cat eats" : "Cat doesn't eat";

    return (
        <div className="card">
            <div className="card-body">
                    <img src={src} alt={alt} className="img-fluid"/>
            </div>
        </div>
    );
}