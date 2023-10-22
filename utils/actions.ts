"use server";
import supabase from "./supabase";

const postAnonHaiku = async (formData: FormData) => {
  const body = await String(formData.get("body"));
  const hashtags = await String(formData.get("hashtags"));

  console.log(hashtags)
  const row = {
    author_id: null,
    body,
  };

  const { data, error } = await supabase.from("haikus").insert([row]);

  return "success";
};

export { postAnonHaiku };
