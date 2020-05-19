import React, { Component } from 'react'

export class NoteError extends Component {
  static getDerivedStateFromError(error) {
    return { hasError: true};
  }
  
  constructor(props){
    super(props);
    this.state = {
      hasError: false
    }
  }

  
  render() {
    if(this.state.hasError) {
      return(
        <li key={this.props.key}>
          <h2>
            Could not display this note
          </h2>
        </li>
      )
    }
    return this.props.children;
  }
}

export default NoteError
