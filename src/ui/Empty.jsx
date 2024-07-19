import PropTypes from "prop-types";

Empty.propTypes = {
  message: PropTypes.string.isRequired,
};

export default function Empty({ message }) {
  return <span>{message}</span>;
}
