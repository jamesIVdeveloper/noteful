import React from "react";

export default function Search(props) {
  return (
    <div className="search">
      <form onSubmit={props.handleSubmit}>
        <input
          type="text"
          value={props.query}
          placeholder="Book Search"
          aria-label="Book Search Query"
          onChange={(e) => props.handleChange("query", e.target.value)}
        />
        <p>
          <label htmlFor="printType">Print Type:</label>
          <select
            id="printType"
            value={props.printType}
            onChange={(e) => props.handleChange("printType", e.target.value)}
          >
            <option value="all">All</option>
            <option value="books">Books</option>
            <option value="magazines">Magazines</option>
          </select>
        </p>

        <p>
          <label htmlFor="filter">Filter:</label>
          <select
            id="filter"
            value={props.filter}
            onChange={(e) => props.handleChange("filter", e.target.value)}
          >
            <option value="select">None</option>
            <option value="ebooks">eBooks</option>
            <option value="free-ebooks">Free eBooks</option>
            <option value="full">Full</option>
            <option value="paid-ebooks">Paid eBooks</option>
            <option value="partial">Partial</option>
          </select>
        </p>

        <p>
          <input type="submit" value="Go" />
        </p>
      </form>
    </div>
  );
}
