import { Row } from "../ui/Row";
import { Heading } from "../ui/Heading";
import CabinTable from "../features/cabins/CabinTable";
import styled from "styled-components";
import { Button } from "../ui/Button";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default function CabinsPG() {
  const [showForm, setShowForm] = useState(false);
  return (
    <Div>
      <Row type="horizontal">
        <Heading as="h1">All Cabins</Heading>
        <span>Filter/Text</span>
      </Row>

      <Row type="vertical">
        <CabinTable />
      </Row>

      <Button onClick={() => setShowForm((showForm) => !showForm)}>
        Add new cabin
      </Button>
      {showForm && <CreateCabinForm />}
    </Div>
  );
}
