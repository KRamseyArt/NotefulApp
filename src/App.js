import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import HomePage from './components/HomePage';
import './App.css';

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
    console.log(selectedFolder);
    this.setState({
      selectedFolder
    })
  }
  
  render() {
    // console.log(this.state);
    const state = this.state;

    return (
      <div className="App">
        <header className="Header">
          <Link to='/'>Noteful</Link>
        </header>
        <Switch>
          <Route
            path='/folder/:folderId'
            render={() => {
              const filteredNotes = state.notes.filter(note => {
                if (note.folderId === state.folderId){
                  return note;
                }
              })
              console.log(filteredNotes);

              return <HomePage
                folders={state.folders}
                notes={filteredNotes}
                selectFolder={(event) => this.setFolderId(event)}
              />
            }}
          />
          <Route
            exact
            path='/'
            render={() => {
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
