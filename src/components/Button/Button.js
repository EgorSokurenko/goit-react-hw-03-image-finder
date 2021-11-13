import PropTypes from "prop-types";
import "./Button.css";
export default function Button({ onLoadMore }) {
  return (
    <button onClick={() => onLoadMore()} className="ButtonLoad" type="button">
      Load More
    </button>
  );
}
Button.propTypes = {
  onLoadMore: PropTypes.func,
};
