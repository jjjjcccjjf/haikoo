"use client";

import { isHaiku } from "@/utils";
import { postAnonHaiku } from "@/utils/actions";
import { User } from "@supabase/supabase-js";
import React, { useCallback, useReducer, useRef } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { BsPatchQuestion } from "react-icons/bs";

type Action =
  | { type: "UPDATE_FIELD"; field: string; value: string }
  | { type: "RESET_STATE" };

const initialState = {
  hashtags: "",
  body: "",
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

function Submit() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="flex h-12 max-w-prose items-center rounded-full bg-orange-300 px-6 py-3 disabled:bg-orange-300/20"
      disabled={pending}
      aria-disabled={pending}
    >
      Post
    </button>
  );
}

export default function CreateHaikuCard({ user }: { user: User | null }) {
  const [formData, dispatch] = useReducer(reducer, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // const handleHashtagChange = useCallback(
  //   (newTokenValues: any) => {
  //     handleFieldChange("hashtags", newTokenValues);
  //   },
  //   [formData.hashtags],
  // );

  const updateErrorMessage = (
    element: HTMLFormElement,
    errorMessage: string,
  ) => {
    // Set the 'data-after' attribute to the new error message
    element.dataset.after = errorMessage;
  };

  const handleFieldChange = (field: string, value: string) => {
    dispatch({ type: "UPDATE_FIELD", field, value });
  };

  const handleReset = () => {
    dispatch({ type: "RESET_STATE" });
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);

    const body = String(formData.get("body"));
    const res = isHaiku(body);
    if (!res.status) {
      if (formRef.current) {
        updateErrorMessage(formRef.current, res.message);
      }
      return event.preventDefault();
    }

    handleReset();
    if (formRef.current) {
      updateErrorMessage(formRef.current, "");
    }
  };

  return (
    <form
      className="relative flex w-full flex-col p-5 after:absolute after:right-12 after:top-28 after:text-red-300 after:content-[attr(data-after)]"
      action={postAnonHaiku}
      onSubmit={handleFormSubmit}
      ref={formRef}
      data-after=""
    >
      <textarea
        className="min-h-[128px] w-full resize-none rounded-2xl bg-orange-50 p-5"
        name="body"
        placeholder="Create your first Haiku"
        value={formData.body}
        onChange={(e) => handleFieldChange("body", e.target.value)}
        onSubmit={(e) => e.preventDefault()}
        required
      ></textarea>
      <div className="mt-4 flex flex-col">
        <div>
          <input
            type="text"
            name="hashtags"
            value={formData.hashtags}
            onChange={(e) => {
              const regex = /^#(?:\w+)(?:\s*#(?:\w+))*$/;

              if (regex.test(e.target.value)) {
                console.log("Valid input");
              } else {
                console.log("Invalid input");
              }

              handleFieldChange("hashtags", e.target.value);
            }}
            className=" w-full rounded-2xl bg-transparent px-5 py-2 focus:bg-white xl:w-4/6"
            pattern="^#(?:\w+)(?:\s*#(?:\w+))*$"
            title="#hashtags #must #be #like #this"
            placeholder="#hashtags #go #hither"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div className="flex">
            <button className="group flex gap-2 rounded-full px-4 py-3 hover:bg-red-50" type="button">
              <BsPatchQuestion size={24} className="" />
              <span className="hidden group-hover:block">
                Your Haiku must follow the 5-7-5 syllabic structure.
              </span>
            </button>
          </div>
          <div className="flex gap-4">
            <Submit />
          </div>
        </div>
      </div>
    </form>
  );
}
