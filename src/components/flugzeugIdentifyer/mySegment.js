import React, { Component } from 'react';
import {Segment} from "semantic-ui-react"
import "./mySegment.css"

class MySegment extends Component{
    constructor(props){
        super(props)
        this.props=props
        this.state={}
        
    }

    generateClassnames(){
        let classNames = [];
        classNames.push("option")
        if(this.props.type === this.props.airplane ){
            classNames.push("hit")
        }
        console.log(classNames.join(" "))
        return classNames.join(" ")

    }

    render(){
        return(

            <div className={this.generateClassnames()} color={this.state.color}>
                {this.props.type}
            </div> 
        )
    }


}

export default MySegment