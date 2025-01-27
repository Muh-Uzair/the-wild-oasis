import styled from "styled-components";
import { format, isToday } from "date-fns";
import PropTypes from "prop-types";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import useCheckout from "./useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteBooking from "./useDeleteBooking";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

BookingRow.propTypes = {
  booking: PropTypes.object,
};

// COMPONENT START///////////////////////////////////////////////
function BookingRow({ booking }) {
  // STATE & VARIABLES
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();
  const { mutateCheckout, isCheckingOut } = useCheckout();
  const navigate = useNavigate();
  const {
    cabins,
    guests,
    numNights,
    startDate,
    endDate,
    totalPrice,
    status,
    id: bookingId,
  } = booking;
  const { name: cabinName } = cabins;
  const { email, fullName: guestName } = guests;
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  // FUNCTIONS

  // JSX//////////////////////////////////////////
  return (
    <>
      <Table.TableRow>
        <Cabin>{cabinName}</Cabin>

        <Stacked>
          <span>{guestName}</span>
          <span>{email}</span>
        </Stacked>

        <Stacked>
          <span>
            {isToday(new Date(startDate))
              ? "Today"
              : formatDistanceFromNow(startDate)}{" "}
            &rarr; {numNights} night stay
          </span>
          <span>
            {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
            {format(new Date(endDate), "MMM dd yyyy")}
          </span>
        </Stacked>

        <Tag type={statusToTagName[status === null ? "unconfirmed" : status]}>
          {status?.replace("-", " ")}
        </Tag>

        <Amount>{formatCurrency(totalPrice)}</Amount>

        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={bookingId} />
            <Menus.List id={bookingId}>
              <Menus.Button
                icon={<HiEye />}
                onClick={() => navigate(`/bookings/${bookingId}`)}
              >
                See Details
              </Menus.Button>
              {status === "unconfirmed" && (
                <Menus.Button
                  icon={<HiArrowDownOnSquare />}
                  onClick={() => navigate(`/checkin/${bookingId}`)}
                >
                  Check in
                </Menus.Button>
              )}
              {status === "checked-in" && (
                <Menus.Button
                  icon={<HiArrowUpOnSquare />}
                  onClick={() => mutateCheckout(bookingId)}
                  disabled={isCheckingOut}
                >
                  Check out
                </Menus.Button>
              )}

              <Modal.Open opens={"delete"}>
                <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName={"booking"}
              onConfirm={() =>
                deleteBooking(bookingId, {
                  onSuccess: () => {
                    navigate("/bookings");
                  },
                })
              }
              disabled={isDeletingBooking}
            />
          </Modal.Window>
        </Modal>
      </Table.TableRow>
    </>
  );
}

export default BookingRow;
