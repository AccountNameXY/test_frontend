import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//SemanticUI
import { Image,Icon, Header,Segment, Button,Grid,Input,Label,Message } from 'semantic-ui-react'; 
import 'semantic-ui-css/semantic.min.css'

//MaterialUI
import UIButton from "./materialUI/UIButton";
import UIOtherButton from "./materialUI/UIOtherButton";
import UITable from "./materialUI/UITable"
import IconButton from '@material-ui/core/IconButton';

//Bootstrap
import {Button as ButtonStrap,MenuItem,
        SplitButton,Clearfix,Jumbotron,
        NavItem,Navbar,FormControl, FormGroup,
        Pager,Header as HeaderUI
      } from 'react-bootstrap';


class App extends React.Component{

  constructor(props){
      super(props);
      this.props = props; 
  }

  render(){
      return(
          <Grid classname={"App"} centered>
            <Grid.Row>
              <Grid.Column computer={14}  style={{marginTop:"2%"}}>
                <Segment className="mainheader" textAlign="center">
                  <Image centered src="/images/lufthansa_2018.jpg" />
                  <Header as="h1" className="mainHeaderText">
                    Hier könnte ihr Coorperate Design stehen
                  </Header>
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column computer={5} style={{marginTop:"5%"}}>
                <Segment>
                <Header as='h1'>Semantic UI</Header>
                  <Button>Click Here</Button>
                  <Input loading icon='user' placeholder='Search...' style={{marginTop:"3%"}} />
                  <div style={{marginTop:"3%"}}>
                    <Button as='div' labelPosition='right'>
                      <Button color='red'>
                        <Icon name='heart' />
                        Like
                      </Button>
                      <Label as='a' basic color='red' pointing='left'>
                        2,048
                      </Label>
                    </Button>
                    <Button as='div' labelPosition='right'>
                      <Button basic color='blue'>
                        <Icon name='fork' />
                        Fork
                      </Button>
                      <Label as='a' basic color='blue' pointing='left'>
                        2,048
                      </Label>
                    </Button>
                  </div>
                  <Segment placeholder>
                    <Header icon>
                      <Icon name='pdf file outline' />
                      No documents are listed for this customer.
                    </Header>
                    <Button primary>Add Document</Button>
                  </Segment>
                  <Message warning attached='bottom'>
                    <Icon name='warning' />
                    You've reached the end of this content segment!
                  </Message>
                </Segment>
              </Grid.Column>
              <Grid.Column computer={5} style={{marginTop:"5%"}}>
                
                <Segment><Header as="h1"> MaterialUI </Header>
                  <UIButton/>
                  <UIOtherButton/>
                  <UITable />
                </Segment>
              </Grid.Column>
              <Grid.Column computer={5} style={{marginTop:"5%"}}>

                
                <Segment><Header as="h1"> Bootstrap </Header>
                  <ButtonStrap bsStyle="primary" style={{marginLeft:"2%"}}>Primary</ButtonStrap>

                  {/* Indicates a successful or positive action */}
                  <ButtonStrap bsStyle="success" style={{marginLeft:"2%"}}>Success</ButtonStrap>

                  {/* Contextual button for informational alert messages */}
                  <ButtonStrap bsStyle="info" style={{marginLeft:"2%"}}>Info</ButtonStrap>

                  {/* Indicates caution should be taken with this action */}
                  <ButtonStrap bsStyle="warning" style={{marginLeft:"2%"}}>Warning</ButtonStrap>

                  {/* Indicates a dangerous or potentially negative action */}
                  <ButtonStrap bsStyle="danger" style={{marginLeft:"2%"}}>Danger</ButtonStrap>
                  <SplitButton title="Dropdown right" pullRight id="split-button-pull-right" style={{marginBottom:"5%"}}>
                    <MenuItem eventKey="1">Action</MenuItem>
                    <MenuItem eventKey="2">Another action</MenuItem>
                    <MenuItem eventKey="3">Something else here</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey="4">Separated link</MenuItem>
                  </SplitButton  >
                  <Clearfix>
                    <ul className="dropdown-menu open">
                      <MenuItem header>Header</MenuItem>
                      <MenuItem>link</MenuItem>
                      <MenuItem divider />
                      <MenuItem header>Header</MenuItem>
                      <MenuItem>link</MenuItem>
                      <MenuItem disabled>disabled</MenuItem>
                      <MenuItem title="See? I have a title.">link with title</MenuItem>
                      <MenuItem eventKey={1} href="#someHref" >
                        link that alerts
                      </MenuItem>
                    </ul>
                  </Clearfix>
                  <Jumbotron>
                    <h1>Hello, world!</h1>
                    <p>
                      This is a simple hero unit, a simple jumbotron-style component for calling
                      extra attention to featured content or information.
                    </p>
                    <p>
                      <ButtonStrap bsStyle="primary">Learn more</ButtonStrap>
                    </p>
                  </Jumbotron>
                  <Pager>
                    <Pager.Item previous href="#">
                      &larr; Previous Page
                    </Pager.Item>
                    <Pager.Item next href="#">
                      Next Page &rarr;
                    </Pager.Item>
                  </Pager>;
                </Segment>
              </Grid.Column>
              </Grid.Row>
          </Grid> 
      )
  }
}
export default App;

