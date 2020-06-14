import React from 'react';
import PropTypes from 'prop-types'

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

ChosenNote.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    folder_id: PropTypes.number.isRequired,
    date_published: PropTypes.string.isRequired,
  })
}