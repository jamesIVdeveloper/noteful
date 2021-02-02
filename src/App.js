import React from "react";
import Search from "./Search/Search";
import BookList from "./BooksList/BooksList";

export default class App extends React.Component {
  state = {
    books: [],
    query: "",
    printType: "all",
    filter: "",
  };

  searchBooks = () => {
    let url = `https://www.googleapis.com/books/v1/volumes?q=${this.state.query}&printType=${this.state.printType}`;

    if (this.state.filter !== "") {
      url += `&filter=${this.state.filter}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((res) => this.setState({ books: res.items ? res.items : [] }));
    console.log("searching...");
  };

  handleChange = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.searchBooks();
  };

  componentDidMount() {
    this.searchBooks();
  }

  render() {
    return (
      <div className="App">
        <h1>Google Book Search</h1>
        <Search
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <p>We found {this.state.books.length} results.</p>
        <BookList books={this.state.books} />
      </div>
    );
  }
}
