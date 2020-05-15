import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import Folder from './folder/Folder';
import './Sidebar.css';

export class Sidebar extends Component {
  render() {
    const folders = this.props.folders;

    return (
      <section className='Sidebar'>
        <header className="Header">
          <Link to='/'>Noteful</Link>
        </header>
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
      </section>
      
    )
  }
}

export default Sidebar