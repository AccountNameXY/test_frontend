import React, { Component } from 'react';
import { Icon, Grid } from "semantic-ui-react"
import "./uploader.css"
import classNames from 'classnames'
import Dropzone from 'react-dropzone'

class Uploader extends Component {
    constructor(props) {
        super(props)
        this.props = props
        this.state = {
        }
        this.handleTagging = this.handleTagging.bind(this)
    }

    onDrop = (acceptedFiles, rejectedFiles) => {
        this.props.handleImageChange(acceptedFiles)
    }

    handleTagging() {
        this.props.handleTagging()
    }


    render() {
        return (

            <Grid.Column > {/* <Icon name="add square" size="huge" /> */}
                <div className="dropZoneBorder">
                    <Dropzone onDrop={this.onDrop}>
                        {({ getRootProps, getInputProps, isDragActive }) => {
                            return (
                                <div
                                    {...getRootProps()}
                                    className={classNames('dropzone', { 'dropzone--isActive': isDragActive })}
                                >
                                    <input className="dropZoneInput" {...getInputProps()} />
                                    {
                                        isDragActive ?
                                            <p>Drop files here...</p> :
                                            <p>Drop some files here or click to browse files.</p>
                                    }
                                </div>
                            )
                        }}
                    </Dropzone>
                </div>
            </Grid.Column>

        )
    }
}



export default Uploader