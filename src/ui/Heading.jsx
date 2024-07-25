import styled, { css } from "styled-components";

export const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      color: var(--color-grey-700);
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      color: var(--color-grey-700);
    `}

    ${(props) =>
    props.type === "h3" &&
    css`
      color: var(--color-grey-700);
    `}

    ${(props) =>
    props.as === "h4" &&
    css`
      color: var(--color-grey-700);
      font-size: 30px;
      font-weight: 600;
      text-align: center;
    `}
`;
