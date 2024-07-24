import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import { Row } from "../../ui/Row";
import { Heading } from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import { Button } from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useGetBookingDetail from "./useGetBookingDetail";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import useCheckout from "./useCheckout";
import useDeleteBooking from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// COMPONENT START///////////////////////////////////////////////
function BookingDetail() {
  // STATE & VARIABLES
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();
  const { mutateCheckout, isCheckingOut } = useCheckout();
  const navigate = useNavigate();

  // status tags checked in etc
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  // getting booking data from custom hook
  const { bookingData = {}, isLoading, isError } = useGetBookingDetail();
  const { status, id: bookingId } = bookingData;

  // FUNCTIONS
  const moveBack = useMoveBack();

  // JSX//////////////////////////////////////////
  if (isLoading && !isError) return <Spinner />;

  if (bookingData) {
    return (
      <StyledDiv>
        <Row type="horizontal">
          <HeadingGroup>
            <Heading as="h1">Booking #{bookingId}</Heading>
            <Tag type={statusToTagName[status]}>
              {status?.replace("-", " ")}
            </Tag>
          </HeadingGroup>
          <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
        </Row>

        <BookingDataBox bookingData={bookingData} />

        <ButtonGroup>
          <Button
            variation="danger"
            onClick={() => deleteBooking(bookingId)}
            disabled={isDeletingBooking}
          >
            Delete Booking
          </Button>
          {status === "checked-in" && (
            <Button
              icon={<HiArrowUpOnSquare />}
              onClick={() => mutateCheckout(bookingId)}
              disabled={isCheckingOut}
            >
              Check out
            </Button>
          )}
          {status === "unconfirmed" && (
            <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
              Check in
            </Button>
          )}

          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>
      </StyledDiv>
    );
  }
  // JSX//////////////////////////////////////////
}
// COMPONENT END/////////////////////////////////////////////////

export default BookingDetail;
