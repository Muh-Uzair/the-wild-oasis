import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const MainAppLayout = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
`;

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

export default function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <MainAppLayout>
        <Outlet />
      </MainAppLayout>
    </StyledAppLayout>
  );
}
