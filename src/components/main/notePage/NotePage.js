import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

import Context from './../../../Context'

import ChosenNote from '../../chosenNote/ChosenNote';

import './NotePage.css';

export class NotePage extends Component {
  static contextType = Context;
  
  render() {
    console.log(this.context)
    console.log(this.props)
    const selectedNote = this.context.notes.find(note => {
      if(note.id == this.props.match.params.noteId){
        return note;
      }
    }) || {}
    // console.log(selectedNote);

    const selectedFolder = this.context.folders.find(folder => {
      if(folder.id == selectedNote.folder_id){
        return folder;
      }
    }) || {}

    console.log(selectedNote)
    console.log(selectedFolder)

    return (
      <main className="NotePage">
        <ul className="FolderList">
          <li className="ThisFolder">
            <Link to={`/api/folders/${selectedFolder.id}`}>
              {selectedFolder.folder_name}
            </Link>
          </li>
          <li>
            <button
              className="BackBtn"
              onClick={e => this.props.history.goBack()}
            >
              Back
            </button>
          </li>
        </ul>
        <div className="NoteDisplay">
          <ChosenNote note={selectedNote} />
        </div>
        
      </main>
    )
  }
}

export default NotePage

NotePage.propTypes = {
  history:PropTypes.object,
  match: PropTypes.object
}