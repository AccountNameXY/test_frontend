import React, { Component } from 'react';

//CSS
import "./dropzone.css"


//Semantic UI
import {Button,Label} from "semantic-ui-react" 

class Dropzone extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          file: '',
          imagePreviewUrl: ''
        };
        this._handleImageChange = this._handleImageChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
      }
    
      _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
      }
    
      _handleImageChange(e) {
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
    
      render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
          $imagePreview = (<img src={imagePreviewUrl} />);
        }
    
        return (
          <div>
              <Label
                    as="label"
                    basic
                    htmlFor="upload"
                >
                    <Button
                    icon="upload"
                    label={{
                        basic: true,
                        content: 'Select file(s)'
                    }}
                    labelPosition="right"
                    />
                    <input  multiple type="file" onChange={this._handleImageChange} />
                    <Button type="submit" onClick={this._handleSubmit}>Upload Image</Button>
                </Label>    
            <div>{$imagePreview}</div>
          </div>
        )
      }
    
    }

export default Dropzone