import Image from "next/image";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import endan from "@/app/endan.jpg";

import { Database } from "@/types/supabase";

type Haiku = Database["public"]["Tables"]["haikus"]["Row"];
type Hashtag = Database["public"]["Tables"]["hashtags"]["Row"];

interface HaikuWithHashtags extends Haiku {
  hashtags: Hashtag[];
}

export default function HaikuCard({
  contents,
}: {
  contents: HaikuWithHashtags;
}) {
  return (
    <div className=" flex h-auto flex-auto basis-80 flex-row gap-4 rounded-2xl bg-violet-300 px-8 py-4">
      <div className="relative h-12 w-12">
        <Image
          src={endan}
          alt="..."
          className=" rounded-full"
          height={48}
          width={48}
        ></Image>
      </div>
      <div className="flex  flex-col justify-between">
        <p>@haikoo</p>
        <pre className="mt-2 font-rubik">{contents.body}</pre>
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex gap-1">
            {contents.hashtags.map((item) => (
              <span key={item.id}>{item.hashtag}</span>
            ))}
          </div>
          <div>
            <button className=" border border-yellow-50">
              <AiOutlineHeart size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
