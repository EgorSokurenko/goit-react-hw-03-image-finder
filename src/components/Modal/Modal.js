import { Component, createFactory } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import "./Modal.css";
const modalRoot = document.querySelector("#modal-root");

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.HandelKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.HandelKeyDown);
  }
  HandelKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onCloseModal();
    }
  };
  HandleOverley = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onCloseModal();
    }
  };
  render() {
    return createPortal(
      <div class="Overlay" onClick={this.HandleOverley}>
        <div class="Modal">
          <img src={this.props.link} alt="img" />
        </div>
      </div>,
      modalRoot
    );
  }
}
Modal.propTypes = {
  onCloseModal: PropTypes.func,
  link: PropTypes.string,
};
