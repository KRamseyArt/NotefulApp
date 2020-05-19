import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

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

    const thisDate = new Date(modified).toLocaleDateString();

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
    // console.log(deleteButton)

    return (
          <li
            className="Note"
            key={id}
          >
            <div className="Details">
              <Link to={`/note/${id}`}>
                {name}
              </Link>
              <article className="ModifiedDate">
                <em>{thisDate}</em>
              </article>
            </div>
            {deleteButton}      
          </li>
    )
  }
}

export default Note

Note.defaultProps = {
  note: {
    modified: new Date()
  }
}

Note.propTypes = {
  note: PropTypes.objectOf(PropTypes.string)
}