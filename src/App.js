import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery/";



function App () {
  const [search, setSearch] = useState('')
  const ChangeSubmit = (text) => {
    setSearch(text)
  };
    return (
      <div>
        <Searchbar onSubmit={ChangeSubmit} />
        <ImageGallery searchQuery={search}/>
        <ToastContainer/>
      </div>
    );
}

export default App;
