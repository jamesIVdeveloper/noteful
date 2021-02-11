import React, { Component } from "react";
import NotefulForm from "../NotefulForm/NotefulForm";
import ValidationError from "../ValidationError/ValidationError";
import PropTypes from "prop-types";
import APIContext from "../APIContext";
import config from "../config";
import "./AddNote.css";

export default class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: "",
        touched: false,
      },
      content: {
        value: "",
      },
      folderId: {
        value: "",
      },
    };
  }

  static defaultProps = {
    history: {
      push: () => {},
    },
  };
  static contextType = APIContext;

  updateName(name) {
    this.setState({ name: { value: name, touched: true } });
  }

  updateContent(content) {
    this.setState({ content: { value: content } });
  }

  updateFolderId(folderId) {
    this.setState({ folderId: { value: folderId } });
  }

  validateName() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return "Name is required";
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, content, folderId } = this.state;
    const newNote = {
      name: name.value,
      content: content.value,
      folderId: folderId.value,
      modified: new Date(),
    };
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newNote),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((e) => Promise.reject(e));
        } else {
          return res.json();
        }
      })
      .then((note) => {
        this.context.addNote(note);
        this.props.history.push(`/folder/${note.folderId}`);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  render() {
    const { folders = [] } = this.context;
    const nameError = this.validateName();

    return (
      <section className="AddNote">
        <h2>Create a New Note</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className="field">
            <label htmlFor="note-name-input">Name</label>
            <input
              type="text"
              id="note-name-input"
              name="note-name"
              onChange={(e) => this.updateName(e.target.value)}
            />
            <p className="error">
              {this.state.name.touched && (
                <ValidationError message={nameError} />
              )}
            </p>
          </div>
          <div className="field">
            <label htmlFor="note-content-input">Content</label>
            <textarea
              id="note-content-input"
              name="note-content"
              onChange={(e) => this.updateContent(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="note-folder-select">Folder</label>
            <select
              id="note-folder-select"
              name="note-folder-id"
              onChange={(e) => this.updateFolderId(e.target.value)}
              required
            >
              <option value="" disabled selected>
                ...
              </option>
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>
          <div className="buttons">
            <button
              type="submit"
              id="add-note-button"
              disabled={this.validateName()}
            >
              Add Note
            </button>
          </div>
        </NotefulForm>
      </section>
    );
  }
}

AddNote.propTypes = {
  history: PropTypes.object.isRequired,
};
