// import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
// import styled from "styled-components";
// import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import CabinRow from "./CabinRow";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

export default function CabinTable() {
  const {
    isLoading,
    data: cabins,
    isError,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  const [searchParams] = useSearchParams();

  // 1 : filter logic
  const filterValue = searchParams.get("discount");
  let filteredCabins = [];
  if (filterValue === "all" || !filterValue) {
    filteredCabins = cabins;
  } else if (filterValue === "no-discount") {
    filteredCabins = cabins?.filter((cabin) => cabin.discount <= 0);
  } else if (filterValue === "with-discount") {
    filteredCabins = cabins?.filter((cabin) => cabin.discount > 0);
  }

  // 2 : sorting logic
  const sortByValue = searchParams.get("sortBy") || "sort-name-asc";
  const [field, ascDscValue] = sortByValue.split("-");

  let sortedCabins = filteredCabins;
  if (ascDscValue === "asc") {
    sortedCabins = filteredCabins?.sort((a, b) => a[field] - b[field]);
  } else if (ascDscValue === "dsc") {
    sortedCabins = filteredCabins?.sort((a, b) => b[field] - a[field]);
  }

  if (isError) return <span>An error occurred</span>;
  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table role="table" columns={"0.6fr 1.8fr 2.2fr 1fr 1fr 1fr"}>
        <Table.TableHeader>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.TableHeader>
        <Table.TableBody
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        ></Table.TableBody>

        {/* {cabins.map()} */}
      </Table>
    </Menus>
  );

  // return (
  //   <Table role="table">
  //     <TableHeader role="row">
  //       <div></div>
  //       <div>Cabin</div>
  //       <div>Capacity</div>
  //       <div>Price</div>
  //       <div>Discount</div>
  //       <div></div>
  //     </TableHeader>
  //     {cabins.map((cabin) => (
  //       <CabinRow cabin={cabin} key={cabin.id} />
  //     ))}
  //   </Table>
  // );
}
