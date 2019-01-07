import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import config from "./../../config"
import "./header.css"


class Header extends Component{

    constructor(props){
        super(props)
        this.props = props
        this.state={}
    }

    render(){
        return( 
            <Grid.Column desktop={12} > 
                <div className="mainHeader">
                    <p className="title">{config.header.title}</p>
                    <p className="title2">{config.header.title2}</p>
                    <p className="heading">{config.header.heading}</p>
                    {/* <img className="mainLogo" src={config.header.logo} alt="" />  */}
                </div>
            </Grid.Column>
        )
    }
}

export default Header