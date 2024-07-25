import PropTypes from "prop-types";
import { useGetCurrentUser } from "../features/authentication/useGetCurrentUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-50);
`;

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
// COMPONENT START///////////////////////////////////////////////
export default function ProtectedRoute({ children }) {
  // STATE & VARIABLES

  const navigate = useNavigate();
  const { isLoadingUserData, isAuthenticated } = useGetCurrentUser();

  // FUNCTIONS
  useEffect(() => {
    if (!isAuthenticated && !isLoadingUserData) navigate("/login");
  }, [isAuthenticated, isLoadingUserData, navigate]);

  // JSX//////////////////////////////////////////
  if (isLoadingUserData)
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );

  if (isAuthenticated) return children;
  // JSX//////////////////////////////////////////
}
// COMPONENT END/////////////////////////////////////////////////
