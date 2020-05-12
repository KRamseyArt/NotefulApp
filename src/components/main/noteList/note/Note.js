import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import './Note.css';

export class Note extends Component {

  render() {
    const note = this.props.note;

    return (
      <li
        className="Note"
        key={note.id}
      >
        <div className="Details">
          <Link to={`/note/${note.id}`}>
            {note.name}
          </Link>
          <article>
            <em>Date Modified: {note.modified}</em>
          </article>
        </div>
  
        <button
          className="DeleteNote"
        >
          X
        </button>
      </li>
    )
  }
}

export default Note
