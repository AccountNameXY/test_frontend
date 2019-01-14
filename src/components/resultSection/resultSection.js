import React, { Component } from 'react';
import {Label,Grid,Input,Button,Icon} from 'semantic-ui-react'
import DecisionTree from "./../decisionTree/decisionTree"
import "./resultSection.css"

class ResultSection extends Component{
    constructor(props){
        super(props)
        this.props = props
        this.state={}
        this.handleChange = this.handleChange.bind(this)
        this.addTag = this.addTag.bind(this)
        this.deleteTags = this.deleteTags.bind(this)
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }

    addTag(pictureIndex){
        this.props.addTag(pictureIndex,this.state.value)
        this.setState({
            value: ""
        })
    }

    deleteTags(tagIndex,pictureIndex){
        this.props.deleteTags(pictureIndex,tagIndex)
    }

    hasData(data){
        return  data !== undefined &&
                data !== null
    }

    render(){
        return(
            <div className="resultSection">

                {this.props.bigPicture !== undefined && this.props.bigPicture !== null ?
                    this.props.bigPicture.tags !== undefined && this.props.bigPicture.tags !== null ? 
                        <div>
                            {this.props.bigPicture.tags.map((item, tagIndex) => {
                                return(
                                    <Grid.Row style={{marginTop:"2%"}}>
                                        <Label as='a' color='white' tag>
                                            {item}
                                            <Icon name='delete' onClick={() => this.deleteTags(tagIndex,this.props.bigPicture.pictureIndex)}/>
                                        </Label>   
                                    </Grid.Row>
                                )
                            })}
                                <Grid.Row style={{marginTop:"2%"}}>
                                    <Input value={this.state.value} onChange={this.handleChange} placeholder='Search...' />
                                </Grid.Row>
                                <Grid.Row style={{marginTop:"2%"}}>
                                    <Button onClick={() => this.addTag(this.props.bigPicture.pictureIndex)}>Add Tags</Button>
                                </Grid.Row>
                                <DecisionTree addTag={this.props.addTagsDecisionTree} pictureId={this.props.bigPicture.pictureIndex}/> 
                        </div>
                    :null
                :null
                }    
            </div>
        )
    }
}

export default ResultSection