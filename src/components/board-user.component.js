import React, { Component } from "react";
import { Button } from 'react-bootstrap';

import UserService from "../services/user.service";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getUserBoard().then(
      response => {
        this.setState({
          //get committees info and display as links to access committees; current response data is empty so replace with that
          content: response.data
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
      <body>
        <div className="container">
          <header className="jumbotron">
            <h3>{this.state.content}</h3>
            <p>USER!!</p>
          </header>
        </div>
        <div style={{alignItems: 'right', display: 'flex',  justifyContent:'right'}}>
                <Button href="/createc">Create Committee</Button>

        </div>
      </body>

    );
  }
}
