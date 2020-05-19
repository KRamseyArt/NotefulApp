import React, { Component } from 'react'

import './AddFolder.css'
import Context from '../../../Context';
import ValidationError from './../../ValidationError/ValidationError'

export class AddFolder extends Component {
  static contextType = Context;

  constructor(props){
    super(props);
    this.state = {
      folderName: {
        value: "",
        touched: false
      },
      folderId: {
        value: ""
      }
    }
  }
  
  handleSubmit(e) {
    e.preventDefault();
    const {folderName, folderId} = this.state;

    // console.log("Folder Name: ", folderName);
    // console.log("Folder ID: ", folderId);

    const ENDPOINT = 'http://localhost:9090';
    fetch(`${ENDPOINT}/folders`,{
      method: 'POST',
      headers: {
        "Content-Type" : "application/json"
      },
      body: 
        JSON.stringify({
          "name": folderName.value
        })
    })
      .then(res =>{
        if(!res.ok){
          return res.json().then(error => {
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
        this.context.addFolder(data);
      })
      .catch(error => {
        console.log(error);
      })
  }

  updateFolderData(folderName) {
    this.setState({
      folderName: {
        value: folderName,
        touched: true
      },
      folderId:{
        value: folderName
      }
    })
  }

  validateName() {
    const name = this.state.folderName.value.trim();
    const minLength = 3;

    if(name.length === 0) {
      return 'Folder Name is required';
    } else if (name.length < minLength) {
      return `Folder Name must be at least ${minLength} characters in length`
    }
  }

  render() {
    const folderNameError = this.validateName();

    return (
      <form
        className="AddFolderForm"
        onSubmit={e => this.handleSubmit(e)}
      >
        <h3 className="AddFolderHeading">New Folder</h3>  
        <div className="FolderName">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            className="name"
            name="name"
            id="name"
            onChange={e => this.updateFolderData(e.target.value)}
          />
          {this.state.folderName.touched && <ValidationError message={folderNameError} />}
        </div>
        <div className="ButtonSection">
          <button
            type="reset"
            className="Cancel Btn"
          >
            CANCEL
          </button>
          <button
            type="submit"
            className="Add Btn"
            disabled={
              this.validateName()
            }
          >
            ADD
          </button>
        </div>
      </form>
    )
  }
}

export default AddFolder
