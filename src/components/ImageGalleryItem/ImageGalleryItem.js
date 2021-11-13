import PropTypes from "prop-types";
import "./ImgaeGalleryItem.css";
export default function ImageGalleryItem({ value, onShowModal }) {
  return (
    <li onClick={onShowModal} className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={value.webformatURL}
        alt="img"
        data-src={value.largeImageURL}
      />
    </li>
  );
}
ImageGalleryItem.propTypes = {
  value: PropTypes.object,
  onShowModal: PropTypes.func,
};
