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

import BackendConnector from "./backendConnector/backendConnector"
let backendConnector = new BackendConnector()

class App extends React.Component{

  constructor(props){
      super(props);
      this.props = props; 
      this.state={
        showDropzone: true 
      }
      this.config = config
      this.handleSubmit = this.handleSubmit.bind(this)
      this.pictureSubmit = this.pictureSubmit.bind(this)
  }

  async pictureSubmit(picture){
    let alert = false
    setTimeout(async ()=>{
      await this.setState({
        alert: true,
        showLoading: false
      })
    },3000)
    
    await this.setState({
        picture: picture,
        showLoading: true,
        alert: alert, 
        showDropzone: false 
    })
  } 

  handleSubmit(tags){
      backendConnector.pushTags(this.state.picture, tags)
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
              <Grid.Column computer={10}  style={{marginTop:"5%"}} centered>
              <Dropzone pictureSubmit={this.pictureSubmit}/>
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
                    <Message warning attached='bottom'>
                      <Icon name='warning' />
                      Leider konnte wir auf deinem Bild nichts erkennen
                    </Message>
                    <DecisionTree data={this.config.decisionTree[0].Ebene1} handleSubmit={this.handleSubmit}/> 
                  </div>
                :null
                }
              </div>
              }

                  
                 
              </Grid.Column>
            </Grid.Row>
          </Grid> 
      )
  }
}
export default App;

