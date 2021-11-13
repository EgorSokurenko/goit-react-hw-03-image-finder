import { Component } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import "./Searchbar.css";
import { AiOutlineSearch } from "react-icons/all";

export default class Searchbar extends Component {
  state = {
    search: "",
  };
  HandleNameChange = (e) => {
    this.setState({ search: e.target.value });
  };
  HandleSubmit = (e) => {
    e.preventDefault();
    if (this.state.search.trim() === "") {
      toast.error("Entry something pls :)", {});
    }
    this.props.onSubmit(this.state.search);
    this.setState({ search: "" });
  };
  render() {
    return (
      <header className="Searchbar">
        <form onSubmit={this.HandleSubmit} className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <AiOutlineSearch fill="black" />
          </button>

          <input
            onChange={this.HandleNameChange}
            value={this.state.search}
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
