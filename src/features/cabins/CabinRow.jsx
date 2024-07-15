import styled from "styled-components";
import PropTypes from "prop-types";
import { formatCurrency } from "../../utils/helpers";
// import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const DivAllBtns = styled.div`
  display: flex;
  gap: 10px;
`;

CabinRow.propTypes = {
  cabin: PropTypes.object,
};

export default function CabinRow({ cabin }) {
  const {
    id: cabinId,
    image,
    name,
    maxCapacity,
    regularPrice,
    discount,
  } = cabin;

  const { deletingStatus, deleteCabin } = useDeleteCabin();

  // deletion step 4 : onClick pe mutate dalo
  // deletion step 5 : step 4 tak deletion kaam krta hai lakin remote state ko ui k sath sync nahi krta us k liye invalidate krna hota hai

  // const [showEditForm, setShowEditForm] = useState(false);

  const { createCabin } = useCreateCabin();
  function handleDuplicateCabin() {
    createCabin({
      name: `Copy of ${name}`,
      image,
      maxCapacity,
      regularPrice,
      discount,
    });
  }

  return (
    <>
      <Table.TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{discount > 0 ? formatCurrency(discount) : "-"}</Discount>
        <DivAllBtns>
          <button onClick={() => handleDuplicateCabin()}>
            <HiSquare2Stack />{" "}
          </button>
          <Modal>
            <Modal.Open opens="edit-form">
              <button>
                <HiPencil />
              </button>
            </Modal.Open>
            <Modal.Window name="edit-form">
              <CreateCabinForm cabin={cabin} />
            </Modal.Window>

            <Modal.Open opens="delete-confirm">
              <button>
                <HiTrash />
              </button>
            </Modal.Open>
            <Modal.Window name="delete-confirm">
              <ConfirmDelete
                resourceName={"cabins"}
                disabled={deletingStatus === "pending"}
                onConfirm={() => deleteCabin(cabinId)}
              />
            </Modal.Window>
          </Modal>
        </DivAllBtns>
      </Table.TableRow>
    </>
  );

  // return (
  //   <>
  //     <TableRow role="row">
  //       <Img src={image} />
  //       <Cabin>{name}</Cabin>
  //       <div>Fits up to {maxCapacity} guests</div>
  //       <Price>{formatCurrency(regularPrice)}</Price>
  //       <Discount>{discount > 0 ? formatCurrency(discount) : "-"}</Discount>
  //       <DivAllBtns>
  //         <button onClick={() => handleDuplicateCabin()}>
  //           <HiSquare2Stack />{" "}
  //         </button>
  //         <button
  //           onClick={() => setShowEditForm((showEditForm) => !showEditForm)}
  //         >
  //           <HiPencil />
  //         </button>
  //         <button onClick={() => deleteCabin(cabinId)} disabled={isDeleting}>
  //           <HiTrash />
  //         </button>
  //       </DivAllBtns>
  //     </TableRow>
  //     {showEditForm && <CreateCabinForm cabin={cabin} />}
  //   </>
  // );
}
