import styled from "styled-components";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

const StyledTableOperations = styled.div`
  display: flex;
  gap: 10px;
`;

export default function CabinTableOperations() {
  return (
    <StyledTableOperations>
      <Filter
        paramsValue={"discount"}
        buttonsArray={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No Discount" },
          { value: "with-discount", label: "With Discount" },
        ]}
        initialBtnValue="all"
      />
      <SortBy
        selectOptions={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-dsc", label: "Sort by name (Z-A)" },
          {
            value: "regularPrice-asc",
            label: "Sort by price (low first)",
          },
          {
            value: "regularPrice-dsc",
            label: "Sort by price (high first)",
          },
          {
            value: "maxCapacity-asc",
            label: "Sort by capacity (low first)",
          },
          {
            value: "maxCapacity-dsc",
            label: "Sort by capacity (high first)",
          },
        ]}
        initialValue="name-asc"
        type="white"
      />
    </StyledTableOperations>
  );
}
