import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export class FetchData extends Component {
    static displayName = FetchData.name;

    constructor(props) {
        super(props);
        this.state = { notes: [], loading: true };
        this.deleteHandler = this.deleteHandler.bind(this);
        this.populateNoteData = this.populateNoteData.bind(this);
    }

    componentDidMount() {
        this.populateNoteData();
    }

    static renderNotesTable(notes, deleteHandler) {
        return (
            <div>
                <Link className="btn btn-primary" to="/note-form">Create</Link>
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Created Date Time</th>
                            <th>Updated Date Time</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notes.map(note =>
                            <tr key={note.id}>
                                <td>{new Date(note.createDateTimeOffset).toLocaleString()}</td>
                                <td>{new Date(note.updateDateTimeOffset).toLocaleString()}</td>
                                <td>{note.title}</td>
                                <td>{note.description}</td>
                                <td>
                                    <p><Link to={`/note-form/${note.id}`} className="btn btn-warning">Edit</Link></p>
                                    <p><button className="btn btn-danger" onClick={() => deleteHandler(note.id)}>Delete</button></p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchData.renderNotesTable(this.state.notes, this.deleteHandler);

        return (
            <div>
                <h1 id="tabelLabel" >Notes</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }

    async populateNoteData() {
        const response = await fetch('note');
        const data = await response.json();
        this.setState({ notes: data, loading: false });
    }

    async deleteHandler(noteId) {
        const result = window.confirm(`Are you sure to delete this note (${noteId})?`);
        if (result) {
            try {
                await fetch(`note/${noteId}`, {
                    method: 'DELETE'
                });
                await this.populateNoteData();
            } catch (err) {
                console.error(err);
            }
        }
    }
}
