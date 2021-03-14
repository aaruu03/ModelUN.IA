import React, {Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Button} from 'react-bootstrap';

import userService from "../services/user.service";
import AuthService from "../services/auth.service";
import CommitteeService from "../services/committee.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class CommitteeC extends Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeComName = this.onChangeComName.bind(this);
    this.onChangeTopic = this.onChangeTopic.bind(this);
    this.onChangeTopic2 = this.onChangeTopic2.bind(this);

    this.state = {
      comname: "",
      topic: "",
      topic2: false,
      message: ""
    };
  }

  onChangeComName= (e) => {
    this.setState({
      comname: e.target.value
    });
  };

  onChangeTopic = (e) => {
    this.setState({
      topic: e.target.value
    });
  };

  onChangeTopic2 = (e) => {
    this.setState({
      topic2: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({
      message: "",
      succesful: false,
    });

    this.form.validateAll();
    console.log("validated all");
    if (this.checkBtn.context._errors.length === 0) {
        const user = AuthService.getCurrentUser();
        const username = user.username;
        CommitteeService.createCommittee(username, this.state.comname, this.state.topic, this.state.topic2).then( //new(userservice) //newtest authservice
            (response) => {
              this.setState({
                message: response.data.message,
                successful: true
              });
            },
            (error) => {
            const resMessage =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();

           this.setState({
            message: resMessage,
            successful: false
           });
          }
        );
    } 
  };
    
    

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">

          <Form onSubmit={this.handleSubmit} ref={c => {this.form = c;}}>
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="comname">Committee name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="comname"
                    value={this.state.comname}
                    onChange={this.onChangeComName}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="topic">Topic</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="topic"
                    value={this.state.topic}
                    onChange={this.onChangeTopic}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="topic2">Topic 2</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="topic2"
                    value={this.state.topic2}
                    onChange={this.onChangeTopic2}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Submit </button> 
                </div>
              </div>
            )}

                {this.state.message && (
                  <div className="form-group">
                    <div
                      className={ this.state.successful ? "alert alert-success" : "alert alert-danger" }
                      role="alert"
                    >
                      {this.state.message}
                    </div>
                    <Button href="/user">Go back to Dashboard</Button>
                  </div>
                )}
                <CheckButton style={{ display: "none" }} ref={c => {this.checkBtn = c;}} />
          </Form>
        </div>
      </div>
    );
  }
} 