import { useEffect, createFactory } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import "./Modal.css";
const modalRoot = document.querySelector("#modal-root");

export default function Modal ({onCloseModal,link}) {
  useEffect(()=>{
    document.querySelector('body').classList.add('modal-open')
    window.addEventListener("keydown", HandelKeyDown);
    return ()=>{
      document.querySelector('body').classList.remove('modal-open')
    window.removeEventListener("keydown", HandelKeyDown);
    }
  },[])
  
  const HandelKeyDown = (e) => {
    if (e.code === "Escape") {
      onCloseModal();
    }
  };
  const HandleOverley = (e) => {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  };
    return createPortal(
      <div className="Overlay" onClick={HandleOverley}>
        <div className="Modal">
          <img src={link} alt="img" />
        </div>
      </div>,
      modalRoot
    );
}
Modal.propTypes = {
  onCloseModal: PropTypes.func,
  link: PropTypes.string,
};
