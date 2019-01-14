// import React, { Component } from 'react';

// import {Grid,Button,Segment,Label} from "semantic-ui-react"
// import config from "./../../config"
// import "./imagePreview.css"

// class ImagePreview extends Component {
//     constructor(props){
//         super(props)
//         this.props = props
//         this.state={}
//         this.imageSelected = this.imageSelected.bind(this)
//     }

//     hasData(input){
//         return  input !== undefined   &&   
//                 input !== undefined
//     }

//     imageSelected(index){
//         this.props.imageSelected(index)
//     }


//     render(){
//         return(
//             <div>
//             {this.hasData(this.props.images)?
//                 <Grid.Row columns="4" >
//                 {this.props.images.map((item,index) => {
//                     return(
//                         <Grid.Column style={{marginLeft:"5%", marginTop:"5%"}}>
//                             <img className="imagePreview" src={item.url} onClick={() => this.imageSelected(index)}/> 
//                         </Grid.Column>
//                     )
//                 })}
//                 </Grid.Row>
//             :
//                 null
//             }
//             </div>
//         )
//     }
// }

// export default ImagePreview


import React, { Component } from 'react';

import {Grid,Button,Segment,Label, GridRow} from "semantic-ui-react"
import config from "./../../config"
import "./imagePreview.css"
import $ from 'jquery'




class ImagePreview extends Component {
    constructor(props){
        super(props)
        this.props = props
        this.state={}
        this.imageSelected = this.imageSelected.bind(this)
        this.scroll = this.scroll.bind(this)
       
    }

    hasData(input){
        return  input !== undefined   &&   
                input !== undefined
    }

    imageSelected(index){
        this.props.imageSelected(index)
    }

    scroll(direction){
        let far = $( '.image-container' ).width()/2*direction;
        let pos = $('.image-container').scrollLeft() + far;
        $('.image-container').animate( { scrollLeft: pos }, 1000)
      }

    render(){
        return(
            <div>
                {this.props.bigPicture !== undefined ?
                    <div className="choosenBigPictureDiv"> 
                        <img className="choosenBigPicture" src={this.props.bigPicture.url} />
                    </div>
                :
                    <p>Select a Picture to see Tags </p>
                } 
                <div className="main">
                    <div className="wrapper">
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
                    </div>
                </div>
            </div>
        )       
    }
    //         <div className="preview">
                    
    //                 <div className="slider-container">
                   
    //                 <a className="prev" onClick={this.scroll.bind(null,-1)}>&#10094;</a>
    //                     <div className="image-container">
    //                         {this.props.data.map((item, index) => {
    //                                 return(
    //                                     <div className="innerContainer" ><img className="imagePreview" /* src={item.url} */ src={item.url} onClick={() => this.imageSelected(index)}/></div>
    //                                 )
    //                             })
    //                         }
    //                     </div>
    //                 <a className="next" onClick={this.scroll.bind(null,1)}>&#10095;</a>
    //                 </div>
    //         </div> 
    //     )
    // }

}


export default ImagePreview