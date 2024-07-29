import supabase, { supabaseUrl } from "./supabase";

export async function apiLogin({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData) return null;

  const { data: currentUserData, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return currentUserData?.user;
}

export async function apiLogout() {
  let x = await supabase.auth.signOut();

  let { error } = x;

  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. Update password OR fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3. Update avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);
  return updatedUser;
}

// avatar url : https://adblcxcghegkjycpllmw.supabase.co/storage/v1/object/public/avatars/AK-105-5.png?t=2024-07-27T10%3A14%3A35.427Z ;
export async function updateCurrUserData({ fullName, avatar, password }) {
  let updateObj;
  if (fullName) updateObj = { data: { fullName } };
  if (password) updateObj = { password };

  const { data: updatedUserData, error: updateError } =
    await supabase.auth.updateUser(updateObj);

  if (updateError) throw new Error(updateError.message);
  if (!avatar) return updatedUserData;

  let uploadImageName = `avatar-${Math.random()}`;

  const { data: storageData, error: storageError } = await supabase.storage
    .from("avatars")
    .upload(uploadImageName, avatar);

  if (storageError) throw new Error(storageError.message);

  const { data: updatedUserData2, error: updateError2 } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${uploadImageName}`,
      },
    });

  if (updateError2) throw new Error();
  return { storageData, updatedUserData2 };
}
