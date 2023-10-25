import React from "react";
import anonymouse from "@/app/anonymouse.png";
import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai";

import { HaikuWithDetails } from "@/types";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

export default function HaikuCard({
  contents,
}: {
  contents: HaikuWithDetails;
}) {
  return (
    <li className="text-sm leading-6">
      <figure className="dark:highlight-white/5 relative flex flex-col rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
        <figcaption className="flex items-center space-x-4">
          <Image
            src={anonymouse}
            alt=""
            className="h-14 w-14 flex-none rounded-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="flex-auto">
            <p className="text-base font-semibold text-card-foreground">
              {contents.profile?.username
                ? `@${contents.profile?.username}`
                : "anonymouse"}
            </p>
            <div className="mt-0.5">weqweqweqweqwe</div>
          </div>
        </figcaption>
        <blockquote className="mt-6 w-full text-card-foreground">
          <pre className="font-sans">{contents.body}</pre>
        </blockquote>
        {contents.hashtags.length > 0 && (
          <div className="mt-6 flex min-h-[24px] w-full gap-1 text-muted-foreground ">
            {contents.hashtags.map((item) => (
              <span key={item.id}>{item.hashtag}</span>
            ))}
          </div>
        )}
        <div className="mt-6 flex">
          <button className="">
            <AiOutlineHeart size={24} />
          </button>
        </div>
      </figure>
    </li>
  );
}

export function HaikuCardSkeleton({
  variant = "default",
}: {
  variant?: "default" | "nohashtags";
}) {
  const hashtagsClasses = cn(
      "mt-6 flex min-h-[24px] w-full gap-2",
      { "hidden": variant === "nohashtags" },
  );
  return (
    <li>
      <figure className="relative flex flex-col rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
        <figcaption className="flex items-center space-x-4">
          <Skeleton className="h-14 w-14 flex-none rounded-full object-cover" />
          <div className="flex-auto">
            <Skeleton className="h-2 w-[200px]" />
            <Skeleton className="mt-4 h-2 w-[100px]" />
          </div>
        </figcaption>
        <blockquote className="mt-6 w-full">
          <Skeleton className="h-2 w-[150px]" />
          <Skeleton className="mt-4 h-2 w-[250px]" />
          <Skeleton className="mt-4 h-2 w-[200px]" />
        </blockquote>
        <div className={hashtagsClasses}>
          <Skeleton className="h-2 w-[50px]" />
          <Skeleton className="h-2 w-[50px]" />
          <Skeleton className="h-2 w-[50px]" />
          <Skeleton className="h-2 w-[50px]" />
        </div>
      </figure>
    </li>
  );
}
