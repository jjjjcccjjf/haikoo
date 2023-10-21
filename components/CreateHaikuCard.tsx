import React from "react";
import { BsPatchQuestion } from "react-icons/bs";

// TODO: Fix textarea resize issue

export default async function CreateHaikuCard() {
  const postHaiku = async (formData: FormData) => {
    "use server";
    const body = formData.get("body");

    if (body) {
      console.log(body);
    }
  };

  const postAnonHaiku = async (formData: FormData) => {
    'use server'
    const body = formData.get('body')

    if (body) {
      console.log(body + "anonnnn")
    }
  }

  return (
    <form
      className="relative flex w-full flex-col p-5 after:absolute after:right-12 after:top-24 after:text-red-300 after:content-['Invalid_haiku']"
      action={postHaiku}
    >
      <textarea
        className="min-h-[112px] w-full resize-none rounded-2xl bg-orange-50 p-5"
        name="body"
        placeholder="Create your first Haiku"
      ></textarea>
      <div className="mt-4 flex flex-col">
        <div>
          <input
            type="text"
            className=" w-full rounded-2xl bg-transparent px-5 py-2 focus:bg-white xl:w-4/6"
            placeholder="#"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div className="flex">
            <button className="group flex gap-2 rounded-full px-4 py-3 hover:bg-red-50">
              <BsPatchQuestion size={24} className="" />
              <span className="hidden group-hover:block">
                Your Haiku must follow the 5-7-5 syllabic structure.
              </span>
            </button>
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex h-12 max-w-prose items-center rounded-full bg-orange-300 px-6 py-3"
            >
              Post
            </button>
            <button
              type="submit"
              className="flex h-12 max-w-prose items-center rounded-full bg-orange-300 px-6 py-3"
              formAction={postAnonHaiku}
            >
              Post Anonymously
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
