import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Context from './Context';
import HomePage from './components/HomePage';
import './App.css';
import NotePage from './components/main/notePage/NotePage';

export class App extends React.Component {
  state = {
    folders: [],
    notes: [],
  }

  componentDidMount(){
    const ENDPOINT = 'http://localhost:9090';
    Promise.all([
      fetch(`${ENDPOINT}/notes`),
      fetch(`${ENDPOINT}/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        if(!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e));
        if(!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e));

        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({notes, folders});
      })
      .catch(error => {
        console.error({error});
      })
  }

  setFolderId(selectedFolder){
    

    console.log("setting selected folder to: " + selectedFolder);
    this.setState({
      selectedFolder
    })
    console.log("selected folder is now " + this.state.selectedFolder);
  }

  setNoteId(selectedNote){
    // alert('note selected');
    this.setState({
      selectedNote
    })
  }

  handleDeleteNote = (noteId) => {
    this.setState({
      notes: this.state.notes.filter(note =>
        note.id !== noteId)
    })
  }
  
  render() {
    // console.log(this.state);
    const state = this.state;
    
    const contextValue = {
      notes: state.notes,
      folders: state.folders,
      deleteNote: this.handleDeleteNote,
    }
    

    return (
      <Context.Provider
        value={contextValue}
      >
        <div className="App">
          <Switch>
            <Route
              path='/folder/:folderId'
              component={HomePage}
            />
            <Route
              path='/note/:noteId'
              component={NotePage}
            />
            <Route
              exact
              path='/'
              component={HomePage}
            />
          </Switch>
        </div>
      </Context.Provider>
    );
  }
}

export default App;