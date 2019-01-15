import React, { Component } from 'react';
import {Button,Grid,Label} from 'semantic-ui-react'
import config from "./../../config"

class DecisionTree extends Component{
    constructor(props){
        super(props)
        this.props = props
        this.state={
            tree: config.decisionTree,
            Ebene2Bool: false,
            Ebene3Bool:false,
            chosenTags:[]
        }
        this.handleEbene2 = this.handleEbene2.bind(this)
        this.handleEbene1 = this.handleEbene1.bind(this)
        this.handleEbene3 = this.handleEbene3.bind(this)
        this.addTag = this.addTag.bind(this)
    }

    handleEbene1(event){
        let Ebene2
        this.state.tree.map((item,index)=>{
            if(item.name === event.target.value){
                Ebene2 = item.member
                
            }
        })
        let chosenTags = []
        chosenTags.push(event.target.value)

        this.setState({
            Ebene2: Ebene2,
            Ebene2Bool:true,
            Ebene3Bool: false,
            chosenTags: chosenTags
        })
    }

    handleEbene2(event){
        let Ebene3
        if(this.state.Ebene2[0].member !== undefined){
            this.state.Ebene2.map((item,index)=>{
                if(item.name === event.target.value){
                    Ebene3 = item.member
                }
            })
            this.setState({
                Ebene3: Ebene3,
                Ebene3Bool:true
            })
        }
        let chosenTags = {...this.state.chosenTags}
        chosenTags= Object.values(chosenTags)
        
        chosenTags[1] = event.target.value
        if(chosenTags[2] !== undefined){
            chosenTags.splice(2,1)
        }
        this.setState({
            chosenTags:chosenTags
        })
    }

    handleEbene3(event){
        let chosenTags = {...this.state.chosenTags}
        chosenTags = Object.values(chosenTags)
        chosenTags[2] = event.target.value
        this.setState({
            chosenTags:chosenTags
        })
    }

    generateClasses(){
        return null
    }

    addTag(){
        console.log(this.props)
        this.props.addTag(this.state.chosenTags,this.props.pictureId)
    }
    

    render(){
        return(
            <Grid>
                {this.state.chosenTags !== undefined && this.state.chosenTags !== null ? 
                    this.state.chosenTags.map((item,index) => {
                        return(
                            <Label as='a' color='red' tag>
                                {item}
                            </Label>
                        )
                    })
                :
                    null
                }
                <Button onClick={this.addTag}>Add Tags </Button>   
                <Grid.Row centered className="decisionTreeEbene">
                        {this.state.tree.map((item,index) => {
                            return(
                                // console.log(item)
                                <Grid.Column computer={4} /*style={{marginleft:"5%"}}*/>
                                    <Button value={item.name} className={this.generateClasses()} onClick={this.handleEbene1}>{item.name}</Button>
                                </Grid.Column>
                            )
                        })}
                </Grid.Row>
                <Grid.Row centered className="decisionTreeEbene">
                        {this.state.Ebene2Bool === true ?
                            this.state.Ebene2.map((item,index)=> {
                                return(
                                    <Grid.Column computer={4} style={{marginTop:"2%"}}>
                                        <Button value={item.name} className={this.generateClasses()} onClick={this.handleEbene2}>{item.name}</Button>
                                    </Grid.Column>                                
                                )
                            })
                        :null
                        }
                </Grid.Row>
                <Grid.Row  centered className="decisionTreeEbene">
                    {this.state.Ebene3Bool === true ?
                        this.state.Ebene3.map((item,index)=> {
                            return(
                                    <Grid.Column computer={4} style={{marginTop:"2%"}} /*style={{marginleft:"5%"}}*/>
                                        <Button value={item.name} className={this.generateClasses()} onClick={this.handleEbene3}>{item.name}</Button>
                                    </Grid.Column>                             )
                        })
                    :null
                    }
                </Grid.Row>
            </Grid>
        )
    }
}

export default DecisionTree