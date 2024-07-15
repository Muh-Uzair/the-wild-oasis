import { Row } from "../ui/Row";
import { Heading } from "../ui/Heading";
import CabinTable from "../features/cabins/CabinTable";
import styled from "styled-components";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default function CabinsPG() {
  // const [showForm, setShowForm] = useState(false);
  return (
    <Div>
      <Row type="horizontal">
        <Heading as="h1">All Cabins</Heading>
        <CabinTableOperations
          paramsValue={"discount"}
          buttonsArray={[
            { value: "all", label: "All" },
            { value: "no-discount", label: "No Discount" },
            { value: "with-discount", label: "With Discount" },
          ]}
          initialBtnValue="all"
        />
      </Row>

      <Row type="vertical">
        <CabinTable />
      </Row>
      <AddCabin />
    </Div>
  );
}
