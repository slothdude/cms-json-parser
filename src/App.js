// altered from https://gist.github.com/AshikNesin/e44b1950f6a24cfcd85330ffc1713513
// and https://codeburst.io/asynchronous-file-upload-with-node-and-react-ea2ed47306dd

import React from 'react'
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      file: null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }
  onFormSubmit(e){
    e.preventDefault(); // Stop form submit
    this.fileUpload(this.state.file);
  }
  onChange(e) {
    this.setState({file:e.target.files[0]})
  }
  fileUpload(file){
    let data = new FormData();
    data.set('file', file);
    axios.post(`http://localhost:4000/api/parse`, data)
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
        <input name = "input" type="file" onChange={this.onChange} />
        <button type="submit">Upload</button>
      </form>
   )
  }
}

export default App
