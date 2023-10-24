"use server";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";


const postHaiku = async (formData: FormData) => {
  const supabase = createRouteHandlerClient({ cookies });

  try {
    const body = String(formData.get("body"));
    const hashtags = String(formData.get("hashtags"));

    const {
      data: { user },
    } = await supabase.auth.getUser();
    
    console.log(user);
    
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

export { postHaiku };
