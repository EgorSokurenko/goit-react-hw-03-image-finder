import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Component } from "react";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery/";



class App extends Component {
  state = {
    search: "",
    
  };
  ChangeSubmit = (text) => {
    this.setState({ search: text });
  };
  render() {
    return (
      <div>
        <Searchbar onSubmit={this.ChangeSubmit} />
        <ImageGallery searchQuery={this.state.search}/>
        <ToastContainer/>
      </div>
    );
  }
}

export default App;
