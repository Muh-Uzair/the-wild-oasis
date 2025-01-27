// import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const ButtonsContainer = styled.div`
  background-color: #ffffff;
  display: flex;
  font-weight: 500;

  padding: 7px;
  border-radius: 5px;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

Filter.propTypes = {
  paramsValue: PropTypes.string,
  buttonsArray: PropTypes.array,
  initialBtnValue: PropTypes.string,
};

export default function Filter({ paramsValue, buttonsArray, initialBtnValue }) {
  // STATE & VARIABLES
  const [searchParams, setSearchParams] = useSearchParams();

  let activeButton = searchParams.get(paramsValue)
    ? searchParams.get(paramsValue)
    : initialBtnValue;

  // FUNCTIONS
  function buttonClick(value) {
    searchParams.set(paramsValue, value);
    if (searchParams.get("currPage")) searchParams.set("currPage", 1);

    setSearchParams(searchParams);

    activeButton = value;
  }

  // JSX//////////////////////////////////////////
  return (
    <ButtonsContainer>
      {buttonsArray?.map((btnObj) => (
        <FilterButton
          active={activeButton === `${btnObj.value}` ? "true" : ""}
          value={`${btnObj.value}`}
          key={`${btnObj.value}`}
          onClick={(e) => buttonClick(e.target.value)}
        >
          {`${btnObj.label}`}
        </FilterButton>
      ))}
    </ButtonsContainer>
  );
}

// 1 : params value : string
// 2 : amount of buttons : array of objects
// 3 : value of button
// 4 : label of button
