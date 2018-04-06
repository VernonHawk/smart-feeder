import React, { Component } from "react";
import PropTypes from "prop-types";

import ConfigForm from "./ConfigForm";

import vars from "resources/vars.json";

export default class Config extends Component {
    state = {
        food: {
            min:    vars.food.min,
            normal: vars.food.normal,
            max:    vars.food.max
        },
        time: {
            min:    vars.time.min,
            normal: vars.time.normal,
            max:    vars.time.max
        },
        isValid: true
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const config = nextProps.config;

        if (config.food && config.time) {
          return {
            food: config.food,
            time: config.time,
          };
        } 

        return null;
    }

    isValid = (food, time) => {
        const validFood = food.min <= food.normal && food.normal <= food.max;
        const validTime = time.min <= time.normal && time.normal <= time.max;

        return validTime && validFood;
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        
        const food = this.state.food;
        const time = this.state.time;

        if (this.isValid(food, time)) {
            this.setState({isValid: true});
            
            this.setConfig(food, time)
                .then(resp => {
                    this.props.onConfigured(resp);
                })
                .catch(err => console.error("Error posting form data: ", err));
        } else {
            this.setState({isValid: false});
        }
    }
    
    setConfig = (food, time) => {
        return fetch("/config", {
                    method: (this.props.isConfigured ? "PATCH" : "POST"),
                    body: JSON.stringify({ food, time }),
                    headers : {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "x-access-token": localStorage.getItem("token")
                    }
                })
                .then(resp => {
                    if (!resp.ok) {
                        throw new Error("Response is not ok");
                    }

                    return resp.json();
                });
    }

    onInputChange = (e) => {
        e.preventDefault();
        
        const target = e.target;
        const data  = target.dataset;

        const partial = this.state[data.var];
        const value = target.value === "" ? 0 : parseInt(target.value);

        partial[data.size] = value;
        
        this.setState(partial);
    }

    render() {
        const color = this.state.isValid ? "dark" : "danger";

        return (
            <div className={`card align-self-center border-${color}`}>
                <div className="card-body">
                    <h5 className={`card-title text-center text-${color}`}>
                        Minimum &#60;= Normal &#60;= Maximum
                    </h5>

                    <hr className="border-dark"/>

                    <ConfigForm 
                        food={this.state.food} 
                        time={this.state.time} 
                        onSubmit={this.onSubmit}
                        onInputChange={this.onInputChange}
                        disabled={this.props.isFeeding}
                        isConfigured={this.props.isConfigured}
                    />
                </div>
            </div> 
        );
    }
}

Config.propTypes = {
    isFeeding: PropTypes.bool,
    isConfigured: PropTypes.bool.isRequired,
    config: PropTypes.object.isRequired,
    onConfigured: PropTypes.func.isRequired
};