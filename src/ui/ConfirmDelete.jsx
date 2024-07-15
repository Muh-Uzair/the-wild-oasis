import styled from "styled-components";
import { Button } from "../ui/Button";
import { Heading } from "../ui/Heading";
import PropTypes from "prop-types";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 20px;
  background-color: white;
  border-radius: 8px;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

ConfirmDelete.propTypes = {
  resourceName: PropTypes.string,
  disabled: PropTypes.bool,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func,
};

function ConfirmDelete({ resourceName, disabled, onConfirm, onClose }) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Delete {resourceName}</Heading>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div>
        <Button variation="secondary" disabled={disabled} onClick={onClose}>
          Cancel
        </Button>
        <Button variation="danger" disabled={disabled} onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
