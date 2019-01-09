import React, { Component } from 'react';
import './App.css';

//SemanticUI
import { Image,Icon,Segment,Button,Grid,Input,Label,Message } from 'semantic-ui-react'; 
import 'semantic-ui-css/semantic.min.css'

//config
import config from "./config"

//Components
import Dropzone from "./components/dropzone/dropzone"
import DecisionTree from "./components/decisionTree/decisionTree"
import Header from "./components/header/header"
import FlugzeugIdentifyer from "./components/flugzeugIdentifyer/flugzeugIdentifyer"
import Bottom from "./components/bottom/bottom"
import ShowPicture from "./components/showPicture/showPicture"


import BackendConnector from "./backendConnector/backendConnector"
import { CLIENT_RENEG_LIMIT } from 'tls';

// const exiftool = require("exiftool-vendored").exiftool
 
// And to verify everything is working:
// exiftool
//   .version()
//   .then(version => console.log(`We're running ExifTool v${version}`))
// import classNames from 'classnames'
// import Dropzone  from 'react-dropzone'


let backendConnector = new BackendConnector()

class App extends React.Component{

  constructor(props){
      super(props);
      this.props = props; 
      this.state={
        showDropzone: true,
        submitted: false,  
        pictureSelected: false,
        pictureUploaded: false,
        tagManually: false
      }
      this.config = config
      this.pictureSubmit = this.pictureSubmit.bind(this)
      this.responseHasData = this.responseHasData.bind(this)
      this.changeSubmitBoolean = this.changeSubmitBoolean.bind(this)
      this.changeStateBoolean = this.changeStateBoolean.bind(this)
  }

  async pictureSubmit(picture){
    let alert = false
    setTimeout(async ()=>{
      await this.setState({
        alert: true,
        showLoading: false,
        // response: null
      })
    },3000)
    
    await this.setState({
        picture: picture,
        showLoading: true,
        alert: alert, 
        showDropzone: false 
    })

    
    // // let response = await backendConnector.pushTags(this.state.picture)

    // console.log(response)
    
    // await this.setState({
    //   response: response
    // })
    

  } 

  onDrop = (acceptedFiles, rejectedFiles) => {
    // Do something with files
  }
  
  responseHasData(){
    // console.log(this.state.response.images[0].classifiers[1].classes[1].class)
    return this.state.response !== undefined &&
            this.state.response !== null && 
            (this.state.response.images[0].classifiers[0].classes[0].class === "A380" ||
            this.state.response.images[0].classifiers[0].classes[0].class === "A320" ) &&
            (this.state.response.images[0].classifiers[1].classes[1].class === "airplane" ||
            this.state.response.images[0].classifiers[1].classes[0].class === "airplane")
            
  }
  async changeSubmitBoolean(){
    await this.setState({
      submitted: true
    })
    console.log(this.state)
  }

  async changeStateBooleanToTrue(shown){
    await this.setState({
      shown: true
    })
  }
  
  render(){
      return(
          <Grid className={"App"}  centered>
            <Grid.Row centered>
              {/* <Grid.Column computer={14}  style={{marginTop:"2%"}} centered> 
                <Segment className="mainheader" textAlign="center">
                  <Image centered src="/images/lufthansa_2018.jpg" />
                  <Header as="h1" className="mainHeaderText">
                   Lufthansa
                  </Header>
                </Segment>
              </Grid.Column> */}

              <Header  />
            </Grid.Row>
            <Grid.Row>      

            <Grid.Column computer={7} style={{border:"2px white solid"}}>
               <ShowPicture
                submitted={this.state.submitted} pictureSelected={this.state.pictureSelected} pictureUploaded={this.state.pictureUploaded} tagManually={this.state.tagManually} 
                changeStateBoolean={this.changeStateBoolean}/>
            </Grid.Column>

            <Grid.Column computer={7} style={{border:"2px white solid"}}>
              <DecisionTree data={this.config.decisionTree[0].Ebene1}  
              submitted={this.state.submitted} pictureSelected={this.state.pictureSelected} pictureUploaded={this.state.pictureUploaded} tagManually={this.state.tagManually}
              changeStateBoolean={this.changeStateBoolean}/>
            </Grid.Column>  
             < Grid.Column computer={10} centered>
            {this.state.pictureSelected ?
                null
              :
             
                <Dropzone pictureSubmit={this.pictureSubmit} submitted={this.state.submitted} pictureSelected={this.state.pictureSelected} pictureUploaded={this.state.pictureUploaded} tagManually={this.state.tagManually}
                changeStateBoolean={this.changeStateBoolean}/>
            }
              <Bottom /> 
            
              {this.state.showDropzone ? 
               null
              :
              <div>
                {this.state.showLoading ?
                  <Segment loading className="loading" />
                :null
                }
                {this.state.alert ? 
                  <div>
                    {console.log(this.responseHasData())}
                    {/* {this.responseHasData()? */}
                    
                      {/* // // <p>{this.state.response}</p>
                      // console.log(this.state.response.images[0].classifiers[0].classes[0].class) */}
                     <FlugzeugIdentifyer airplane={this.state.response.images[0].classifiers[0].classes[0].class} /> 
                    {/* : */}
                    <div>
                        <Message warning attached='bottom'>
                          <Icon name='warning' />
                          Leider konnte auf deinem Bild nichts erkannt werden.
                        </Message>
                        <DecisionTree data={this.config.decisionTree[0].Ebene1}/>
                    </div>
                     {/* } */}
                    
                  </div>
                :null
                }
              </div>
              }

                                          {/* <DecisionTree data={this.config.decisionTree[0].Ebene1}/> */}

                 
              </Grid.Column>
            </Grid.Row>
          </Grid> 
      )
  }
}
export default App;