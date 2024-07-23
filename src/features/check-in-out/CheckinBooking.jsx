import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import { Row } from "../../ui/Row";
import { Heading } from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import { Button } from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useGetBookingDetail from "../bookings/useGetBookingDetail";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import useConfirmCheckin from "../bookings/useConfirmCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// COMPONENT START///////////////////////////////////////////////
function CheckinBooking() {
  // STATE & VARIABLES
  const { bookingData = {}, isLoading, isError } = useGetBookingDetail();
  console.log(bookingData);
  const {
    id: bookingId,
    guests: guestData = {},
    totalPrice,
    numNights,
    numGuests,
  } = bookingData;
  const { fullName: guestFullName } = guestData;
  const [confirmCheckIn, setConfirmCheckIn] = useState("");
  const { mutateCheckin, isCheckingIn } = useConfirmCheckin();
  const [addBreakfast, setAddBreakfast] = useState("");
  const { settingsData } = useSettings();
  console.log(settingsData);
  const optionalBreakFastPrice =
    settingsData?.breakfastPrice * numNights * numGuests;
  // FUNCTIONS
  function handleCheckin() {
    mutateCheckin(bookingId);
  }

  const moveBack = useMoveBack();

  useEffect(() => {
    setConfirmCheckIn(bookingData?.isPaid ?? false);
  }, [bookingData.isPaid]);
  // console.log(bookingData);

  // JSX//////////////////////////////////////////
  if (isLoading && !isError) return <Spinner />;

  if (bookingData && Object.keys(bookingData).length > 0) {
    return (
      <StyledDiv>
        <Row type="horizontal">
          <Heading as="h1">Check in booking #{bookingId}</Heading>
          <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
        </Row>
        <BookingDataBox bookingData={bookingData} />

        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((prev) => !prev);
              setConfirmCheckIn(false);
            }}
          >
            {" "}
            Want to add breakfast for {formatCurrency(optionalBreakFastPrice)}?
          </Checkbox>
        </Box>

        <Box>
          <Checkbox
            checked={confirmCheckIn}
            onChange={() => setConfirmCheckIn((prev) => !prev)}
            id="checkin"
            disabled={confirmCheckIn || isCheckingIn}
          >
            I confirm that {guestFullName} has paid the total amount of{" "}
            {formatCurrency(totalPrice)}
          </Checkbox>
        </Box>

        <ButtonGroup>
          <Button
            disabled={!confirmCheckIn || isCheckingIn}
            onClick={handleCheckin}
          >
            Check in booking #{bookingId}
          </Button>
          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>
      </StyledDiv>
    );
  }
}

export default CheckinBooking;
