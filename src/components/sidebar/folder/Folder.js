import React from 'react'
import { Link } from 'react-router-dom';

import './Folder.css';

export default function Folder(props) {
  const folder = props.folder;
  // console.log(folder);

  return (
    <li
      className="Folder"
      key={folder.id}
      id={folder.id}
      onClick={(e) => props.selectFolder(e)}
    >
      <Link to={`/folder/${folder.id}`}>
        {folder.name}
      </Link>
    </li>
  )
}
