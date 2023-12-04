import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export class FetchData extends Component {
    static displayName = FetchData.name;

    constructor(props) {
        super(props);
        this.state = { notes: [], loading: true, keyword: '' };
        this.deleteHandler = this.deleteHandler.bind(this);
        this.populateNoteData = this.populateNoteData.bind(this);
        this.setKeyword = this.setKeyword.bind(this);
    }

    componentDidMount() {
        this.populateNoteData();
    }

    setKeyword(event) {
        let value = event.target.value;
        this.setState({
            keyword: value,
        });
        this.populateNoteData(value);
    }

    static renderNotesTable(notes, deleteHandler, keyword, searchHandler) {
        return (
            <div>
                <Link className="btn btn-primary" to="/note-form">Create</Link>
                <input onChange={searchHandler} name='search' value={keyword} />
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Created Date Time</th>
                            <th>Updated Date Time</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Tags</th>
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
                                <td>{Array.isArray(note.tags) ? note.tags.join(", ") : null}</td>
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
            : FetchData.renderNotesTable(this.state.notes, this.deleteHandler, this.state.keyword, this.setKeyword);

        return (
            <div>
                <h1 id="tabelLabel" >Notes</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }

    async populateNoteData(keyword) {
        let url = "note";
        if (keyword)
        {
            url += `?keyword=${keyword}`
        }
        const response = await fetch(url);
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
