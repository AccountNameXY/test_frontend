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
            
                        
            <div className="mainHeader">
                <Grid.Row style={{marginLeft:"0", marginRight:"0", height:"6.5em"}}>
                    <Grid.Column computer={8} style={{marginLeft:"0", marginRight:"auto"}}>
                        <p className="titleMedialounge">{config.header.titleMedialounge}</p>

                    </Grid.Column>
                    <Grid.Column computer={8} style={{marginLeft:"auto", marginRight:"0", paddingTop:"1.35em"}}>
                        <p className="titleLufthansaGroup">{config.header.titleLufthansaGroup}</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{marginLeft:"0.1em", marginRight:"auto"}}>
                    <p className="uploadYourPic">{config.header.uploadYourPic}</p>
                    {/* <img className="mainLogo" src={config.header.logo} alt="" />  */}
                </Grid.Row>
            </div> 

                    
        )
    }
}

export default Header