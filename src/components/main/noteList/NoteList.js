import React from 'react';
import PropTypes from 'prop-types';

import Note from './note/Note';
import AddNote from './addNote/AddNote';
import NoteError from './noteError/NoteError';

import './NoteList.css'

export class NoteList extends React.Component {
  state = {
    showAddNote: false
  }

  showAddNote = () => {
    return <AddNote />
  }
  
  render(){
    const notes = this.props.notes;
    // console.log(notes)

    return (
      <ul className='NoteList'>
        {notes.map(note =>
          <NoteError key={note.id}>
            <Note
              note={note}
              key={note.id}
            />
          </NoteError>
        )}
        <li>
          <button
            className="AddNote"
            onClick={() => this.setState({showAddNote: !this.state.showAddNote})}
          >
            + Note
          </button>
        </li>
        <li>
          {this.state.showAddNote ? this.showAddNote() : null}
        </li>
      </ul>
      
    )
  }
}
export default NoteList;

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
}