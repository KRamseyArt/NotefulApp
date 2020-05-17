import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Context from './../../../../Context'

import './Note.css';

export class Note extends Component {
  static defaultProps = {
    onDeleteNote: () =>{}  
  }
  static contextType = Context;

  handleDeleteNote = e => {
    e.preventDefault()
    const noteId = this.props.note.id

    const ENDPOINT = 'http://localhost:9090'
    fetch(`${ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(() => {
        this.context.deleteNote(noteId)
        this.props.onDeleteNote(noteId)
      })
      .catch(error => {
        console.error({error})
      })
  }

  render() {
    const {name, id, modified} = this.props.note;

    const deleteButton = this.props.directory
      ? <button
          className="DeleteNote"
          onClick={this.handleDeleteNote}
        >
          <Link
            to={this.props.directory}
          >
            X
          </Link>
        </button>
      : <button
          className="DeleteNote"
          onClick={this.handleDeleteNote}
        >
          X
        </button>
    console.log(deleteButton)

    return (
          <li
            className="Note"
            key={id}
          >
            <div className="Details">
              <Link to={`/note/${id}`}>
                {name}
              </Link>
              <article>
                <em>Date Modified: {modified}</em>
              </article>
            </div>
            {deleteButton}      
          </li>
    )
  }
}

export default Note