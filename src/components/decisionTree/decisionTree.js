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
                {this.hasData(this.props.data) ?
                    <Grid>
                        <Grid.Row centered style={{marginTop:"20%",marginLeft:"2%"}}>
                            <Grid.Column computer={12} centered >
                                < Header>1. Ebene</Header>
                            </Grid.Column>
                        </Grid.Row> 
                        <Grid.Row>
                            {this.props.data.map((item,itemKey) => {
                                return ( 
                                    <Grid.Column computer={6} mobile={6} centered style={{marginTop:"5%"}}>
                                        <Button clasName="tag" value={item.name} onClick={this.handleEbene1}>{item.name}</Button>
                                    </Grid.Column>
                                )
                            })
                            }
                        </Grid.Row>
                    </Grid>
                    :null 
                }    
                                
                {this.state.stage > 1  ? 
                <Grid>
                    <Grid.Row centered style={{marginTop:"5%",marginLeft: "30%"}}>
                        <Grid.Column computer={12} mobile={6} centered >
                            <Header>2.Ebene</Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                    {this.state.nextContent.map((item,itemKey) => {
                        return ( 
                            <Grid.Column computer={3} mobile={6} centered  style={{marginTop:"5%"}}>
                                    <Button className="tag" value={item.name} onClick={this.handleEbene2}>{item.name}</Button>
                            </Grid.Column>
                        )
                    })}
                    </Grid.Row>
                </Grid>
                :null 
                }
                
                <Grid.Row centered style={{marginTop:"5%", marginBottom:"10%"}}>
                   
                        {this.state.stage == 3  ? 
                             <Segment ><div style={{width:"50vw", height:"60 vh"}}>
                                {this.state.finalTags.map(tag => {
                                    return (
                                    <Grid.Column computer={4} mobile={6} centered style={{marginTop:"3%"}}>
                                        <Header >{tag.tag}</Header> 
                                    </Grid.Column>
                                    )
                                })}
                                
                                <Button style={{marginTop:"3%"}}>Submit</Button>
                            </div> </Segment>
                        :null
                        }
                   
                </Grid.Row>
            </Grid>
        )
    }
}

export default DecisionTree