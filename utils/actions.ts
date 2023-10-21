"use server";
import supabase from "./supabase";

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
