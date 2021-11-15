import PropTypes from "prop-types";
import "./ImgaeGalleryItem.css";
export default function ImageGalleryItem({ value, onShowModal }) {
  return (
    <li
      onClick={() => onShowModal(value.largeImageURL)}
      className="ImageGalleryItem"
    >
      <img
        className="ImageGalleryItem-image"
        src={value.webformatURL}
        alt="img"
      />
    </li>
  );
}
ImageGalleryItem.propTypes = {
  value: PropTypes.object,
  onShowModal: PropTypes.func,
};
