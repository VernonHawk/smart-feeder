import React, { Component } from "react";

import Config from "components/Config/Config";
import Demo   from "components/Demo/Demo";
import Loader from "components/misc/Loader";

import fetchConfig from "commonLogic";

export default class App extends Component {
    state = {
        isConfigured: false,
        isLoaded: false
    } 
    
   componentDidMount() {
        const token = localStorage.getItem("token");

        if (token) {
            fetchConfig(token)
            .then(() => this.setState({ isConfigured: true }))
            .catch(err => console.error(`Checking for config: ${err.message}`))
            .finally(() => this.setState({ isLoaded: true }));
        } else {
            this.setState({ isLoaded: true });
        }
    }

    onConfigured = (resp) => {
        localStorage.setItem("token", resp.token);

        this.setState({ isConfigured: true });
    }

    render() {
        let page = <Loader />;

        if (this.state.isLoaded) {
            page = this.state.isConfigured ? 
                   <Demo /> : 
                   <Config 
                        config={{}} 
                        onConfigured={this.onConfigured} 
                        isConfigured={this.state.isConfigured}
                    />;
        }

        return (
            <div className="container h-100">
                <div className="row h-100 justify-content-center">
                    { page }
                </div>
            </div>
        );
    }
}