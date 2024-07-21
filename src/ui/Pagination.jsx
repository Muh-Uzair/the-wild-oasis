import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import { TOTAL_RESULTS_ON_PAGE, calculateTotalPages } from "../utils/constants";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

Pagination.propTypes = {
  totalResults: PropTypes.number,
};

export default function Pagination({ totalResults }) {
  // 1 : using useSearchParams
  const [searchParams, setSearchParams] = useSearchParams();

  // 2 : getting curr page number from url if exist , if not then we manually set it to 1
  const currentPage = Number(searchParams.get("currPage"))
    ? Number(searchParams.get("currPage"))
    : 1;

  // 3 : total pageS would be equal to when we divide total results by 10
  const totalPages = calculateTotalPages(totalResults);

  // 4 : logic for moving to prev age
  function movePrevPage() {
    const prevPageNum = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("currPage", prevPageNum);
    setSearchParams(searchParams);
  }

  // 5 : logic for moving to net page
  function moveNextPage() {
    const nextPageNum =
      currentPage === totalPages ? currentPage : currentPage + 1;
    searchParams.set("currPage", nextPageNum);
    setSearchParams(searchParams);
  }

  if (totalPages <= 1) return null;

  return (
    <StyledPagination>
      <P>
        Showing <span>{(currentPage - 1) * TOTAL_RESULTS_ON_PAGE + 1}</span> to{" "}
        <span>
          {currentPage === totalPages
            ? totalResults
            : currentPage * TOTAL_RESULTS_ON_PAGE}
        </span>{" "}
        of <span>{totalResults}</span> results
      </P>

      <Buttons>
        <PaginationButton
          onClick={() => movePrevPage()}
          disabled={currentPage === 1}
        >
          <HiChevronLeft />
          <span>Previous</span>
        </PaginationButton>
        <PaginationButton
          onClick={() => moveNextPage()}
          disabled={currentPage === totalPages}
        >
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}
