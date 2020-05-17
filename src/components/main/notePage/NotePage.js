import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Context from './../../../Context'

import ChosenNote from '../../chosenNote/ChosenNote';

import './NotePage.css';

export class NotePage extends Component {
  static contextType = Context;
  
  render() {
    const selectedNote = this.context.notes.find(note => {
      if(note.id === this.props.match.params.noteId){
        return note;
      }
    }) || {}
    // console.log(selectedNote);

    const selectedFolder = this.context.folders.find(folder => {
      if(folder.id === selectedNote.folderId){
        return folder;
      }
    }) || {}

    return (
      <main className="NotePage">
        <ul className="FolderList">
          <li className="ThisFolder">
            <Link to={`/folder/${selectedFolder.id}`}>
              {selectedFolder.name}
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