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
            content: "",
            id: this.props.location.pathname.substring(11)
        };
    }

    componentDidMount(){
        console.log(this.props.location.pathname);
        const path = this.props.location.pathname.substring(1);
        console.log("path", path);
     //   const id = this.props.location.pathname.substring(11);
        console.log("id", this.state.id);
        CommitteeService.getCommittee(path, this.state.id).then(
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

    deleteCommittee(id){
        console.log("should delete now", id);
        CommitteeService.deleteCommittee(id).then(
            () => {
                console.log("deleted");
                this.props.history.push("/user");
                window.location.reload();
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
            }
        ); 
    }

    render() {
        return (
            <body>
                <div className="container">
                    <header className="jumbotron">
                        <h3>you have reached committee, {this.state.comName}</h3>
                        <h4>Topic: {this.state.comTopic}</h4>
                        <h4>Topic 2: {this.state.comTopic2}</h4>
                    </header>
                </div>
                <div style={{alignItems: 'right', display: 'flex',  justifyContent:'right'}}>
                    <Button
                     variant="danger"
                     onClick={() => this.deleteCommittee(this.state.id)}
                     >
                         Delete Committee
                     </Button>

                </div>
            </body>
        );    
    }

}