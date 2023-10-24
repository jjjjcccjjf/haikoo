import anonymouse from "@/app/anonymouse.png";
import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai";

import { HaikuWithDetails } from "@/types";

export default function HaikuCard({
  contents,
}: {
  contents: HaikuWithDetails;
}) {
  return (
    <div className=" flex h-auto flex-auto basis-80 flex-row gap-4 px-4 md:py-4 py-8 md:rounded-2xl xl:max-h-52 bg-secondary text-foreground ">
      <div className="relative h-12 w-12">
        <Image
          src={anonymouse}
          alt="..."
          className=" rounded-full"
          height={48}
          width={48}
        ></Image>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-bold">{contents.profile?.username ? `@${contents.profile?.username}`: "anonymouse"}</p>
        <pre className=" font-sans">{contents.body}</pre>
        <div className="mt-1 flex flex-col gap-3">
          <div className="flex min-h-[24px] gap-1 text-muted-foreground">
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
