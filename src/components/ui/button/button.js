import React, { Component } from 'react';

import "./button.css"

class Button extends Component{
    constructor(props){
        super(props)
        this.props = props
        this.state={

        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event){
        this.props.handleClick(event)
    }

    render(){
        return(
            <button className="uiButton" onClick={this.handleClick}>{this.props.title}</button>
        )
    }
}

export default Button