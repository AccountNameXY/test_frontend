import React, { Component } from 'react';

//CSS
import "./dropzone.css"
import BackendConnector from "./../../backendConnector/backendConnector"


//Semantic UI
import {Button,Label,Segment} from "semantic-ui-react" 
import { CLIENT_RENEG_LIMIT } from 'tls';

import classNames from 'classnames'
import Dropzone from 'react-dropzone'



let backendConnector = new BackendConnector()

class MyDropzone extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          files:[],
          file: '',
          imagePreviewUrls: []
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
    
      onDrop = (acceptedFiles, rejectedFiles) => {
        // Do something with files
      }
   

      async _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let files = Object.values(e.target.files)
        let allUrls = []
        files.map((item,index) => {
          allUrls.push(URL.createObjectURL(item))
        })

        await this.setState({
          files: Object.values(e.target.files),
          allUrls: allUrls
        })                                                                                                   
      }

      async handleSubmit(){
        this.state.files.map((item, index)=>{
            let fd = new FormData()
            fd.append("image", item)
            console.log(fd)
            fetch("http://localhost:8081/classify", {
              mode: 'no-cors',
              method: "POST",
              body: fd
            })
          })
              // backendConnector.postPicture(fd)
              // this.props.handleSubmit(this.state.file)
        }

        hasData(data){
          return  data !== undefined && 
                  data !== null
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
                    <form encType="multipart/form-data" action="">
                      <input ref={this.myRef} className="inputField" id="hidden-new-file" multiple type="file" onChange={this._handleImageChange} />
                    </form>
                    {this.hasData(this.state.allUrls)? 
                      this.state.allUrls.map((item,index)=>{
                        return(
                          <div>
                            {console.log(item)}
                            <img src={item} />
                          </div>
                        )
                      })
                      :null
                      }
                    <Button type="submit" onClick={this.handleSubmit}>Upload Image</Button>
                </Label>
               
                {/* {this.hasImages() ? 
                console.log(this.state.imgSrcColl)
                  // this.state.imgSrcColl.map((item,index) => {
                  //   console.log("huh")
                  //   // return(
                  //   //   // <div className="imagePreview">
                  //   //   {console.log(item)}
                  //   //   //   <img className="actualImage" src={item} />
                  //   //   // </div>
                  //   // )
                  // })
                :null 
                } */}
            </div>
          </Segment>
        )
      }
    
    }

export default MyDropzone