import React from "react";

export default function BookList(props) {
  return (
    <ul>
      {props.books.map((book) => (
        <li>{book.volumeInfo.title}</li>
      ))}
    </ul>
  );
}
