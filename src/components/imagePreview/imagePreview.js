import React, { Component } from 'react';

import {Grid,Button,Segment,Label} from "semantic-ui-react"
import config from "./../../config"
import "./imagePreview.css"

class ImagePreview extends Component {
    constructor(props){
        super(props)
        this.props = props
        this.state={}
        this.imageSelected = this.imageSelected.bind(this)
    }

    hasData(input){
        return  input !== undefined   &&   
                input !== undefined
    }

    imageSelected(index){
        this.props.imageSelected(index)
    }


    render(){
        return(
            <div>
            {this.hasData(this.props.images)?
                <Grid.Row columns="4" >
                {this.props.images.map((item,index) => {
                    return(
                        <Grid.Column style={{marginLeft:"5%", marginTop:"5%"}}>
                            <img className="imagePreview" src={item.url} onClick={() => this.imageSelected(index)}/> 
                        </Grid.Column>
                    )
                })}
                </Grid.Row>
            :
                null
            }
            </div>
        )
    }
}

export default ImagePreview