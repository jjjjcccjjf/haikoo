"use server";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const postHaiku = async (formData: FormData) => {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const body = String(formData.get("body"));
    const hashtags = String(formData.get("hashtags"));

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Insert into the 'haikus' table
    const haikusInsert = await supabase
      .from("haikus")
      .insert([
        {
          author_id: user?.id,
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
          .upsert([
            {
              haiku_id: haikusInsert.data.id,
              hashtag: hashtag,
            },
          ])
          .select()
          .single();

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

const updateProfile = async (formData: FormData) => {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const username = String(formData.get("username"));
    const status = String(formData.get("status"));

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("profiles")
      .update({ username, status })
      .eq("id", user?.id);

    return "success";
  } catch (error) {
    console.error("Error:", error);
    return "error";
  }
};

export { postHaiku, updateProfile };
