import React from 'react';

import Note from './note/Note';

import './NoteList.css'

export class NoteList extends React.Component {
  render(){
    const notes = this.props.notes;
    console.log(notes)

    return (
      <ul className='NoteList'>
        {notes.map(note =>
          <Note
            note={note}
            key={note.id}
          />
        )}
        <li>
          <button
            className="AddNote"
          >
            + Note
          </button>
        </li>
      </ul>
    )
  }
}
export default NoteList;