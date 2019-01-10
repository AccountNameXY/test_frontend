import React, { Component } from 'react';
import {Label,Grid} from 'semantic-ui-react'
import "./resultSection.css"

class ResultSection extends Component{
    constructor(props){
        super(props)
        this.props = props
        this.state={}

    }


    hasData(data){
        return  data !== undefined &&
                data !== null
    }

    render(){
        return(
            <div className="resultSection">
                {this.props.data.map((item,index) => {
                    if(item.selected === true){
                        return(
                            item.tags.map((item, index) => {
                                return(
                                    <Grid.Row style={{marginTop:"2%"}}>
                                        <Label as='a' color='red' tag>
                                            {item}
                                        </Label>   
                                    </Grid.Row>
                                )
                            })
                        )
                    }
                })}
            </div>
        )
    }
}

export default ResultSection