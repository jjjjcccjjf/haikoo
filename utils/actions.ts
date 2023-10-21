"use server";
import supabase from "./supabase";

// const postHaiku = async (formData: FormData) => {
// const body = await String(formData.get("body"));
// const author_id = user.id;
// const row = {
//   author_id,
//   body,
// };
// supabase.from("haikus").insert([row]);
// };

const postAnonHaiku = async (formData: FormData) => {
  const body = await String(formData.get("body"));

  const row = {
    author_id: null,
    body,
  };

  const { data, error } = await supabase.from("haikus").insert([row]);

  return "success";
};

export { postAnonHaiku };
