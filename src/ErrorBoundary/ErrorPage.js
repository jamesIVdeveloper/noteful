import React from "react";
import PropTypes from "prop-types";

export default class ErrorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="ErrorPage">
          <h2>Something went wrong</h2>
          <p>Refresh the page</p>
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorPage.propTypes = {
  children: PropTypes.element,
};
