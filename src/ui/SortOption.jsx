import PropTypes from "prop-types";

SortOption.propTypes = {
  value: PropTypes.string,
  keyProp: PropTypes.string,
  label: PropTypes.string,
};

export default function SortOption({ value, keyProp, label }) {
  return (
    <option value={value} key={keyProp}>
      {label}
    </option>
  );
}
