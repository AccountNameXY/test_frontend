import React, { Component } from 'react';
import "./showPicture.css"


class ShowPicture extends Component{
    constructor(props){
        super(props)
        this.props = props
        this.handleClick = this.handleClick.bind(this)
        console.log(this.props)
    }

    handleClick(){
        this.props.changeSubmitBoolean()
    }


    render(){
        return(
            <div className="DivPicturePreviewRight">
                <p className="PicturePreviewRight">Picture</p>
                <button onClick={this.handleClick} /> 
            </div>
            
        )
    }
}

export default ShowPicture