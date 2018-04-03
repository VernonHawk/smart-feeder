import React, { Component } from "react";
import PropTypes from "prop-types";

import CatImage from "./CatImage";
import FeedPanel from "./FeedPanel/FeedPanel";
import Timer from "./Timer";
import Config from "components/Config/Config";

import fetchConfig from "commonLogic";

export default class Demo extends Component {
    state = {
        isFeeding: false,
        time: 0,
        food: 1,
        config: {}
    }

    componentDidMount() {
        this.timer = setInterval(
            () => this.tick(),
            1000
        ); 

        const token = localStorage.getItem("token");

        fetchConfig(token)
            .then((resp) => this.setState({ config: resp.config }))
            .catch(err => console.error(`Geting config error: ${err.message}`));
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    tick = () => {
        if (!this.state.isFeeding) {
            this.setState((prevState) =>  ({ time: prevState.time + 1 }));
        }
    }

    onFeedInputChange = (e) => {
        const value = e.target.value === "" ? 
                      1 : 
                      parseInt(e.target.value, 10);

        this.setState({ food: value });
    }

    onConfigured = (resp) => this.setState({ config: resp.config });

    onFeed = (e) => {
        e.preventDefault();

        if (this.state.isFeeding) {
            fetch("/config/feed", {
                method: "POST",
                body: JSON.stringify({ food: this.state.food, time: this.state.time }),
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
            })
            .then(resp => {
                this.setState({ 
                    time: 0,
                    config: resp.config
                });
            })
            .catch(err => console.error("Error posting feeding data: ", err));
        }

        this.setState((prevState) => ({
                isFeeding: !prevState.isFeeding
            })
        );
    }

    render() {
        return (
            <div className="row align-self-center">
                <div className="col">
                    <FeedPanel 
                        isFeeding={this.state.isFeeding}
                        value={ this.state.food }
                        onInputChange={ this.onFeedInputChange }
                        onSubmit={ this.onFeed }
                    />
                    <CatImage isFeeding={this.state.isFeeding} />
                </div>
                <div className="col">
                    <Config 
                        config={this.state.config} 
                        onConfigured={this.onConfigured} 
                        isFeeding={this.state.isFeeding}
                        isConfigured={true}
                    />
                    <Timer value={this.state.time} />
                </div>
            </div>
        );
    }
}

Demo.propTypes = {};