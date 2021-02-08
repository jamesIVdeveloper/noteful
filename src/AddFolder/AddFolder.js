import React, { Component } from "react";
import NotefulForm from "../NotefulForm/NotefulForm";
import PropTypes from "prop-types";
import APIContext from "../APIContext";
import config from "../config";
import "./AddFolder.css";

export default class AddFolder extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  };
  static contextType = APIContext;

  handleSubmit = (e) => {
    e.preventDefault();
    const folder = {
      name: e.target["folder-name"].value,
    };
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(folder),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((e) => Promise.reject(e));
        } else {
          return res.json();
        }
      })
      .then((folder) => {
        this.context.addFolder(folder);
        this.props.history.push(`/folder/${folder.id}`);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  render() {
    return (
      <section className="AddFolder">
        <h2>Create New Folder</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className="field">
            <label htmlFor="folder-name-input">Folder Name</label>
            <input
              type="text"
              id="folder-name-input"
              name="folder-name"
              required
            />
          </div>
          <div className="buttons">
            <button type="submit">Add Folder</button>
          </div>
        </NotefulForm>
      </section>
    );
  }
}

AddFolder.propTypes = {
  history: PropTypes.string,
};
