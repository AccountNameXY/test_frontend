import React, { Component } from 'react';

import{Grid,Segment,Header,Button} from "semantic-ui-react"
import "./decisionTree.css"

class DecisionTree extends Component{
    constructor(props){
        super(props)
        this.props= props
        this.state={
            stage:1,

        }
        // this.handleClick = this.handleClick.bind(this)
        this.handleEbene1 = this.handleEbene1.bind(this)
        this.handleEbene2 = this.handleEbene2.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.switchStageBack = this.switchStageBack.bind(this)
        this.moveDown = this.moveDown.bind(this)
    }

    async handleEbene1(e){
        let nextContent
        this.props.data.map(item2 => {
            if(item2.name === e.target.value){
                nextContent = item2.member ;
            }
        })
        await this.setState({
            stage: 2,
            stage1: e.target.value, 
            nextContent: nextContent
        })

    }

    async handleEbene2(e){
        let nextContent
        let finalTags

        finalTags = [
            {tag: this.state.stage1},
            {tag: e.target.value}
        ]

        await this.setState({
            stage: 3,
            stage2: e.target.value,
            finalTags: finalTags
        })
    }


    async moveDown(){
        let stage = this.state.stage+1
        await this.setState({
            stage: stage
        })
    }

    async switchStageBack(){
        let stage = this.state.stage-1

        await this.setState({
            stage: stage
        })
    }

    handleSubmit(){
        this.props.handleSubmit(this.state.finalTags)
    }

    hasData(input){
        return  input !== undefined &&
                input !== null
    }

    render(){
  
        return(
            <Grid stackable centered>
                <Grid.Row centered style={{marginTop:"5%"}}>
                   
                        {this.hasData(this.props.data) ? 
                        this.props.data.map((item,itemKey) => {
                            return ( 
                                <Grid.Column computer={12} mobile={6} centered style={{marginLeft:"5%",marginTop:"5%"}}>
                                    <Button clasName="tag" value={item.name} onClick={this.handleEbene1}>{item.name}</Button>
                                </Grid.Column>
                            )
                        })
                        :null 
                        }
                    
                </Grid.Row>
                <Grid.Row centered style={{marginTop:"5%"}}>
                   
                        {console.log(this.state.stage)}
                        {this.state.stage > 1  ? 
                            this.state.nextContent.map((item,itemKey) => {
                            return ( 
                            <Grid.Column computer={3} mobile={6} centered  style={{marginTop:"5%"}}>
                                    <Button className="tag" value={item.name} onClick={this.handleEbene2}>{item.name}</Button>
                            </Grid.Column>
                            )
                        })
                        :null 
                        }
                    
                </Grid.Row>
                <Grid.Row centered style={{marginTop:"5%"}}>
                    
                        {this.state.stage == 3  ? 
                            <div>
                                {this.state.finalTags.map(tag => {
                                    return (
                                    <Grid.Column computer={4} mobile={6} centered>
                                        <Header >{tag.tag}</Header> 
                                    </Grid.Column>
                                    )
                                })}
                                <Button onClick={this.handleSubmit}>Submit</Button>
                            </div>
                        :null
                        }
                   
                </Grid.Row>
            </Grid>
        )
    }
}

export default DecisionTree