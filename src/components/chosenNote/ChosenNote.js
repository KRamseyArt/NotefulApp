import React from 'react';

import Note from '../main/noteList/note/Note';

import './ChosenNote.css';

export default function ChosenNote(props) {
  
  
  const note = props.note;
  
  return (
    <div className="ChosenNote">
      <Note
        note={note}
        directory={'/'}
      />
      <p>{note.content}</p>
    </div>
  )
}

ChosenNote.defaultProps={
  note: {},
  folder: {}
}