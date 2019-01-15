import React, {Component} from 'react';
import {Grid,Button,Segment,Label} from "semantic-ui-react"
import config from "./../../config"
import "./uploader.css"
import classNames from 'classnames'
import Dropzone from 'react-dropzone'

class Uploader extends Component{
    constructor(props){
        super(props)
        this.props = props
        this.state ={
        }
        // this.handleImageChange = this.handleImageChange.bind(this)
        this.handleTagging = this.handleTagging.bind(this)
    }

    onDrop = (acceptedFiles, rejectedFiles) => {
        this.props.handleImageChange(acceptedFiles)
      }
      
    handleTagging(){
        this.props.handleTagging()
    }


    render(){
        return(
            <Dropzone onDrop={this.onDrop}>
                {({getRootProps, getInputProps, isDragActive}) => {
                return (
                    <div
                    {...getRootProps()}
                    className={classNames('dropzone', {'dropzone--isActive': isDragActive})}
                    >
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                        <p>Drop files here...</p> :
                        <p>Try dropping some files here, or click to select files to upload.</p>
                    }
                    </div>
                )
                }}
            </Dropzone>
        )
    }
}
    


export default Uploader