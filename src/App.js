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

//UI
// import Button from "./components/ui/button/button"


class App extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      showTagHanler: false,
      selected: 0,
      data: []
    }
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


  async handleImageChange(input) {
    let prevData = [... this.state.data]
    this.delteFolder(prevData)
    let data = []
    input.map((item, index) => {
      let newObject = {}
      newObject.url = URL.createObjectURL(item)
      newObject.file = item
      newObject.tags = []
      newObject.pictureIndex = index
      data.push(newObject)
    })
    let bigPicture
    data.map((item, index) => {
      if (index === 0) {
        data[index].selected = true
        bigPicture = data[index]
      } else {
        data[index].selected = false
      }
    })

    await this.setState({
      data: data,
      bigPicture: bigPicture,
      showTagHandler: false
    })

    this.handleUpload()

  }

  delteFolder(prevData) {

    let fileNamesArray = []
    prevData = (prevData.map((item, index) => {
      return item.file.name
    }))
    let data = []
    prevData.forEach((element) => {
      data.push(element)
    })

    fetch(config.url + "/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
  }

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

  async addTagAll(value1, value2) {
    let data = [...this.state.data]
    // data = Object.values(data)
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


  async handleUpload() {
    let data = [...this.state.data]
    let dataToMap = [...this.state.data]
    dataToMap.map((item, index) => {
      let fd = new FormData()
      fd.append("image", item.file)
      fetch(config.url + "/upload", {
        method: "POST",

        body: fd
      })
        .then(function (response) {
          if (!response.ok) {
            return Promise.reject('some reason');
          }
          return response.json();
        })
      // .then(function (response) {
      //   data[index].tags = response.tags
      // }).then(() => {
      //   this.setState({
      //     data: data
      //   })
      // })
    });
    this.setState({
      bigPicture: data[0]
    })
  }

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

    dataToMap.map((item, index) => {


      fetch(config.url + "/classify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item)
      })
        .then(function (response) {
          if (!response.ok) {
            return Promise.reject('some reason');
          }
          return response.json();
        })
        .then(function (response) {
          stateData[index].tags = response.tags
        })
        .then(() => {
          this.setState({
            data: stateData,
            bigPicture: stateData[0]
          })
        })
    })

    // this.senm st
  }

  async imageSelected(selectedIndex) {
    let data = [...this.state.data]
    let bigPicture
    data.map((item, index) => {
      if (selectedIndex === index) {
        item.selected = true
        bigPicture = data[index]
      } else {
        data[index].selected = false
      }
    })
    await this.setState({
      data: data,
      bigPicture: bigPicture,
      showAddSectionBool: false
    })
  }

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

  async showAddSection(pictureIndex) {
    await this.setState({
      showAddSectionBool: true
    })
  }

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

    fetch(config.url + "/tag", {
      // mode: 'no-cors',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    }).then(function (response) {
      if (response.ok) {
        return response.json()
      }
    }).then(function (response) {
      window.location = config.url + "/download/" + response.filename
    })
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
    return (
      <Grid className={"App"}  >
        <Grid.Row centered>
          <Header />
        </Grid.Row>
        <Grid.Row centered>
          <Uploader handleImageChange={this.handleImageChange} />
        </Grid.Row>
        {this.state.data.length !== 0 ?
          <Grid.Row centered>
            <ButtonSemanticUI basic className="mainButton" onClick={this.handleTagging}>Tag your Images</ButtonSemanticUI>
            <ButtonSemanticUI className="mainButton" basic onClick={this.openTagHandler}>Tag Images Manually</ButtonSemanticUI>
            <ButtonSemanticUI className="mainButton" basic onClick={this.sendTags}>Download Tagged Images</ButtonSemanticUI>
          </Grid.Row>
          :
          null
        }
        <Grid.Row centered>
          {this.state.data.length !== 0 ?
            <ImagePreview data={data} showTagHandler={showTagHandler} openTagHandler={this.openTagHandler} imageSelected={this.imageSelected} deleteTags={this.deleteTags} bigPicture={bigPicture}>
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