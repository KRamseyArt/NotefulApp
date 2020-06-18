import React, { Component } from 'react'
import config from '../../../../config'

import './AddNote.css';
import Context from './../../../../Context';
import ValidationError from '../../../ValidationError/ValidationError';

export class AddNote extends Component {
  static contextType = Context;
  constructor(props){
    super(props);
    this.state = {
      title: {
        value: "",
        touched: false
      },
      folderId: {
        value:"",
        touched: true
      },
      date: {
        value: ""
      },
      content: {
        value: "",
        touched: false
      }
    }
  }
  
  handleSubmit(e) {
    e.preventDefault();

    const date = e.target.date.value;

    const {title, folderId, content} = this.state;

    // console.log("Title: ", title.value);
    // console.log("Folder ID: ", folderId.value);
    // console.log("Date: ", date);
    // console.log("Content: ", content.value);

    const ENDPOINT = config.API_ENDPOINT;
    fetch(`${ENDPOINT}/api/notes`,{
      method: 'POST',
      headers: {
        "Content-Type" : "application/json"
      },
      body: 
        JSON.stringify({
          "title": title.value,
          "content": content.value,
          "folder_id": folderId.value,
          "date_published": date
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
        this.context.addNote(data);
      })
      .catch(error => {
        console.log(error);
      })

    e.target.title.value = "";
    e.target.content.value = "";
    this.resetState();
  }

  resetState(){
    this.setState({
      title: {
        value: "",
        touched: false
      },
      folderId: {
        value:"",
        touched: true
      },
      date: {
        value: ""
      },
      content: {
        value: "",
        touched: false
      }
    })
  }
  updateFolder(folderId){
    this.setState({
      folderId: {
        value: folderId,
        touched: true
      }
    })
  }

  updateTitle(title){
    this.setState({
      title: {
        value: title,
        touched: true
      }
    });
  }
  setDate(date){
    this.setState({
      date: {
        value: date
      }
    })
  }
  updateContent(content){
    this.setState({
      content: {
        value: content,
        touched: true
      }
    })
  }

  validateTitle() {
    const title = this.state.title.value.trim();
    const minLength = 3;

    if(title.length === 0) {
      return 'Title is required';
    } else if (title.length < minLength) {
      return `Title must be at least ${minLength} characters in length`
    }
  }
  validateContent() {
    const content = this.state.content.value.trim();
    const minLength = 10;

    if(content.length === 0) {
      return 'Content is required';
    } else if (content.length < minLength){
      return `Content must be at least ${minLength} characters in length`
    }
  }

  render() {
    const titleError= this.validateTitle();
    const contentError=this.validateContent();

    const thisDate = new Date().toLocaleDateString();
    
    const folderOptions = this.context.folders.map(folder => {
      return (
        <option
          value={folder.id}
          key={folder.id}
        >
          {folder.folder_name}
        </option>
      )
    })

    return (
      <form
        className="AddNoteForm"
        onSubmit={e => this.handleSubmit(e)}
      >
        <h2 className="Heading">New Note</h2>
        <div className="TopSection">
          <div className="TitleSection">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              className="title"
              name="title"
              id="title"
              aria-required="true"
              aria-describedby="newNoteTitle"
              aria-label="Title"
              onChange={e => this.updateTitle(e.target.value)}
            />
            <div
              id="newNoteTitle"
              className="newNoteGuide"
            >
              Enter a title for your new note
            </div>
            {this.state.title.touched && (
              <ValidationError message={titleError}/>
            )}
          </div>
          <div className="FolderSection">
            <label htmlFor="folderOptions">Add To *</label>
            <select
              className="folderOptions"
              name="folderOptions"
              id="folderOptions"
              aria-required="true"
              aria-label="Add to Folder"
              aria-describedby="newNoteFolder"
              onChange={e => this.updateFolder(e.target.value)}
            >
              <option value="null">Select a Folder--</option>
              {folderOptions}
            </select>
            <div
              id="newNoteFolder"
              className="newNoteGuide"
            >
              Select folder to contain this note
            </div>
          </div>
        </div>
        <div className="ContentSection">
          <label htmlFor="content">Content *</label>
          <textarea
            type="text"
            className="content"
            name="content"
            id="content"
            aria-required="true"
            aria-label="Content"
            aria-describedby="newNoteContent"
            onChange={e => this.updateContent(e.target.value)}
          />
          <div
            id="newNoteContent"
            className="newNoteGuide"
          >
            Enter your new note's content
          </div>
          {this.state.content.touched && (
            <ValidationError message={contentError} />
          )}
          
        </div>
        <div className="ButtonSection">
          <button
            type="reset"
            className="Reset Button"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="Submit Button"
            disabled={
              this.validateTitle() ||
              this.validateContent()
            }
          >
            Submit
          </button>
          <div className="DateSection">
            <label htmlFor="date">Added On: </label>
            <input
              type="text"
              className="date"
              name="date"
              id="date"
              defaultValue={thisDate}
            />
          </div>
        </div>
      </form>
    )
  }
}

export default AddNote
