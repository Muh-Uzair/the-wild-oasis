import supabase from "./supabase";

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
