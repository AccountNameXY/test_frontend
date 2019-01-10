import React, {Component} from 'react';

import {Grid,Button,Segment,Label} from "semantic-ui-react"
import config from "./../../config"
import "./uploader.css"

class Uploader extends Component{
    constructor(props){
        super(props)
        this.props = props
        this.state ={
        }
        this.handleImageChange = this.handleImageChange.bind(this)
        this.handleTagging = this.handleTagging.bind(this)
    }

    handleImageChange(e){
        e.preventDefault()
        this.props.handleImageChange(e.target.files)
    }

    handleTagging(){
        this.props.handleTagging()
    }

    render(){
        return(
            <Segment className="dropZone">
                <div className="centerDiv"> 
                    <Label
                        className="uploadZone"
                        as="label"
                        basic
                        htmlFor="upload"
                        for="hidden-new-file"
                    >
                        <Button
                        icon="upload"
                        label={{
                            basic: true,
                            content: 'Select new file(s)'
                        }}
                        labelPosition="right"
                        />
                        <form encType="multipart/form-data" action="">
                        <input ref={this.myRef} className="inputField" id="hidden-new-file" multiple type="file" onChange={this.handleImageChange} />
                        </form>
                        <Button type="submit" onClick={this.handleTagging}>Tag Image(s)</Button>
                    </Label>
                </div> 

                <div className="DragDrop"> 
                <p className="DragAndDrop">{config.body.DragAndDrop}</p>
                </div>
        </Segment>
        )
    }
}

export default Uploader