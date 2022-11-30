import React, { Component } from 'react';
import { Navigate } from "react-router-dom";
import withRouter from "../hooks/withRouter";

class NoteFormComponent extends Component {
    static displayName = NoteFormComponent.name;

    constructor(props) {
        super(props);
        this.state = { id: props?.router?.params?.id, title: '', description: '', redirect: false, loading: true };
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.state.id && this.state.loading) {
            fetch(`note/${this.state.id}`)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        title: data.title,
                        description: data.description,
                        loading: false
                    });
                }).catch(err => {
                    this.setState({ loading: false });
                });
        }
        else {
            this.setState({
                loading: false
            });
        }
    }

    handleTitleChange(event) {
        this.setState({
            title: event.target.value
        });
    }

    handleDescriptionChange(event) {
        this.setState({
            description: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.title && this.state.description) {
            const request = {
                method: this.state.id ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: this.state.title, description: this.state.description })
            }
            const path = this.state.id ? `note/${this.state.id}` : 'note'
            fetch(path, request)
                .then(response => response.json())
                .then(data => {
                    if (data.id) {
                        this.setState({
                            redirect: true
                        });
                    }
                });
        }
    }

    render() {

        if (this.state.redirect) {
            return (<Navigate to="/note-list" replace={true} />);
        }

        return (
            <div>
                <h1>{ this.state.id ? `Update Note ${this.state.id}` : "Create Note"}</h1>
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="container">
                                <div className="row mt-2">
                                    <div className="col form-group">
                                        <label for="exampleInputTitle1">Title</label>
                                        <input type="text" className="form-control" id="exampleInputTitle1" aria-describedby="titleHelp" placeholder="Enter title" required value={this.state.title} onChange={this.handleTitleChange} />
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col form-group">
                                        <label for="exampleInputDescription1">Description</label>
                                        <textarea className="form-control" id="exampleInputDescription1" placeholder="Description" required value={this.state.description} onChange={this.handleDescriptionChange} />
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const NoteForm = withRouter(NoteFormComponent);

export { NoteForm };
