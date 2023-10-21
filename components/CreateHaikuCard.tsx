"use client";

import { postAnonHaiku } from "@/utils/actions";
import { User } from "@supabase/supabase-js";
import React, { useReducer } from "react";
import { BsPatchQuestion } from "react-icons/bs";
// import { experimental_useFormState as useFormState } from 'react-dom'
// import { useFormStatus } from 'react-dom'

type Action =
  | { type: "UPDATE_FIELD"; field: string; value: string }
  | { type: "RESET_STATE" };

const initialState = {
  hashtags: "",
  body: "",
  formState: "",
};

function reducer(state: typeof initialState, action: Action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET_STATE":
      return { ...initialState };
    default:
      return state;
  }
}

export default function CreateHaikuCard({ user }: { user: User | null }) {
  const [formData, dispatch] = useReducer(reducer, initialState);

  const handleFieldChange = (field: string, value: string) => {
    dispatch({ type: "UPDATE_FIELD", field, value });
  };

  const handleReset = () => {
    dispatch({ type: "RESET_STATE" });
  };

  return (
    <form
      className="relative flex w-full flex-col p-5 after:absolute after:right-12 after:top-24 after:text-red-300 after:content-['Invalid_haiku']"
      action={async (formData) => {
        const res = await postAnonHaiku(formData)
        handleFieldChange("formState", res)
      }}
    >
      <textarea
        className="min-h-[112px] w-full resize-none rounded-2xl bg-orange-50 p-5"
        name="body"
        placeholder="Create your first Haiku"
        value={formData.body}
        onChange={(e) => handleFieldChange("body", e.target.value)}
        required
      ></textarea>
      <div className="mt-4 flex flex-col">
        <div>
          <input
            type="text"
            name="hashtags"
            value={formData.hashtags}
            onChange={(e) => handleFieldChange("hashtags", e.target.value)}
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
