import { Component, createFactory } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-root");

export default class Modal extends Component {
  componentDidMount(){
    window.addEventListener('keydown',e=>{
      if(e.code==='Escape'){
        this.props.onCloseModal()
      }
    })
  }
  HandleOverley=(e)=>{
    if(e.target===e.currentTarget){
      this.props.onCloseModal()
    }
  }
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
