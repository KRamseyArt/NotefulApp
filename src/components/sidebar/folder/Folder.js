import React from 'react'
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Folder.css';

export default class Folder extends React.Component {
  
  render(){
    const folder = this.props.folder;
    // console.log(folder);

    return (
      <li
        className="Folder"
        key={folder.id}
        id={folder.id}
        // onClick={this.props.selectFolder(folder.name)}
      >
        <NavLink to={`/api/folders/${folder.id}`}>
          {folder.folder_name}
        </NavLink>
      </li> 
    )
  }
}
Folder.defaultProps = {
  folder: {
    name: 'Folder',
    id: Math.floor(Math.random() * 100) + 'Folder' + Math.floor(Math.random * 100)
  }
}

Folder.propTypes = {
  folder: PropTypes.shape({
    id: PropTypes.number.isRequired,
    folder_name: PropTypes.string.isRequired,
  })
}