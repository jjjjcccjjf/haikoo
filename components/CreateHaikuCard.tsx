import React from "react";
import { QuestionMarkCircledIcon, HeartIcon } from "@radix-ui/react-icons";

// TODO: Fix textarea resize issue

export default function CreateHaikuCard() {
  return (
    <div className="flex w-full flex-col p-5">
      <textarea
        className="min-h-[112px] w-full resize-none rounded-2xl p-5"
        placeholder="Create your first Haiku"
      ></textarea>
      <div className="mt-5 flex justify-between">
        <div className="flex">
          <button>
            <QuestionMarkCircledIcon></QuestionMarkCircledIcon>
          </button>
          <button>
            <HeartIcon ></HeartIcon>
          </button>
        </div>
        <button className="h-10 max-w-prose rounded-full bg-orange-300 px-6  py-2">
          Post
        </button>
      </div>
    </div>
  );
}
