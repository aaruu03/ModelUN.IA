import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import {  Link } from "react-router-dom";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import CommitteeService from "../services/committee.service";

export default class Committee extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.location.pathname);
        this.state = {
            content: ""
        };
    }

    componentDidMount(){
        console.log(this.props.location.pathname);
        const path = this.props.location.pathname.substring(1);
        console.log("path", path);
        const id = this.props.location.pathname.substring(11);
        console.log("id", id);
        CommitteeService.getCommittee(path, id).then(
            response => {
                this.setState({
                    comName: response.data.committeeName,
                    comTopic: response.data.committeeTopic,
                    comTopic2: response.data.committeeTopic2, 
                    //content: response.data
                });
            },
            error => {
                this.setState({
                  content:
                    (error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                    error.message ||
                    error.toString()
                });
            }
        );
    }

    render() {
        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>you have reached committee, {this.state.comName}</h3>
                    <h4>Topic: {this.state.comTopic}</h4>
                    <h4>Topic 2: {this.state.comTopic2}</h4>
                </header>
            </div>
        );    
    }

}