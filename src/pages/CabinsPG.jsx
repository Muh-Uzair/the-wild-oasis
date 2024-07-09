import { Row } from "../ui/Row";
import { Heading } from "../ui/Heading";
import CabinTable from "../features/cabins/CabinTable";

export default function CabinsPG() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Cabins</Heading>
        <span>Filter/Text</span>
      </Row>

      <Row type="vertical">
        <CabinTable />
      </Row>
    </>
  );
}
