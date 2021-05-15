import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Upload file</h1>
        <form action="/api/generate" method="post" encType="multipart/form-data">
          <label>Файл</label><br />
          <input type="file" name="filedata" /><br /><br />
          <input type="submit" defaultvalue="Send" />
        </form>
      </div>

    )
  }
}