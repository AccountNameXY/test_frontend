import React, { Component } from 'react';
import {Label,Grid,Input,Button,Icon,Header} from 'semantic-ui-react'
import DecisionTree from "./../decisionTree/decisionTree"
import "./tagHandler.css"

class TagHandler extends Component{
    constructor(props){
        super(props)
        this.props = props
        this.state={}
        this.handleChange = this.handleChange.bind(this)
        this.addTag = this.addTag.bind(this)
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

    hasData(data){
        return  data !== undefined &&
                data !== null
    }

    render(){
        return(
            <div className="resultSection">
                <Grid>
                    <Grid.Row >
                        <Header>Add your Own Tag...</Header>
                    </Grid.Row>
                    <Grid.Row  style={{marginTop:"2%"}}>
                        <Input  value={this.state.value} onChange={this.handleChange} placeholder='Search...' />
                        <Button style={{marginLeft:"5%"}} onClick={() => this.addTag(this.props.bigPicture.pictureIndex)}>Add Tags</Button>
                    </Grid.Row>
                    <Grid.Row style={{marginTop:"2%"}}>
                    </Grid.Row>
                    <Grid.Row>
                        <Header>...Or use our decision tree</Header>
                    </Grid.Row>
                    <Grid.Row>
                        <DecisionTree addTag={this.props.addTagsDecisionTree} pictureId={this.props.bigPicture.pictureIndex}/>  
                    </Grid.Row>
                </Grid>       
            </div>
        )
    }
}

export default TagHandler