import React, { Component } from 'react';
import './App.css';

//SemanticUI
import { Image,Icon,Segment,Button,Grid,Input,Label,Message } from 'semantic-ui-react'; 
import 'semantic-ui-css/semantic.min.css'

//config
import config from "./config"

//Components
import ImagePreview from "./components/imagePreview/imagePreview"
import Uploader from "./components/uploader/uploader"
import Header from "./components/header/header"
import ResultSection from "./components/resultSection/resultSection"


import BackendConnector from "./backendConnector/backendConnector"


let backendConnector = new BackendConnector()

class App extends React.Component{

  constructor(props){
      super(props);
      this.props = props; 
      this.state={
      }
      this.config = config
      this.handleTagging = this.handleTagging.bind(this)
      this.handleImageChange = this.handleImageChange.bind(this)
      this.imageSelected = this.imageSelected.bind(this)
  }

  async handleImageChange(input){
    let data =[]
    let reader = new FileReader();
    let files = Object.values(input)
    files.map((item,index) => {
      let newObject ={ } 
      newObject.url = URL.createObjectURL(item)
      newObject.file = item
      data.push(newObject)
    })

    await this.setState({
      data: data
    }) 
    
  }

  async handleTagging(){
    let data = {...this.state.data}
    this.state.data.map((item, index)=>{
          let fd = new FormData()
          fd.append("image", item.file)
          fetch("http://localhost:8081/classify", {
            // mode: 'no-cors',
            method: "POST",
            body: fd
          })
          .then(function(response) {
            if (!response.ok) {
              return Promise.reject('some reason');
          }
          return response.json();
          })
          .then(function(response) {
            data[index].tags = response.tags
            if(index === 0){
              data[index].selected = true
            }else{
              data[index].selected = false
            }
          });
          console.log(this.state.data)
        })

        await this.setState({
          data: Object.values(data)
        })
  }

  async imageSelected(selectedIndex){
    let data = {...this.state.data}
    data = Object.values(data)
    data.map((item,index) => {
      if(selectedIndex === index){
        data[index].selected = true
      }else{
        data[index].selected = false
      }
    })
    await this.setState({
      data: data
    })
  }
  
  render(){
      return(
          <Grid className={"App"}  centered>
            <Grid.Row centered>
              <Header />
            </Grid.Row>
            <Grid.Row>
              <Uploader handleImageChange={this.handleImageChange} handleTagging={this.handleTagging}/> 
            </Grid.Row> 
            <Grid.Row>
              <Grid.Column computer={8} >
                <ImagePreview images={this.state.data} imageSelected={this.imageSelected}/> 
              </Grid.Column>
              <Grid.Column computer={8} >
                {this.state.data !== undefined && this.state.data !== null ? 
                  <ResultSection data={this.state.data}/> 
                :null
                }
                
              </Grid.Column>
            </Grid.Row>
          </Grid> 
      )
  }
}
export default App;