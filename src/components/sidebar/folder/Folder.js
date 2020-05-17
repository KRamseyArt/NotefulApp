import React from 'react'
import { NavLink } from 'react-router-dom';

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
        <NavLink to={`/folder/${folder.id}`}>
          {folder.name}
        </NavLink>
      </li> 
    )
  }
}