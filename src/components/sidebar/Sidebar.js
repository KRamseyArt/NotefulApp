import React, { Component } from 'react'

import Folder from './folder/Folder';
import './Sidebar.css';

export class Sidebar extends Component {
  render() {
    const folders = this.props.folders;

    return (
      <ul className='Sidebar'>
        {folders.map(folder =>
          <Folder
            folder={folder}
            key={folder.id}
            selectFolder={this.props.selectFolder}
          />
        )}
        <li>
          <button
            className="AddFolder"
          >
            + Folder
          </button>
        </li>
      </ul>
    )
  }
}

export default Sidebar
