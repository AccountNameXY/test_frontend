import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//SemanticUI
import { Image,Icon, Header,Segment, Button,Grid,Input,Label,Message } from 'semantic-ui-react'; 
import 'semantic-ui-css/semantic.min.css'

//Components
import Dropzone from "./components/dropzone/dropzone"

class App extends React.Component{

  constructor(props){
      super(props);
      this.props = props; 

  }

  
  render(){
      return(
          <Grid classname={"App"} centered>
            <Grid.Row>
              <Grid.Column computer={14}  style={{marginTop:"2%"}}>
                <Segment className="mainheader" textAlign="center">
                  <Image centered src="/images/lufthansa_2018.jpg" />
                  <Header as="h1" className="mainHeaderText">
                    Hier könnte ihr Coorperate Design stehen
                  </Header>
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column computer={10} centered style={{marginTop:"5%"}}>
                <Segment>
                  <Header as='h1'>Semantic UI</Header>
                  <Dropzone />
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid> 
      )
  }
}
export default App;

