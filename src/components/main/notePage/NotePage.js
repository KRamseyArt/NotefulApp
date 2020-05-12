import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import ChosenNote from '../../chosenNote/ChosenNote';

import './NotePage.css';

export class NotePage extends Component {
  render() {
    return (
      <main className="NotePage">
        <ul className="FolderList">
          <li className="ThisFolder">
            <Link to={`/folder/${this.props.folder.id}`}>
              {this.props.folder.name}
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
          <ChosenNote note={this.props.note} />
        </div>
        
      </main>
    )
  }
}

export default NotePage
