import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

import AddFolder from './addFolder/AddFolder';
import FolderError from './folderError/FolderError';
import Folder from './folder/Folder';
import './Sidebar.css';

export class Sidebar extends Component {
  state = {
    showForm: false
  }

  showForm = () => <AddFolder/>
  
  render() {
    const folders = this.props.folders;

    return (
      <section className='Sidebar'>
        <header className="Header">
          <Link to='/'>Noteful</Link>
        </header>
        <ul className='Sidebar'>
          {folders.map(folder =>
            <FolderError key={folder.id}>
              <Folder
              folder={folder}
              key={folder.id}
              selectFolder={this.props.selectFolder}
            />
            </FolderError>
          )}
          <li>
            <button
              className="AddFolder"
              onClick={() => this.setState({showForm: !this.state.showForm})}
            >
              + Folder
            </button>
          </li>
        </ul>
        {this.state.showForm ? this.showForm() : null}
      </section>
      
    )
  }
}

export default Sidebar

Sidebar.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    folder_name: PropTypes.string.isRequired
  }))
}