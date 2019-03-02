import React, { Component } from 'react';
import { Button, Grid } from 'semantic-ui-react'
import config from "./../../config"

class DecisionTree extends Component {
    constructor(props) {
        super(props)
        this.props = props
        this.state = {
            tree: config.decisionTree,
            Ebene2Bool: false,
            Ebene3Bool: false,
            chosenTags: []
        }
        this.handleEbene2 = this.handleEbene2.bind(this)
        this.handleEbene1 = this.handleEbene1.bind(this)
        this.handleEbene3 = this.handleEbene3.bind(this)
        this.addTag = this.addTag.bind(this)
    }

    async handleEbene1(event) {
        let Ebene2
        this.state.tree.map((item, index) => {
            if (item.name === event.target.value) {
                Ebene2 = item.member
            }
        })
        let chosenTags = []
        chosenTags.push(event.target.value)

        await this.setState({
            Ebene2: Ebene2,
            Ebene2Bool: true,
            Ebene3Bool: false,
            chosenTags: chosenTags
        })
        this.props.addTag(this.state.chosenTags)
    }

    async handleEbene2(event) {
        let Ebene3
        if (this.state.Ebene2[0].member !== undefined) {
            this.state.Ebene2.map((item, index) => {
                if (item.name === event.target.value) {
                    Ebene3 = item.member
                }
            })
            this.setState({
                Ebene3: Ebene3,
                Ebene3Bool: true
            })
        }
        let chosenTags = [...this.state.chosenTags]

        chosenTags[1] = event.target.value
        if (chosenTags[2] !== undefined) {
            chosenTags.splice(2, 1)
        }
        await this.setState({
            chosenTags: chosenTags
        })
        this.props.addTag(this.state.chosenTags)
    }

    async handleEbene3(event) {
        let chosenTags = [...this.state.chosenTags]
        chosenTags[2] = event.target.value
        await this.setState({
            chosenTags: chosenTags
        })
        this.props.addTag(this.state.chosenTags)

    }

    generateClasses() {
        return "decTree"
    }

    addTag() {
        console.log(this.props)
        this.props.addTag(this.state.chosenTags, this.props.pictureId)
    }


    render() {
        return (
            // <div>
            <Grid>
                {this.state.chosenTags[0] !== undefined && this.state.chosenTags[0] !== null ?
                    <Grid.Row className="decisionTreeEbene">
                        {this.state.tree.map((item, index) => {
                            return (
                                <Grid.Column key={index} computer={8} >
                                    <Button basic value={item.name} className={this.generateClasses()} onClick={this.handleEbene1}>{item.name}</Button>
                                </Grid.Column>
                            )
                        })}
                    </Grid.Row>
                    :
                    <Grid.Row className="decisionTreeEbene">
                        {this.state.tree.map((item, index) => {
                            return (
                                <Grid.Column key={index} computer={8} tablet={8} style={{ marginleft: "80%" }}>
                                    <Button basic value={item.name} className={this.generateClasses()} onClick={this.handleEbene1}>{item.name}</Button>
                                </Grid.Column>
                            )
                        })}
                    </Grid.Row>
                }

                <Grid.Row className="decisionTreeEbene">
                    {this.state.Ebene2Bool === true ?
                        this.state.Ebene2.map((item, index) => {
                            return (
                                <Grid.Column key={index} computer={4} tablet={8} style={{ marginTop: "2%" }}>
                                    <Button basic value={item.name} className={this.generateClasses()} onClick={this.handleEbene2}>{item.name}</Button>
                                </Grid.Column>
                            )
                        })
                        : null
                    }
                </Grid.Row>
                <Grid.Row className="decisionTreeEbene">
                    {this.state.Ebene3Bool === true ?
                        this.state.Ebene3.map((item, index) => {
                            return (
                                <Grid.Column key={index} computer={4} tablet={8} style={{ marginTop: "2%" }} /*style={{marginleft:"5%"}}*/>
                                    <Button basic value={item.name} className={this.generateClasses()} onClick={this.handleEbene3}>{item.name}</Button>
                                </Grid.Column>)
                        })
                        : null
                    }
                </Grid.Row>
            </Grid>
            // </div>
        )
    }
}

export default DecisionTree