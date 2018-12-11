import React, { Component } from 'react';

//CSS
import "./dropzone.css"


//Semantic UI
import {Button,Label,Segment} from "semantic-ui-react" 

class Dropzone extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          file: '',
          imagePreviewUrl: ''
        };
        this._handleImageChange = this._handleImageChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.myRef = React.createRef();
      }
    
      _handleSubmit(e) {
        e.preventDefault();
        this.props.pictureSubmit(this.state.file)
      }
    
      async _handleImageChange(e) {
        e.preventDefault();
        
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
        
        reader.readAsDataURL(file)

      }

      handleSubmit(){
        this.props.handleSubmit(this.state.file)
    }
    
      render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
          $imagePreview = (<img className="actualImage" src={imagePreviewUrl} />);
        }
    
        return (
          <Segment className="dropZone">
            <div clasName="centerDiv"> 
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
                        content: 'Select file(s)'
                    }}
                    labelPosition="right"
                    />
                    <input ref={this.myRef} className="inputField" id="hidden-new-file" multiple type="file" onChange={this._handleImageChange} />
                    <Button type="submit" onClick={this._handleSubmit}>Upload Image</Button>
                </Label>    
              <div className="imagePreview">{$imagePreview}</div>
            </div>
          </Segment>
        )
      }
    
    }

export default Dropzone