import React, { Component } from 'react'

import Sidebar from './sidebar/Sidebar';
import NoteList from './main/noteList/NoteList';

import './HomePage.css';

export class HomePage extends Component {
  render() {
    return (
      <main className="Content">
        <Sidebar
          folders={this.props.folders}
          selectFolder={this.props.selectFolder}
        />
        <NoteList notes={this.props.notes} />
      </main>
    )
  }
}

export default HomePage