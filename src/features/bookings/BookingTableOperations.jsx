import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import styled from "styled-components";
// import TableOperations from "../../ui/TableOperations";

const StyledTableOperations = styled.div`
  display: flex;
  gap: 10px;
`;

function BookingTableOperations() {
  return (
    <StyledTableOperations>
      <Filter
        paramsValue="status"
        buttonsArray={[
          { value: "all", label: "All" },
          { value: "checked-out", label: "Checked out" },
          { value: "checked-in", label: "Checked in" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
        initialBtnValue={"all"}
      />

      <SortBy
        selectOptions={[
          { value: "startDate-desc", label: "Sort by date (recent first)" },
          { value: "startDate-asc", label: "Sort by date (earlier first)" },
          {
            value: "totalPrice-desc",
            label: "Sort by amount (high first)",
          },
          { value: "totalPrice-asc", label: "Sort by amount (low first)" },
        ]}
        initialValue="startDate-desc"
      />
    </StyledTableOperations>
  );
}

export default BookingTableOperations;
