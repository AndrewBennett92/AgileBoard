import React, { Component } from "react";
import Avatar from "./Avatar";
import PropTypes from "prop-types";

export class Header extends Component {
  render() {
    return (
      <header style={headerStyle}>
        <div className="d-flex p-2 flex-row">
          <h1 className="mr-auto">Kanban Board</h1>
          <div className="d-flex align-items-end pe-4">
            <div style={{ color: "#fff" }} className="p-2 bd-highlight">
              Welcome, {this.props.name}
            </div>
            <Avatar />
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string
};

const headerStyle = {
  backgroundColor: "#304d6d",
  boxShadow: "0 4px 2px -2px gray",
  color: "white",
  padding: "0px 15px"
};

export default Header;
