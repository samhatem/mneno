import { Editor, EditorState, convertToRaw } from 'draft-js'
import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import api from '../../orbit-manager'

export default class MyEditor extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty(),
      title: '',
      author: '',
      cost: 0,
      classes: {}
    }
    this.handleChange = (editorState) => this.setState({ editorState })
    this.setEditor = (editor) => {
      this.editor = editor
    }
    this.handleFocus = () => {
      if (this.editor) {
        this.editor.focus()
      }
    }
    this.handleUpload = () => {
      const { editorState, title, author, cost } = this.state
      const intCost = parseInt(cost)
      const curContent = editorState.getCurrentContent()
      api.createPost(JSON.stringify(convertToRaw(curContent)), {
        title,
        author,
        cost: intCost
      })
    }
    this.handleTitle = (e) => {
      this.setState({ title: e.target.value })
    }
    this.handleAuthor = (e) => this.setState({ author: e.target.value })
    this.handleCost = (e) => {
      this.setState({ cost: e.target.value })
    }
  }

  componentDidMount () {
    this.handleFocus()
  }

  render () {
    return (
      <div style={styles.container}>
        <TextField style={styles.textBox} label='title' value={this.state.title} onChange={this.handleTitle} />
        <TextField style={styles.textBox} label='author' value={this.state.author} onChange={this.handleAuthor} />
        <TextField style={styles.textBox} label='cost (EOS)' value={this.state.cost} onChange={this.handleCost} />
        <div style={styles.editor} onClick={this.handleFocus}>
          <Editor
            ref={this.setEditor}
            editorState={this.state.editorState}
            onChange={this.handleChange}
          />
        </div>
        <Button onClick={this.handleUpload}>Upload</Button>
      </div>
    )
  }
}

const styles = {
  editor: {
    border: '1px solid gray',
    minHeight: '14em'
  },
  container: {
    margin: '50px'
  },
  textBox: {
    margin: '20px'
  }
}
