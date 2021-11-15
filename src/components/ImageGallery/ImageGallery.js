import ImgApi from "../../api/searchApi";
import { toast } from "react-toastify";
import { Component } from "react";
import Loader from "react-loader-spinner";
import ImageGalleryItem from "../ImageGalleryItem";
import Button from "../Button/";
import Modal from "../Modal/";
import { Link, animateScroll as scroll } from "react-scroll";
import PropTypes from "prop-types";
import "./ImageGallery.css";

const imgApi = new ImgApi();
export default class ImageGallery extends Component {
  state = {
    status: "idle",
    values: "",
    error: "",
    page: 1,
    showModal: false,
    urlModal: "",
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevProps.searchQuery;
    const nextSearch = this.props.searchQuery;
    const { page } = this.state;

    if (prevSearch !== nextSearch) {
      this.setState({ status: "pending", page: 1 });
      this.loadImage(nextSearch, 1);
    }
    if (prevState.page !== this.state.page) {
      this.setState({ status: "pending" });
      this.loadImage(nextSearch, page);
    }
  }
  loadImage = (nextSearch, page) => {
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
        .then((result) =>
          this.setState((prevState) => {
            if (page !== 1) {
              return {
                values: [...prevState.values, ...result],
                status: "resolved",
              };
            }
            return {
              values: [...result],
              status: "resolved",
            };
          })
        )
        .catch((error) => this.setState({ error, status: "rejected" }));
    }, 1000);
  };
  loadMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };
  showModal = (src) => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
    }));
    this.setState({ urlModal: src });
  };
  onCloseModal = () => {
    this.setState({
      showModal: false,
    });
  };
  render() {
    const { status, values, error, urlModal } = this.state;
    if (status === "idle") {
      return <ul className="gallery"></ul>;
    }
    if (status === "pending") {
      return (
        <div>
          {values && (
            <ul className="ImageGallery ">
              {values.map((value, index) => {
                return <ImageGalleryItem key={index} value={value} />;
              })}
            </ul>
          )}
          <Loader className="spiner" type="Oval" color="black" />
        </div>
      );
    }
    if (status === "rejected") {
      return <h2 className="message">Ops... {error.message} :(</h2>;
    }
    if (status === "resolved") {
      return (
        <div>
          <ul className="ImageGallery ">
            {values.map((value, index) => {
              return (
                <ImageGalleryItem
                  onShowModal={this.showModal}
                  key={index}
                  value={value}
                />
              );
            })}
          </ul>

          {values.length >= 12 && (
            <div className="center">
              <Button onLoadMore={this.loadMore} message={"Load more"} />
            </div>
          )}
          {values.length >= 24 && scroll.scrollToBottom()}
          <Link
            activeClass=""
            to="gallery"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          ></Link>
          {this.state.showModal && (
            <Modal link={urlModal} onCloseModal={this.onCloseModal} />
          )}
        </div>
      );
    }
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string,
};
