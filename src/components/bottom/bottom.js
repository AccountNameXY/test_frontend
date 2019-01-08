import React, { Component } from 'react';
import "./bottom.css"

import config from "./../../config";

class Bottom extends Component{
    render(){

        return(
            <div>
            <p className="GoBackToMedialounge"> <a className="URLmedialounge" href="https://medialounge.lufthansagroup.com/de">{config.body.BackToMediaLounge}</a></p>
            </div>
        )
    }
}

export default Bottom