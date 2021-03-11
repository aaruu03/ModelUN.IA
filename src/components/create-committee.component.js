import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

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

const Committee = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [comname, setComName] = useState("");
  const [topic, setTopic] = useState("");
  const [topic2, setTopic2] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const onChangeComName= (e) => {
    const comname = e.target.value;
    setComName(comname);
  };

  const onChangeTopic = (e) => {
    const topic = e.target.value;
    setTopic(topic);
  };

  const onChangeTopic2 = (e) => {
    const topic2 = e.target.value;
    setTopic2(topic2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);
    //setLoading(true);

    form.current.validateAll();
    console.log("validated all");
    if (checkBtn.current.context._errors.length === 0) {
        console.log("inside if loop");
        const user = AuthService.getCurrentUser();
        const username = user.username;
        CommitteeService.createCommittee(username, comname, topic, topic2).then( //new(userservice) //newtest authservice
            (response) => {
              setMessage(response.data.message);
              setSuccessful(true);
            },
            (error) => {
            const resMessage =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();

           // setLoading(false);
            setMessage(resMessage);
            setSuccessful(false);
            
            }
        );
    } /*else {
      setLoading(false);
    }*/
  };
    
    


  return (
    <div className="col-md-12">
      <div className="card card-container">

        <Form onSubmit={handleSubmit} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="comname">Committee name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="comname"
                  value={comname}
                  onChange={onChangeComName}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="topic">Topic</label>
                <Input
                  type="text"
                  className="form-control"
                  name="topic"
                  value={topic}
                  onChange={onChangeTopic}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="topic2">Topic 2</label>
                <Input
                  type="text"
                  className="form-control"
                  name="topic2"
                  value={topic2}
                  onChange={onChangeTopic2}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Submit </button> 
              </div>
            </div>
          )}

              {message && (
                <div className="form-group">
                  <div
                    className={ successful ? "alert alert-success" : "alert alert-danger" }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
              <CheckButton style={{ display: "none" }} ref={checkBtn} />
          
        </Form>
      </div>
    </div>
  );
};

export default Committee;
