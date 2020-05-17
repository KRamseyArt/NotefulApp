import React, { Component } from 'react'
import Context from './../Context'

import Sidebar from './sidebar/Sidebar';
import NoteList from './main/noteList/NoteList';

import './HomePage.css';

export class HomePage extends Component {
  static contextType = Context;
  
  render() {
    const {folderId} = this.props.match.params
    const {notes=[]} = this.context;

    const filteredNotes = !folderId
      ? notes
      : notes.filter(note => note.folderId === folderId)
      
    // const filteredNotes = this.context.notes.filter(note => {
    //   if (note.folderId === this.props.match.params.folderId){
    //     return true;
    //   }
    // }) || 

    return (
      <main className="Content">
        <Sidebar
          folders={this.context.folders}
          selectFolder={this.context.selectFolder}
        />
        <NoteList notes={filteredNotes} />
      </main>
    )
  }
}

export default HomePage