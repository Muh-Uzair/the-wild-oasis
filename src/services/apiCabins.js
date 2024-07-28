import supabase, { supabaseUrl } from "./supabase";

// FUNCTIONS
export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

// deletion step 1 :
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}

// deletion step 2 : policy update kari

export async function createEditCabin(newCabin, id) {
  // if in edit session we provide an image so use that image path else image path will be provided by user
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabinsImages/${imageName}`;

  // to create or edit cabin
  let query = supabase.from("cabins");

  // if id not available then insert new
  if (!id)
    query = query
      .insert([{ ...newCabin, image: imagePath }])
      .select()
      .single();

  // if id available than we need to update only
  if (id)
    query = query
      .update([{ ...newCabin, image: imagePath }])
      .eq("id", id)
      .select();

  const { data, error } = await query;

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be created");
  }

  // 2. upload images
  const { error: storageError } = await supabase.storage
    .from("cabinsImages")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}
