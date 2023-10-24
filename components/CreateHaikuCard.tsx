"use client";

import { isHaiku } from "@/utils";
import { postHaiku } from "@/utils/actions";
import { User } from "@supabase/supabase-js";
import React, { useReducer, useRef } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { BsPatchQuestion } from "react-icons/bs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

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
    // <button
    //   type="submit"
    //   className="flex h-12 max-w-prose items-center rounded-full bg-orange-300 px-6 py-3 disabled:bg-orange-300/20"
    //   disabled={pending}
    //   aria-disabled={pending}
    // >
    //   Post
    // </button>
    <Button
      type="submit"
      // className="flex h-12 max-w-prose items-center rounded-full bg-orange-300 px-6 py-3 disabled:bg-orange-300/20"
      disabled={pending}
      aria-disabled={pending}
      variant={"default"}
      size={"lg"}
    >
      Post
    </Button>
  );
}

export default function CreateHaikuCard({ user }: { user: User | null }) {
  const [formData, dispatch] = useReducer(reducer, initialState);
  const formRef = useRef<HTMLFormElement>(null);

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
      className="after:text-destructive relative flex w-full flex-col p-5 text-foreground after:absolute after:right-12 after:top-28 after:content-[attr(data-after)] "
      action={postHaiku}
      onSubmit={handleFormSubmit}
      ref={formRef}
      data-after=""
    >
      <Textarea
        className="focus-visible:outline-accent placeholder:text-muted-foreground min-h-[128px] w-full resize-none bg-background p-5 focus-visible:outline-0"
        name="body"
        placeholder="Create your first Haiku"
        value={formData.body}
        onChange={(e) => handleFieldChange("body", e.target.value)}
        onSubmit={(e) => e.preventDefault()}
        required
      />

      <div className="mt-4 flex flex-col">
        <div>
          <Input
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
            className=" w-full bg-transparent px-5 py-2 xl:w-1/2"
            pattern="^#(?:\w+)(?:\s*#(?:\w+))*$"
            title="#hashtags #must #be #like #this"
            placeholder="#hashtags #go #hither"
            autoComplete="off"
          ></Input>
        </div>
        <div className="mt-4 flex justify-between ">
          <div className="flex">
            <button
              className="hover:bg-secondary text-secondary-foreground group flex gap-2 h-11 rounded-md px-4 py-3 items-center"
              type="button"
            >
              <BsPatchQuestion
                size={24}
                className="fill-muted-foreground group-hover:fill-secondary-foreground"
              />
              <span className="hidden group-hover:block text-sm">
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
