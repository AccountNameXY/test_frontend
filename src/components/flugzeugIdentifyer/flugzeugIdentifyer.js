import React, { Component } from 'react';
import{Segment, Grid, Header} from "semantic-ui-react"

import MySegment from "./mySegment"

class FlugzeugIdentifyer extends Component{
    constructor(props){
        super(props)
        this.props = props

        console.log(props)
    }

    render(){
        return(
            <Grid stackable centered>
                <Grid.Row>
                    <Grid.Column computer={6}>
                        <MySegment type={"A320"} airplane={this.props.airplane}/>
                    </Grid.Column>
                    <Grid.Column computer={6}>
                        <MySegment type={"A380"} airplane={this.props.airplane}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default FlugzeugIdentifyer