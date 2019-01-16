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
import TagHandler from "./components/tagHandler/tagHandler"


import BackendConnector from "./backendConnector/backendConnector"

let backendConnector = new BackendConnector()

class App extends React.Component{

  constructor(props){
      super(props);
      this.props = props; 
      this.state={
        showTagHanler:false,
        selected: 0
      }
      this.config = config
      this.handleTagging = this.handleTagging.bind(this)
      this.handleImageChange = this.handleImageChange.bind(this)
      this.imageSelected = this.imageSelected.bind(this)
      this.deleteTags = this.deleteTags.bind(this)
      this.openTagHandler = this.openTagHandler.bind(this)
      this.addTag = this.addTag.bind(this)
      this.addTagsDecisionTree = this.addTagsDecisionTree.bind(this)
      this.sendTags = this.sendTags.bind(this)
  }

  onSelect = key => {
    this.setState({ selected: key });
  }
 

  async handleImageChange(input){
    let data =[]
    let reader = new FileReader();
    let files = Object.values(input)
    files.map((item,index) => {
      let newObject ={ } 
      newObject.url = URL.createObjectURL(item)
      newObject.file = item
      newObject.pictureIndex = index
      data.push(newObject)
    })
    let bigPicture
    data.map((item,index) => {
        if(index === 0){
          data[index].selected = true
          bigPicture = data[index]
        }else{
          data[index].selected = false
        }
      })
    
    await this.setState({
      data: data,
      bigPicture: bigPicture,
      showTagHandler: false
    }) 
    
  }

  async addTag(pictureIndex, value){
    let data = {...this.state.data}
      data = Object.values(data)
      data.map((item,index) =>{
        if(index === pictureIndex){
          console.log(data[pictureIndex].tags)
          data[pictureIndex].tags.push(value)
        }
      })
      
      await this.setState({
        data: data
      })
  }

  async handleTagging(){
    let data = {...this.state.data}
    let dataToMap = {...this.state.data}
    dataToMap = Object.values(dataToMap)
    dataToMap.map((item, index)=>{
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
          });
          // console.log(this.state.data)
        })

        await this.setState({
          data: Object.values(data)
        })
        this.update()
  }

  update(){
    console.log("HUhuhu")
    this.setState({
      state: this.state
    })
  }

  async imageSelected(selectedIndex){
    let data = {...this.state.data}
    let bigPicture
    data = Object.values(data)
    data.map((item,index) => {
      if(selectedIndex === index){
        data[index].selected = true
        bigPicture = data[index]
      }else{
        data[index].selected = false
      }
    })
    await this.setState({
      data: data,
      bigPicture: bigPicture,
      showAddSectionBool: false 
    })
  }

  async deleteTags(pictureIndex,tagIndex){
      let data = {...this.state.data}
      data = Object.values(data)
      data[pictureIndex].tags.map((item,index) =>{
        if(index === tagIndex){
          data[pictureIndex].tags.splice(index, 1)
        }
      })
      
      await this.setState({
        data: data
      })
  }

  async showAddSection(pictureIndex){

    await this.setState({
      showAddSectionBool: true
    })
  }

  async addTagsDecisionTree(tags, pictureIndex){
    let data = {...this.state.data}
    data = Object.values(data)
    tags.map((item,index)=> {
      data[pictureIndex].tags.push(item)   
    })
     
    this.setState({
      data: data 
    })
  }

  sendTags(event){

    event.preventDefault()
    console.log(event.target.value)
    let data =[]
    this.state.data.map((item,index)=>{
      let pushItem= {
        name: item.file.name,
        tags: []
      }
      data.push(pushItem)
      item.tags.map((tag,tagIndex)=>{
        data[index].tags.push(tag)
      })
    })

    let response
    fetch("http://localhost:8081/tag", {
            // mode: 'no-cors',
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // "Content-Type": "application/x-www-form-urlencoded",
            },
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.ok){
                return response.json()//console.log(response.json())
            //window.location = "http://localhost:8081/download/" + JSON.stringify(response.text())
        }
    }).then(function(response) {
        window.location = "http://localhost:8081/download/" + response.filename
    })

  
  }

  openTagHandler(){
    this.setState({
      showTagHandler: true
    })
  }

  hasData(input){
    return  input !== undefined &&
            input !== null 
  }
  
  render(){
    console.log(this.state.data)
      return(
          <Grid className={"App"}  >
            <Grid.Row centered>
              <Header />
            </Grid.Row>
            <Grid.Row centered>
              <Uploader handleImageChange={this.handleImageChange} /*imageSelected={this.imageSelected} 
                        handleTagging={this.handleTagging} data={this.state.data} bigPicture={this.state.bigPicture}*//> 
            </Grid.Row> 
            {this.hasData(this.state.data) ?
              <Grid.Row centered>
        
                  <Button basic className="mainButton" onClick={this.handleTagging}>Tag your Images</Button>
                {this.hasData(this.state.data[0].tags) ?
                  <Button className="mainButton" basic onClick={this.openTagHandler}>Tag Images Manually</Button>
                  
                  :null
                }
                {this.hasData(this.state.data[0].tags)? 
                  <Button className="mainButton" basic onClick={this.sendTags}>Download Tagged Images</Button>
                :null}
              </Grid.Row>
            :
              null
            }
            <Grid.Row centered>
                {this.hasData(this.state.data) ?
                  <ImagePreview data={this.state.data} showTagHandler={this.state.showTagHandler} openTagHandler={this.openTagHandler} imageSelected={this.imageSelected} deleteTags={this.deleteTags} bigPicture={this.state.bigPicture}>
                    <TagHandler  bigPicture={this.state.bigPicture} addTag={this.addTag} addTagsDecisionTree={this.addTagsDecisionTree}/>
                  </ImagePreview> 
                :null
                }
              {/* </Grid.Column> */}
            </Grid.Row>
            {/* <Grid.Column computer={8} >
              {this.state.data !== undefined && this.state.data !== null ? 
                <TagHandler data={this.state.data} deleteTags={this.deleteTags} showAddSectionBool={this.state.showAddSectionBool}
                  showAddSection={this.showAddSection} bigPicture={this.state.bigPicture} addTag={this.addTag} addTagsDecisionTree={this.addTagsDecisionTree}/> 
              :null
              }
            </Grid.Column> */}
           
          <Grid.Row centered>          
            {/* <form  onSubmit={this.sendTags}>
              <label>
               <input /> 
             </label>
              <input type="submit" value="Submit" />
        </form> */}
          </Grid.Row>

          

        </Grid> 
      )
  }
}
export default App;