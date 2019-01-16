import React, { Component } from 'react';

import {Grid,Button,Segment,Label, GridRow,Icon} from "semantic-ui-react"
import config from "./../../config"
import "./imagePreview.css"
import $ from 'jquery'




class ImagePreview extends Component {
    constructor(props){
        super(props)
        this.props = props
        this.state={
        }
        this.imageSelected = this.imageSelected.bind(this)
        this.scroll = this.scroll.bind(this)
        this.openTaghandler = this.openTaghandler.bind(this)
    }

    hasData(input){
        return  input !== undefined   &&   
                input !== undefined
    }

    imageSelected(index){
        this.props.imageSelected(index)
    }

    deleteTags(tagIndex,pictureIndex){
        this.props.deleteTags(pictureIndex,tagIndex)
    }

    scroll(direction){
        let far = $( '.image-container' ).width()/2*direction;
        let pos = $('.image-container').scrollLeft() + far;
        $('.image-container').animate( { scrollLeft: pos }, 1000)
      }

      openTaghandler(){
          this.props.openTagHandler()
      }
      generateClassName(){
          let classNames =[]
          classNames.push("chosenBigPicture")
          if(this.hasData(this.props.bigPicture.tags)){
              classNames.push("small")
          }
          return classNames.join(" ")
      }

      generateClassNameBigPic(){
        let classNames =[]
        classNames.push("chosenBigPictureDiv")
        if(this.props.showTagHandler){
            classNames.push("small")
        }
        return classNames.join(" ")
    }

    render(){
        return(
            // <div>
               
                <Grid> 
                   
                    <Grid.Row centered>
                         
                        <Grid.Column computer={this.props.showTagHandler ? 7 : 16} style={{marginLeft:"0px"}}>
                        <Segment>
                            {this.props.bigPicture !== undefined ?
                                <div className={this.generateClassNameBigPic()}>
                                    <Grid>
                                        <Grid.Row centered>
                                            
                                            {this.hasData(this.props.bigPicture.tags) ?

                                                <Grid.Column computer={this.hasData(this.props.bigPicture.tags) ? 8 : 16}>
                                                    <Grid.Row>
                                                        <img className={this.generateClassName()} src={this.props.bigPicture.url} />
                                                    </Grid.Row>
                                                </Grid.Column>
                                            :
                                                
                                                    <Grid.Column  computer={this.hasData(this.props.bigPicture.tags) ? 8 : 16}>
                                                        <Grid.Row centered>
                                                            <img className={this.generateClassName()} src={this.props.bigPicture.url} />
                                                        </Grid.Row>
                                                    </Grid.Column>
                                                
                                            }
                                            
                                            
                                                {this.hasData(this.props.bigPicture.tags) ?
                                                    <Grid.Column computer={8}>
                                                        {this.props.bigPicture.tags.map((item, tagIndex) => {
                                                            return(
                                                                <Grid.Row style={{marginTop:"1%", marginLeft:"1px"}}>
                                                                    <Label /*className="setLabel" as='a'*/ basic color='white' pointing={"left"}>
                                                                        {item}
                                                                        <Icon name='delete' onClick={() => this.deleteTags(tagIndex,this.props.bigPicture.pictureIndex)}/>
                                                                    </Label>   
                                                                </Grid.Row>
                                                            )
                                                        })}
                                                    </Grid.Column>
                                                :null}
                                        </Grid.Row>
                                    </Grid>
                                </div>
                            :
                                <p>Select a Picture to see Tags </p>
                            }
                            <Grid>
                                <Grid.Row centered>
                                        <div className="main">
                                            <div className="wrapper">
                                            <Segment secondary>
                                                <a className="prev" onClick={this.scroll.bind(null,-1)}>&#10094;</a>
                                                
                                                <div className="image-container">
                                                    
                                                    {this.props.data.map((item, index) => {
                                                        return(
                                                            <div className="image">
                                                                <img className="imagePreview" src={item.url} onClick={() => this.imageSelected(index)}/>
                                                            </div>
                                                            // <div className="innerContainer" ><img className="imagePreview" /* src={item.url} */ src={item.url} onClick={() => this.imageSelected(index)}/></div>
                                                        )
                                                    })}
                                                    
                                                </div>
                                                
                                                <a className="next" onClick={this.scroll.bind(null,1)}>&#10095;</a>
                                                </Segment>
                                            </div>
                                        </div>
                                </Grid.Row>
                            </Grid>
                            
                        </Segment>
                        </Grid.Column>
                        
                                            
                        {this.props.showTagHandler ? 
                            <Grid.Column computer={7}>
                                <Segment>
                                {this.props.children }
                                </Segment>
                                {/* <img src={this.props.bigPicture.url} />  */}
                            </Grid.Column>
                        : null }
                        
                        </Grid.Row>
                    </Grid>
            // </div>
        )       
    }
  

}


export default ImagePreview