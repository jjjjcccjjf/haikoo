"use server";
import supabase from "./supabase";
import { Database } from "@/types/supabase";

type Haiku = Database["public"]["Tables"]["haikus"]["Row"];
type Hashtag = Database["public"]["Tables"]["hashtags"]["Row"];

const postAnonHaiku = async (formData: FormData) => {
  try {
    const body = String(formData.get("body"));
    const hashtags = String(formData.get("hashtags"));

    // Insert into the 'haikus' table
    const haikusInsert = await supabase
      .from("haikus")
      .insert([
        {
          author_id: null,
          body,
        },
      ])
      .select()
      .single();

    // console.log(haikusInsert);

    if (haikusInsert.error) {
      throw haikusInsert.error;
    }

    // Extract hashtags from the 'hashtags' field and split them
    const hashtagArray = hashtags.split(" ");

    // Loop through the hashtags and insert them into the 'hashtags' table
    for (const hashtag of hashtagArray) {
      if (hashtag) {
        const hashtagsInsert = await supabase
          .from("hashtags")
          .upsert(
            [
              {
                haiku_id: haikusInsert.data.id,
                hashtag: hashtag,
              },
            ]
          )
          .select()
          .single();

        // console.log(hashtagsInsert);

        if (hashtagsInsert.error) {
          throw hashtagsInsert.error;
        }
      }
    }

    return "success";
  } catch (error) {
    console.error("Error:", error);
    return "error";
  }
};

export { postAnonHaiku };
