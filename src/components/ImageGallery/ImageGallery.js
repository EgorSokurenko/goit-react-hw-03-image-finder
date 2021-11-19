import ImgApi from "../../api/searchApi";
import { toast } from "react-toastify";
import { useState, useEffect, useRef } from "react";
import Loader from "react-loader-spinner";
import ImageGalleryItem from "../ImageGalleryItem";
import Button from "../Button/";
import Modal from "../Modal/";
import { Link, animateScroll as scroll } from "react-scroll";
import PropTypes from "prop-types";
import "./ImageGallery.css";
import { IoEllipseSharp } from "react-icons/io5";

const Status = {
  IDLE:'idle',
  PENDING:'pending',
  RESOLVED:'resolved',
  REJECTED:'rejected',
}
const imgApi = new ImgApi();
export default function ImageGallery ({searchQuery}) {
  const [status, setStatus] = useState(Status.IDLE)
  const [values, setValues] = useState('')
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [modal, setShowModal] = useState(false)
  const [urlModal, setUrlModal] = useState('')
  const search = useRef(null)
  useEffect(()=>{
    
    if(!searchQuery){
      return
    }
    if(searchQuery!==search.current){
      setValues([])
      setPage(1)
      setStatus(Status.PENDING)
      loadImage(searchQuery,1)
    }else{
      setUrlModal('')
      setStatus(Status.PENDING)
      loadImage(searchQuery, page);
    }
    search.current = searchQuery
    
  },[searchQuery, page])
  const loadImage = (nextSearch, page) => {
    setTimeout(() => {
      imgApi
        .fetchImg(nextSearch, page)
        .then((res) => {
          if (res.data.hits.length) {
            console.log(page);
            return res.data.hits;
          }
          return Promise.reject(new Error(`Nothing find to ${nextSearch}`));
        })
        .then((result) =>{
          if(page!==1){
            setValues(s=>[...s,...result])
            setStatus(Status.RESOLVED)
          }else{
            setValues(result)
            setStatus(Status.RESOLVED)
          }
          
        }
        )
        .catch((error) => {
          setError(error) 
          setStatus(Status.REJECTED)});
    }, 1000);
  };
  const loadMore = () => {
    setPage(s=>s+1)
  };
  const showModal = (src) => {
    setShowModal(!modal)
    setUrlModal(src)
  };
  const onCloseModal = () => {
    setShowModal(false)
  };
  
    if (status === Status.IDLE) {
      return <ul></ul>;
    }
    
    if (status === Status.REJECTED) {
      return <h2 className="message">Ops... {error.message} :(</h2>;
    }
    if (status === Status.RESOLVED||status === Status.PENDING) {
      return (
        <div>
          <ul className="ImageGallery"  >
            {values.map((value, index) => {
              return (
                <ImageGalleryItem
                  onShowModal={showModal}
                  key={index}
                  value={value}
                />
              );
              
            })}
            
          </ul>
          {status===Status.PENDING?<Loader className="spiner" type="Oval" color="black" />:values.length >= 12 && (
            <div className="center" to='gallery'>
              <Button onLoadMore={loadMore} message={"Load more"} />
            </div>
          )}
          {urlModal===''&& values.length >= 24 && scroll.scrollMore(400)}
          <Link
            activeClass=""
            to="gallery"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          />
          {modal && (
            <Modal link={urlModal} onCloseModal={onCloseModal} />
          )}
        </div>
      );
    }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string,
};
