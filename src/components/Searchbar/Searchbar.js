import { useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import "./Searchbar.css";
import { AiOutlineSearch } from "react-icons/all";

export default function Searchbar ({onSubmit}) {
  const [search, setSearch]=useState('')
  const HandleNameChange = (e) => {
    setSearch(e.target.value)
  };
  const HandleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() === "") {
      toast.error("Entry something pls :)", {});
    }
    onSubmit(search);
    setSearch('')
  };
    return (
      <header className="Searchbar">
        <form onSubmit={HandleSubmit} className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <AiOutlineSearch fill="black" />
          </button>

          <input
            onChange={HandleNameChange}
            value={search}
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
Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
