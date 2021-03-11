import React, { Component } from "react";
import { Button, Card, CardDeck } from 'react-bootstrap';

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import CommitteeService from "../services/committee.service";

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
          comCount: response.data.committeeCount,
          comData: response.data.committeeData,
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
            <h3>Dashboard</h3>
            <p>USER!!</p>
            <p>number of committees: {this.state.comCount} </p>
            <p type="committee"> committees: {this.state.comData}</p>
          </header>
        </div>
        <div style={{alignItems: 'right', display: 'flex',  justifyContent:'right'}}>
                <Button href="/createc">Create Committee</Button>

        </div>
        <div className="card-deck">
          <CardDeck>
            <Card>
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural lead-in to
                  additional content. This content is a little bit longer.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This card has supporting text below as a natural lead-in to additional
                  content.{' '}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
            <Card>
              <Card.Img variant="top" src="holder.js/100px160" />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural lead-in to
                  additional content. This card has even longer content than the first to
                  show that equal height action.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
          </CardDeck>
        </div>
        
      </body>

    );
  }
}
