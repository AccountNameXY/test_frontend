// import React, {Component} from 'react';

// import {Grid,Button,Segment,Label} from "semantic-ui-react"
// import config from "./../../config"
// import "./uploader.css"

// class Uploader extends Component{
//     constructor(props){
//         super(props)
//         this.props = props
//         this.state ={
//         }
//         this.handleImageChange = this.handleImageChange.bind(this)
//         this.handleTagging = this.handleTagging.bind(this)
//     }

//     handleImageChange(e){
//         e.preventDefault()
//         this.props.handleImageChange(e.target.files)
//     }

//     handleTagging(){
//         this.props.handleTagging()
//     }

//     render(){
//         return(
//             <Segment className="dropZone">
//                 <div className="centerDiv"> 
//                     <Label
//                         className="uploadZone"
//                         as="label"
//                         basic
//                         htmlFor="upload"
//                         for="hidden-new-file"
//                     >
//                         <Button
//                         icon="upload"
//                         label={{
//                             basic: true,
//                             content: 'Select new file(s)'
//                         }}
//                         labelPosition="right"
//                         />
//                         <form encType="multipart/form-data" action="">
//                             <input ref={this.myRef} className="inputField" id="hidden-new-file" multiple type="file" onChange={this.handleImageChange} />
//                         </form>
//                         <Button type="submit" onClick={this.handleTagging}>Tag Image(s)</Button>
//                     </Label>
//                 </div> 

//                 <div className="DragDrop"> 
//                 <p className="DragAndDrop">{config.body.DragAndDrop}</p>
//                 </div>
//         </Segment>
//         )
//     }
// }

// export default Uploader

import React, {Component} from 'react';

import {Grid,Button,Segment,Label} from "semantic-ui-react"
import config from "./../../config"
import "./uploader.css"
import ImagePreview from '../imagePreview/imagePreview';

class Uploader extends Component{
    constructor(props){
        super(props)
        this.props = props
        this.state ={
        }
        this.handleImageChange = this.handleImageChange.bind(this)
        this.handleTagging = this.handleTagging.bind(this)
    }

    handleImageChange(e){
        e.preventDefault()
        this.props.handleImageChange(e.target.files)
    }

    handleTagging(){
        this.props.handleTagging()
    }

    render(){
        return(
         <div>
                {console.log(this.props.data)}
               


            <Segment className="browseFiles" style={{border:"0em"}}>
                 <div className="centerDiv" style={{border:"0em"}}> 
                     <Label
                     className="uploadZone" style={{border:"0em"}}
                     as="label"
                     basic
                    htmlFor="upload"
                     for="hidden-new-file"
                 >
                    <Button
                     className="DefaultIconButton" style={{border:"0em"}}
                     label={{                   
                         basic: true,
                         content: '...OR BROWSE FILES'
                     }}
                     labelPosition="right"
                     />
                     <form encType="multipart/form-data" action="">
                         <input ref={this.myRef} className="inputField" id="hidden-new-file" multiple type="file" onChange={this.handleImageChange} />
                     </form>
                     </Label>
                 </div> 
            </Segment> 
             <Segment className="UploadButton" style={{border:"0em"}}>
                 <Button className="StandardButton" type="submit" onClick={this.handleTagging}>Upload And Tag</Button>
            </Segment>
             {this.props.data !== undefined && this.props.data !== null ? 
                   <ImagePreview data={this.props.data} bigPicture={this.props.bigPicture} imageSelected={this.props.imageSelected}/>
                :  
                    <p className="DragAndDrop" style={{}}>{config.body.DragAndDrop}</p> 
                }
           

            {/*<Segment className="ConfirmSelectionButton" style={{border:"0em"}}> 
                 <Button className="SubmitButton" style={{border:"0em"}} type="submit" onClick={this.handleSubmit}> {config.body.Submit}</Button>
            </Segment>  */}
         </div>
        )
    }
}
    


export default Uploader