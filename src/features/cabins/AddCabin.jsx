// import { useState } from "react";
// import { Button } from "../../ui/Button";
import { Button } from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
// import { HiXMark } from "react-icons/hi2"

export default function AddCabin() {
  // const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div>
      <Modal>
        <Modal.Open>
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window>
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
