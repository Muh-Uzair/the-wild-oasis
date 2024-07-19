import styled from "styled-components";
import PropTypes from "prop-types";
import SortOption from "./SortOption";
import { useSearchParams } from "react-router-dom";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

SortBy.propTypes = {
  selectOptions: PropTypes.array,
  props: PropTypes.object,
  initialValue: PropTypes.string,
};

export default function SortBy({ selectOptions, initialValue, ...props }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedOptionValue = searchParams.get("sortBy") || initialValue;

  function optionChanged(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <StyledSelect
      {...props}
      onChange={(e) => optionChanged(e)}
      value={selectedOptionValue}
    >
      {selectOptions.map((option) => (
        <SortOption
          value={option.value}
          key={option.value}
          label={option.label}
        />
      ))}
    </StyledSelect>
  );
}
