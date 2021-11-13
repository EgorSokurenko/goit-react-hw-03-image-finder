import { Component } from "react";
import { toast } from 'react-toastify';
export default class Searchbar extends Component {
    state={
        search: ''
    }
    HandleNameChange= e=>{
        this.setState({search:e.target.value})
    }
    HandleSubmit = e=>{
        e.preventDefault()
        if(this.state.search.trim()===''){
          toast.error('Entry something pls :)', {});
        }
        this.props.onSubmit(this.state.search)
        this.setState({search:''})
    }
  render() {
    return (
      <header className="Searchbar">
        <form onSubmit={this.HandleSubmit} className="Form">
          <button type="submit" className="Button">
            <span className="SearchForm-input">Search</span>
          </button>

          <input
            onChange={this.HandleNameChange}
            value={this.state.search}
            className="Input"
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
