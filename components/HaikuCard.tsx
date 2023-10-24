import endan from "@/app/endan.jpg";
import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai";

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
    <div className=" flex h-auto flex-auto basis-80 flex-row gap-4 px-4 py-4 md:rounded-2xl md:bg-orange-100 xl:max-h-52">
      <div className="relative h-12 w-12">
        <Image
          src={endan}
          alt="..."
          className=" rounded-full"
          height={48}
          width={48}
        ></Image>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-bold">@haikoo</p>
        <pre className=" font-rubik">{contents.body}</pre>
        <div className="mt-1 flex flex-col gap-3">
          <div className="flex min-h-[24px] gap-1">
            {contents.hashtags.map((item) => (
              <span key={item.id}>{item.hashtag}</span>
            ))}
          </div>
          <div className="flex">
            <button className="">
              <AiOutlineHeart size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
