import React, { Component } from 'react';
import { Label, Grid, Input, Button, Icon, Header, Segment } from 'semantic-ui-react'
import DecisionTree from "./../decisionTree/decisionTree"
import "./tagHandler.css"

class TagHandler extends Component {
    constructor(props) {
        super(props)
        this.props = props
        this.state = {
            stagedTags: [],
            stagedTagsDec: [],
            value: ""
        }

        this.addTagsDecisionTree = this.addTagsDecisionTree.bind(this)
        this.addTagStagingArea = this.addTagStagingArea.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.addTag = this.addTag.bind(this)
        this.clearAll = this.clearAll.bind(this)
        this.keyPress = this.keyPress.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    addTag(pictureIndex) {
        this.props.addTag(pictureIndex, this.state.stagedTags, this.state.stagedTagsDec)
    }

    addTagAll(pictureIndex) {
        this.props.addTagAll(this.state.stagedTags, this.state.stagedTagsDec)
    }

    addTagStagingArea() {
        let stagedTags = [...this.state.stagedTags]
        stagedTags.push(this.state.value)

        this.setState({
            stagedTags: stagedTags,
            value: ""
        })
    }

    addTagsDecisionTree(tags) {
        let stagedTagsDec = tags

        this.setState({
            stagedTagsDec: stagedTagsDec
        })
    }

    deleteTags(tagIndex, type) {
        if (type === "dec") {
            let stagedTags = [...this.state.stagedTagsDec]
            stagedTags.splice(tagIndex, 1)
            this.setState({
                stagedTagsDec: stagedTags
            })
        } else {
            let stagedTags = [...this.state.stagedTags]
            stagedTags.splice(tagIndex, 1)

            this.setState({
                stagedTags: stagedTags
            })
        }
    }

    keyPress(e) {
        if (e.keyCode === 13) {
            this.addTagStagingArea()
        }
    }

    clearAll() {
        this.setState({
            stagedTags: [],
            stagedTagsDec: []
        })
    }

    hasData(data) {
        return data !== undefined &&
            data !== null
    }

    render() {
        return (
            <div className="resultSection" style={{ marginLeft: "5%" }}>
                <Grid>
                    <Segment className="stagedTagsSegment">
                        <Grid.Row >
                            <Header>Staged Tags</Header>
                        </Grid.Row>
                        <Grid.Row className="stagingArea">
                            {this.state.stagedTags.length !== 0 && this.state.stagedTags !== null ?
                                this.state.stagedTags.map((item, index) => {
                                    return (
                                        <Grid.Column key={index} computer={4} style={{ marginTop: "15px", marginRight: "15px" }}>
                                            <Label as='a' color='red' tag>
                                                {item}
                                                <Icon name='delete' onClick={() => this.deleteTags(index, "reg")} />
                                            </Label>
                                        </Grid.Column>
                                    )
                                })
                                :
                                null
                            }
                            {this.state.stagedTagsDec.length !== 0 && this.state.stagedTagsDec !== null ?
                                this.state.stagedTagsDec.map((item, index) => {
                                    return (
                                        <Grid.Column key={index} computer={4} style={{ marginTop: "15px", marginRight: "15px" }}>
                                            <Label as='a' color='red' tag>
                                                {item}
                                                <Icon name='delete' onClick={() => this.deleteTags(index, "dec")} />
                                            </Label>
                                        </Grid.Column>
                                    )
                                })
                                :
                                null
                            }

                        </Grid.Row>
                        {(this.state.stagedTagsDec.length !== 0 && this.state.stagedTagsDec !== null) || (this.state.stagedTags.length !== 0 && this.state.stagedTags !== null) ?
                            // <Grid.Row centered>
                            <div>
                                <Button basic onClick={() => this.addTag(this.props.bigPicture.pictureIndex)} style={{ display: "block", width: "95%", marginTop: "3%" }}>Add Staged Tags To Big Picture</Button>
                                <Button basic onClick={() => this.addTagAll(this.props.bigPicture.pictureIndex)} style={{ display: "block", width: "95%", marginTop: "3%" }}>Add Staged Tags To All Pictures</Button>
                                <Button basic onClick={this.clearAll} style={{ display: "block", width: "95%", marginTop: "3%" }}> Clear all Tags</Button>
                            </div>
                            // </Gri    d.Row>
                            : null
                        }
                    </Segment>
                    <Grid.Row style={{ marginTop: "2%" }}>
                        <Input value={this.state.value} onChange={this.handleChange} onKeyDown={this.keyPress} placeholder='Search...' style={{ marginRight: "5%" }} />
                        <Button basic onClick={this.addTagStagingArea}>Add Tag to staging Area </Button >
                    </Grid.Row>
                    <Grid.Row style={{ marginTop: "2%" }}>
                    </Grid.Row>
                    <Grid.Row>
                        <Header>...Or use our decision tree</Header>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <DecisionTree addTag={this.addTagsDecisionTree} pictureId={this.props.bigPicture.pictureIndex} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default TagHandler