import React from "react";

export default function Timer({ value }) {
    return (
        <div className="card mt-5">
            <div className="card-body">
                <h5 className="text-center">
                    Time since last feeding: {value}
                </h5>
            </div>
        </div>
    );
}