import React, { Component } from 'react';
import config from "./../../config";


//CSS
import "./dropzone.css"
import BackendConnector from "./../../backendConnector/backendConnector"


//Semantic UI
import {Button,Label,Segment} from "semantic-ui-react" 
let backendConnector = new BackendConnector()

class Dropzone extends React.Component{
    constructor(props) {
        super(props); 
        this.state = {
          file: '',
          imagePreviewUrl: '',
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

      async handleSubmit(){
        let fd = new FormData()
        // var imagedata = document.querySelector('input[type="file"]').files[0];
        fd.append("image", this.state.file)
        // let response = await backendConnector.postPicture(fd)
        fetch("http://localhost:8081/classify", {
          mode: 'no-cors',
          method: "POST",
          body: fd
        }).then(function (res) {
          if (res.ok) {
            alert("Perfect! ");
          } else if (res.status == 401) {
            alert("Oops! ");
          }
        }, function (e) {
          alert("Error submitting form!");
        });
              // backendConnector.postPicture(fd)
              // this.props.handleSubmit(this.state.file)
        }
    
      render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
          $imagePreview = (<img className="actualImage" src={imagePreviewUrl} />);
        }
    
        return (
          this.state.pictureUploaded ?
          null
          :
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
                        content: 'Select file(s)'
                    }}
                    labelPosition="right"
                    />
                    <form encType="multipart/form-data" action="">
                      <input ref={this.myRef} className="inputField" id="hidden-new-file" multiple type="file" onChange={this._handleImageChange} />
                    </form>
                    <Button type="submit" onClick={this.handleSubmit}>Upload Image</Button>
                </Label>    
              <div className="imagePreview">{$imagePreview}</div>
            </div> 

            <div className="DragDrop"> 
              <p className="DragAndDrop">{config.body.DragAndDrop}</p>
            </div> 
          </Segment>
          
        )
      }
    
    }

export default Dropzone