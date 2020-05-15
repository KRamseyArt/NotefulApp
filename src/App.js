import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import HomePage from './components/HomePage';
import './App.css';
import NotePage from './components/main/notePage/NotePage';

export class App extends React.Component {
  state = {
    folders: [],
    notes: [],
    selectedFolder: "",
    selectedNote: ""
  }

  componentDidMount(){
    const store = this.props.store;

    this.setState({
      folders: store.folders,
      notes: store.notes
    })
  }

  setFolderId(selectedFolder){
    // console.log(selectedFolder);
    this.setState({
      selectedFolder
    })
  }
  
  render() {
    // console.log(this.state);
    const state = this.state;

    return (
      <div className="App">
        <Switch>
          <Route
            path='/folder/:folderId'
            render={(routerProps) => {
              // console.log('FolderView')
              const filteredNotes = state.notes.filter(note => {
                if (note.folderId === routerProps.match.params.folderId){
                  return true;
                }
              })

              return <HomePage
                folders={state.folders}
                notes={filteredNotes}
                selectFolder={(event) => this.setFolderId(event)}
              />
            }}
          />
          <Route
            path='/note/:noteId'
            render={(routerProps) => {
              console.log(routerProps)
              // console.log(this.state.notes)
              const selectedNote = state.notes.find(note => {
                if(note.id === routerProps.match.params.noteId){
                  return note;
                }
              }) || {}
              // console.log(selectedNote);

              const selectedFolder = state.folders.find(folder => {
                if(folder.id === selectedNote.folderId){
                  return folder;
                }
              }) || {}
              // console.log(selectedFolder);
              
              return <NotePage
                history={routerProps.history}
                folder={selectedFolder}
                note={selectedNote}
              />
            }}
          />
          <Route
            exact
            path='/'
            render={() => {
              // console.log('DefaultView')
              return <HomePage
                folders={this.state.folders}
                notes={this.state.notes}
                selectFolder={(event) => this.setFolderId(event)}
              />
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default App;