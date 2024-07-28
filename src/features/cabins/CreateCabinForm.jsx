import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

import { Input } from "../../ui/Input";
import Form from "../../ui/Form";
import { Button } from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import useCreateCabin from "./useCreateCabin";
import useUpdateCabin from "./useUpdateCabin";

CreateCabinForm.propTypes = {
  cabin: PropTypes.object,
  onClose: PropTypes.func,
};

// COMPONENT START///////////////////////////////////////////////
function CreateCabinForm({ cabin = {}, onClose }) {
  // STATE & VARIABLES
  // taking value out of cabin that is received for editing and also ensuring
  // by using boolean function that wether the cabin received is for editing or not
  const { id: editId, ...editValues } = cabin;
  const isFormEdit = Boolean(editId);

  // if cabin is received for editing than we we use values of that cabin else put new
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isFormEdit ? editValues : {},
  });
  const { errors } = formState;

  const { createCabin, creatingStatus } = useCreateCabin();
  const { editCabin, editingStatus } = useUpdateCabin();
  const isUploadingData =
    creatingStatus === "pending" || editingStatus === "pending";

  // FUNCTIONS
  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isFormEdit) {
      editCabin(
        { newCabin: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onClose?.();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onClose?.();
          },
        }
      );
    }
  }
  function onError() {
    //console.log(errors);
  }

  // JSX//////////////////////////////////////////
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
          disabled={isUploadingData}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          disabled={isUploadingData}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
            max: {
              value: 10,
              message: "Capacity should be less than 10",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          disabled={isUploadingData}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price should be greater than 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          disabled={isUploadingData}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isFormEdit ? false : "This filed is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => onClose?.()}>
          Cancel
        </Button>
        <Button disabled={isUploadingData}>
          {isFormEdit ? "Edit cabin" : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
