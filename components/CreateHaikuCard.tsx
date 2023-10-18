import React from "react";
import { BsPatchQuestion } from "react-icons/bs";

// TODO: Fix textarea resize issue

export default function CreateHaikuCard() {
  return (
    <div className="relative flex w-full flex-col p-5 after:absolute after:right-12 after:top-24 after:text-red-300 after:content-['Invalid_haiku']">
      <textarea
        className="min-h-[112px] w-full resize-none rounded-2xl p-5"
        placeholder="Create your first Haiku"
      ></textarea>
      <div className="mt-4 flex flex-col">
        <div>
          <input
            type="text"
            className=" rounded-2xl bg-transparent px-5 py-2 focus:bg-white"
            placeholder="#"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div className="flex">
            <button className="group flex gap-2  rounded-full px-4 py-3 hover:bg-red-50">
              <BsPatchQuestion size={24} className="" />
              <span className="hidden group-hover:block ">
                Your Haiku must follow the 5-7-5 syllabic structure.
              </span>
            </button>
          </div>
          <button className="flex h-12 max-w-prose items-center rounded-full bg-orange-300 px-6 py-3">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
