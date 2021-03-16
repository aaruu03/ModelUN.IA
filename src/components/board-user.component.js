import React, { Component } from "react";
import { Button} from 'react-bootstrap';
import {  Link } from "react-router-dom";

import UserService from "../services/user.service";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      content: ""
    };
  }

//sends a request to the backend to get all commmittee information of the user to display
  componentDidMount() {
    
    UserService.getUserBoard().then(
      response => {
        this.setState({
          comData: response.data.committeeData,
          comCheck: response.data.committeeData.length,
          comCount: response.data.committeeCount,
        });
        console.log("huh2", this.state.comCheck);
        console.log("huh", this.state.comCount);
        console.log("huh3", this.state.comData);
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

  //checks whether comdata is an array, if true, then returns a div w a list of all the committees and their info
  displayCommittees(props) {
    console.log("discom");
    const data = "hi";
    console.log(data);
    console.log("test", props.committees);
    var comdata = props.committees
    console.log("test2", comdata);
   
    return(
      <div>
        {Array.isArray(comdata) &&
        <div>
          {comdata.map((items, index) => {
            var i = 1;
             return (
               <ul>
                 {items.map((subItems, sIndex) => {
                   if(i === 1){i = 2; return <li> Committee: {subItems} </li>;}
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
  } 
  //Inserts the id as the 4th field in the same committee info array and 
  //then make a fourth bullet point as the link w the id to redirect
  

  render() {
    return (
      <body>
        <div className="container">
          <header className="jumbotron">
            <h3>Dashboard</h3>
            <p>You can view all your committees here</p>
            <p>number of committees: {this.state.comCount} </p>
            <p>{(this.state.comCount > 0) ? "" : this.state.comData }</p>
          </header>
        </div>
        <div style={{alignItems: 'right', display: 'flex',  justifyContent:'right'}}>
                <Button href="/createc">Create Committee</Button>
        </div>

          {(this.state.comCount===this.state.comCheck || this.state.comCount === 0) ? <this.displayCommittees committees={this.state.comData}/> : "Please try refreshing" }

      </body>
      
    );
  }
}
