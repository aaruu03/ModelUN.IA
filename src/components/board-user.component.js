import React, { Component } from "react";
import { Button, Card, CardDeck } from 'react-bootstrap';
import {  Link } from "react-router-dom";

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
        console.log("huh", this.state.comData);
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

  displayCommittees(props) {
    console.log("discom");
    const data = "hi";
    console.log(data);
    console.log("test", props.committees);
    var comdata = props.committees
    console.log("test2", comdata);
    return(
     <div>
       {props.committees !== undefined &&

       <div>
         {comdata.map((items, index) => {
           var i = 1;
            return (
              <ul>
                {items.map((subItems, sIndex) => {
                  if(i === 1){i = 2; return <li><Link to={"/"} className="link"> Committee: </Link>{subItems} </li>;}
                  else if (i === 2){i =3; return <li>Topic: {subItems} </li>;}
                  else if(i === 3){i = 4; return <li>Topic 2: {subItems}</li>;}
                  else{i = 1; var items = subItems; return <li><Link to={"/committee/" + subItems} className="link"> Go to committee </Link>{subItems}</li>;}
                })}
              </ul>
            );
          })}
       </div>
      }
     </div>
    );
  } //also get back separate array of _ids of committees from initial get request when you get committees
  //theyll be in the same order of the committees so then when you create the committee lists you can insert the id as the link 
  //ALTERNATIVELY, insert the id as the 4th field in the same committee info array and then make a fourth bullet point as the link w the id to redirect

  render() {
    return (
      <body>
        <div className="container">
          <header className="jumbotron">
            <h3>Dashboard</h3>
            <p>You can view all your committees here</p>
            <p>number of committees: {this.state.comCount} </p>
            <p type="committee"> committees: {this.state.comData}</p>
          </header>
        </div>
        <div style={{alignItems: 'right', display: 'flex',  justifyContent:'right'}}>
                <Button href="/createc">Create Committee</Button>
        </div>
        <this.displayCommittees committees={this.state.comData} />
      </body>
      
    );
  }
}
