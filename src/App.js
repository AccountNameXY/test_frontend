import React from 'react';
import './App.css';

//SemanticUI
import { Button as ButtonSemanticUI, Grid } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'

//config
import config from "./config"

//Components
import ImagePreview from "./components/imagePreview/imagePreview"
import Uploader from "./components/uploader/uploader"
import Header from "./components/header/header"
import TagHandler from "./components/tagHandler/tagHandler"

//BackendConnector
import BackendConnector from "./backendConnector/backendConnector"
const backendConnector = new BackendConnector


class App extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      showTagHanler: false,
      selected: 0,
      data: []
    }
    this.backendConnector = backendConnector
    this.config = config
    this.handleTagging = this.handleTagging.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
    this.handleImageChange = this.handleImageChange.bind(this)
    this.imageSelected = this.imageSelected.bind(this)
    this.deleteTags = this.deleteTags.bind(this)
    this.openTagHandler = this.openTagHandler.bind(this)
    this.addTag = this.addTag.bind(this)
    this.addTagAll = this.addTagAll.bind(this)
    this.sendTags = this.sendTags.bind(this)
  }

  onSelect = key => {
    this.setState({ selected: key });
  }

  //When Pictures are Selected by the User and shown in preview
  async handleImageChange(input) {
    let prevData = [... this.state.data]



    let data = []
    //set properties for the picture (URL, file, empty Tags )
    input.map((item, index) => {
      let newObject = {}
      newObject.url = URL.createObjectURL(item)
      newObject.file = item
      newObject.tags = []
      newObject.pictureIndex = index
      data.push(newObject)
    })

    await this.setState({
      data: data,
      showTagHandler: false,
      bigPicture: data[0]
    })

    this.deleteFolder(prevData)
    // this.handleUpload()

  }

  //delete previously uploaded Pictures
  async deleteFolder(prevData) {
    let fileNamesArray = []
    prevData = (prevData.map((item, index) => {
      return item.file.name
    }))
    let data = []
    prevData.forEach((element) => {
      data.push(element)
    })

    this.backendConnector.deleteOnReupload(data, this.state.data)
    // await this.setState({
    //   bigPicture: data[0]
    // })
  }

  //addds staged Tags to selected Picture
  async addTag(pictureIndex, value1, value2) {

    this.setState((pState => {
      var data = pState.data;
      value1.map((item1, index1) => {
        data[pictureIndex].tags.push(item1)
      })
      value2.map((item2, index2) => {
        data[pictureIndex].tags.push(item2)
      })
      return { data: data };
    }))
  }

  //Adds staged Tags to all Pictures uploaded
  async addTagAll(value1, value2) {
    let data = [...this.state.data]

    data.map((dataItem, dataIndex) => {
      value1.map((item1, index1) => {
        data[dataIndex].tags.push(item1)
      })
      value2.map((item2, index2) => {
        data[dataIndex].tags.push(item2)
      })
    })

    await this.setState({
      data: data
    })
  }

  //Handle Upload to Backend 
  async handleUpload() {
    let data = [...this.state.data]
    let dataToMap = [...this.state.data]
    await this.backendConnector.handleUpload(dataToMap)


    this.setState({
      bigPicture: data[0]
    })
  }

  //Request Tags from Backend and write them in state.data.tags of each picture 
  async handleTagging() {
    let fileData = [...this.state.data]
    let stateData = [... this.state.data]
    fileData = (fileData.map((item, index) => {
      return item.file.name
    }))
    let dataToMap = []
    fileData.forEach((element) => {
      dataToMap.push(element)
    })

    let data = await this.backendConnector.handleTagging(dataToMap, stateData)


    await this.setState({ data: data, bigPicture: data[0] })


  }

  //If Pictures is clicked it is set by BigPicture
  async imageSelected(selectedIndex) {
    let data = [...this.state.data]

    await this.setState({
      data: data,
      bigPicture: data[selectedIndex],
      // showAddSectionBool: false
    })
  }

  //deletes an Tag from the recieved tags 
  async deleteTags(pictureIndex, tagIndex) {
    let data = [...this.state.data]
    data[pictureIndex].tags.map((item, index) => {
      if (index === tagIndex) {
        data[pictureIndex].tags.splice(index, 1)
      }
    })

    await this.setState({
      data: data
    })
  }



  //Send tags to backend to write Tags into Pictures and recieve .Zip
  sendTags(event) {
    event.preventDefault()
    let data = []
    this.state.data.map((item, index) => {
      let pushItem = {
        name: item.file.name,
        tags: []
      }
      data.push(pushItem)
      item.tags.map((tag, tagIndex) => {
        data[index].tags.push(tag)
      })
    })
    this.backendConnector.sendTags(data)
  }


  openTagHandler() {
    this.setState({
      showTagHandler: true
    })
  }

  hasData(input) {
    return input !== undefined &&
      input !== null
  }

  render() {
    const { data, showTagHandler, bigPicture } = this.state;
    console.log(bigPicture);
    return (
      <Grid className={"App"}  >
        <Grid.Row centered>
          <Header />
        </Grid.Row>
        <Grid.Row centered>
          <Uploader handleImageChange={this.handleImageChange} />
        </Grid.Row>
        {this.state.data.length !== 0 ?
          <Grid.Row centered >
            <Grid.Column computer={5} style={{ textAlign: "center", marginTop: "3%" }}>
              <ButtonSemanticUI basic className="mainButton" onClick={this.handleTagging}>Tag your Images</ButtonSemanticUI>
            </Grid.Column>
            <Grid.Column computer={5} style={{ textAlign: "center", marginTop: "3%" }} >
              <ButtonSemanticUI className="mainButton" basic onClick={this.openTagHandler}>Tag Images Manually</ButtonSemanticUI>
            </Grid.Column>
            <Grid.Column computer={5} style={{ textAlign: "center", marginTop: "3%" }}>
              <ButtonSemanticUI className="mainButton" basic onClick={this.sendTags}>Download Tagged Images</ButtonSemanticUI>
            </Grid.Column>
          </Grid.Row>
          :
          null
        }
        <Grid.Row centered>
          {this.state.data.length !== 0 ?
            <ImagePreview data={data} showTagHandler={showTagHandler} /*openTagHandler={this.openTagHandler} */ imageSelected={this.imageSelected} deleteTags={this.deleteTags} bigPicture={bigPicture}>
              <TagHandler bigPicture={bigPicture} addTag={this.addTag} addTagAll={this.addTagAll} addTagsDecisionTree={this.addTagsDecisionTree} />
            </ImagePreview>
            : null
          }
        </Grid.Row>
      </Grid>
    )
  }
}
export default App;