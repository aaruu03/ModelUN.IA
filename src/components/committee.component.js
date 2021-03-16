import React, {Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import TextArea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button";
import { Button} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';

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

export default class Committee extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDType = this.onChangeDType.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeActions = this.onChangeActions.bind(this);
        this.onChangePass = this.onChangePass.bind(this);
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
        console.log(this.props.location.pathname);
        this.state = {
            content: "",
            id: this.props.location.pathname.substring(11),
            newDirective: false,
            title: "",
            dtype: "",
            description: "",
            actions: "",
            pass: "",
            signatures: "",
            message: "",
            //bootstrap table stuff
            columns: [
                {
                    dataField: 'title',
                    text: 'Title'
                },
                {
                    dataField: 'dtype',
                    text: 'Type'
                }, 
                {
                    dataField: 'description',
                    text: 'Description',
                },
                {
                    dataField: 'signatures',
                    text: 'Signatures'
                },
                {
                    dataField: 'actions',
                    text: 'Actions'
                },
                {
                    dataField: 'pass',
                    text: 'Pass/Fail'
                }
            ],
            directives: [],
        };
    }

    //gets the path and id to send to the backend to get committee information from ID
    componentDidMount(){
        console.log(this.props.location.pathname);
        const path = this.props.location.pathname.substring(1);
        console.log("path", path);
        console.log("id", this.state.id);
        CommitteeService.getCommittee(path, this.state.id).then(
            response => {
                this.setState({
                    comName: response.data.committeeName,
                    comTopic: response.data.committeeTopic,
                    comTopic2: response.data.committeeTopic2, 
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
        CommitteeService.getDirectives(this.state.id).then(
        (response) => {
            this.setState({
                directives: response.data,
            });
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

    //sends backend request using committee id to delete committee, then reroutes user to dashboard (user page)
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

    handleSubmit = (e) => {
        e.preventDefault();
        
        this.setState({
            message: "",
            succesful: false,
        });

        this.form.validateAll();
        console.log("validated all");
        if (this.checkBtn.context._errors.length === 0) {
            console.log("committe in");
            console.log(this.state.title, this.state.dtype, this.state.description, this.state.signatures, this.state.actions,  this.state.pass);
            CommitteeService.addDirectives(
                this.state.id, this.state.title, this.state.dtype, this.state.description, this.state.signatures, 
                this.state.actions,  this.state.pass).then( 
                    (response) => {
                        this.setState({
                            message: response.data.message,
                            successful : true,
                            title: "",
                            dtype: "",
                            description: "",
                            actions: "",
                            pass: "",
                            signatures: ""
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
    }

    onChangeTitle = (e) => {
        this.setState({title: e.target.value});
    };
    onChangeDType = (e) => {
        this.setState({dtype: e.target.value});
    };
    onChangeDescription = (e) => {
        this.setState({description: e.target.value});
    };
    onChangeActions = (e) => {
        this.setState({actions: e.target.value});
    };
    onChangePass = (e) => {
        this.setState({pass: e.target.value})
    }
    onChangeSignatures = (e) => {
        this.setState({signatures: e.target.value})
    }


    setNewDirective= () => {
        this.setState({
            newDirective: !this.state.newDirective,
        });
    };
    forceUpdateHandler(){
        console.log("force");
        //this.setNewDirective();
        this.forceUpdate();
    };
    getDirectiveForm(){
        return(
            <div className="col-md-12">
                <div className="card card-container">
                    <Form onSubmit={this.handleSubmit} ref={c => {this.form = c;}}>
                        
                        <div>
                            <div className="form-group">
                                <label htmlFor="title">Directive title</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.onChangeTitle}
                                    validations={[required]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="dtype">Type</label>
                                <Select
                                    type="select"
                                    className="form-control"
                                    name="dtype"
                                    value={this.state.dtype}
                                    onChange={this.onChangeDType}
                                    validations={[required]}
                                >
                                    <option value="">Choose Type</option>
                                    <option value="Public">Public</option>
                                    <option value="Private Overt">Private Overt</option>
                                    <option value="Private Covert">Private Covert</option>
                                </Select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <TextArea
                                    type="text"
                                    className="form-control"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.onChangeDescription}
                                    validations={[required]}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="signatures">Sponsors/Signatures</label>
                                <TextArea
                                    type="text"
                                    className="form-control"
                                    name="signatures"
                                    value={this.state.signatures}
                                    onChange={this.onChangeSignatures}
                                    validations={[required]}
                                />
                                <p>Please separate names with commas or querying will not work</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="actions">Actions</label>
                                <TextArea
                                    type="text"
                                    className="form-control"
                                    name="actions"
                                    value={this.state.actions}
                                    onChange={this.onChangeActions}
                                    validations={[required]}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pass">Pass/Fail</label>
                                <Select
                                    type="select"
                                    className="form-control"
                                    name="pass"
                                    value={this.state.pass}
                                    onChange={this.onChangePass}
                                    validations={[required]}
                                >
                                    <option value="">Choose Type</option>
                                    <option value="Pass">Pass</option>
                                    <option value="Fail">Fail</option>
                                </Select>
                            </div>

                            <div className="form-group">
                            <button className="btn btn-primary btn-block">Submit </button> 
                            </div>
                        </div>

                        {this.state.message && (
                            <div className="form-group">
                                <div
                                className={this.state.successful ? "alert alert-success" : "alert alert-danger" }
                                role="alert"
                                >
                                {this.state.message}
                                </div>
                            </div>
                        )}
                        <CheckButton style={{ display: "none" }} ref={c => {this.checkBtn = c;}} />
                    </Form>
                </div>
            </div> 
        );
    }
    getBootstrapTable(){
        
        return(
            <div className="container" style={{ marginTop: 50 }}>
                <BootstrapTable 
                striped
                hover
                keyField='id' 
                data={ this.state.directives } 
                columns={ this.state.columns } />
            </div>
        );
    }
    render() {
        const directivePopup = () => {
            if(!this.state.newDirective)
            {
                console.log("new direct", this.state.newDirective);
                return(
                    this.getDirectiveForm()
                );
            }
            else if (this.state.newDirective){
                console.log("new direct2", this.state.newDirective);
                return(this.getBootstrapTable());
            }
            else{
                return(<p>There was an error please try again</p>);
            }
        }; 
        return (
            <div>
                <div className="container">
                    <header className="jumbotron">
                        <h3>Committee: {this.state.comName}</h3>
                        <h4>Topic: {this.state.comTopic}</h4>
                        <h4>Topic 2: {this.state.comTopic2}</h4>
                        <div style={{alignItems: 'right', display: 'flex',  justifyContent:'right'}}>
                            <Button onClick={this.setNewDirective}>
                                {!this.state.newDirective ? "Get Directives" : "Add new Directive"}
                            </Button>

                            <Button
                            variant="danger"
                            onClick={() => this.deleteCommittee(this.state.id)}
                            >
                                Delete Committee
                            </Button>
                        </div>
                    </header>
                </div>
                {directivePopup()}
            </div>
        );    
    }

}

//{this.state.newDirective === true ? <this.newDirectivePopup dir={this.state}/> : ""}