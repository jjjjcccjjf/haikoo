"use client";

import endan from "@/app/endan.jpg";
import { User } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { useReducer } from "react";
import { FaEdit, FaFacebookSquare, FaGoogle, FaRegSave } from "react-icons/fa";

export default function AuthCard({ user }: { user: User | null }) {
  return (
    <section className="h-full w-full rounded-2xl bg-orange-50 p-4">
      {user ? <UserCard user={user} /> : <LoginForm />}
    </section>
  );
}

function UserCard({ user }: { user: User }) {
  const [isEditMode, toggleEditMode] = useReducer((prev) => !prev, false);

  return (
    <>
      <div>
        <div className="h-20 bg-[url('/plus.svg')]"></div>
        <div className="relative">
          <Image
            src={endan}
            height={86}
            width={86}
            alt="..."
            className=" absolute -top-12 rounded-full border-2 border-orange-50"
          ></Image>
        </div>
      </div>
      <div className="mt-14 flex items-center justify-between">
        {isEditMode ? (
          <UpdateUsernameForm user={user} />
        ) : (
          <Username user={user} />
        )}
        <button onClick={toggleEditMode}>Edit profile</button>
      </div>
      <LogoutForm />
    </>
  );
}

function LogoutForm() {
  return (
    <form action="/auth/sign-out" method="post">
      <button type="submit" className="hover:underline">
        Logout
      </button>
    </form>
  );
}

function Username({ user }: { user: User }) {
  return (
    <div className="flex flex-row gap-4">
      <button className="group flex items-center gap-2 font-mono">
        <span className="group-hover:underline">
          @{user.user_metadata.username}
        </span>{" "}
        <FaEdit className="hidden group-hover:block" />{" "}
      </button>
    </div>
  );
}

function UpdateUsernameForm({ user }: { user: User }) {
  return (
    <form
      className="group flex h-12 items-center  justify-center gap-2 rounded-2xl bg-neutral-50 px-1  outline-2 focus-within:outline"
      action="/profile/username"
      method="POST"
    >
      <span className="pl-2">@</span>
      <input
        type="text"
        className="min-w-[86px] max-w-[128px] bg-transparent outline-none"
        name="username"
        required
        placeholder="awesome_user"
        value={user.user_metadata.username}
      />
      <button className=" rounded-2xl p-2 hover:bg-orange-300">
        <FaRegSave size={24} />
      </button>
    </form>
  );
}

function LoginForm() {
  return (
    <form
      className="relative flex flex-col gap-4"
      action="/auth/sign-in"
      method="post"
    >
      <label htmlFor="email" className="sr-only">
        Email
      </label>
      <input
        type="text"
        name="email"
        placeholder="you@example.com"
        required
        className="mt-4 h-12 w-full rounded-xl bg-neutral-50 px-4"
      />
      <label htmlFor="password" className="sr-only">
        Password
      </label>

      <input
        type="password"
        name="password"
        placeholder="••••••••"
        required
        className="h-12 w-full rounded-xl bg-neutral-50 px-4"
      />
      <button className="h-12 rounded-xl bg-orange-100">Sign In</button>
      <button
        className="h-12 rounded-xl bg-orange-100"
        formAction="/auth/sign-up"
      >
        Sign Up
      </button>
      <button className="underline">Forgot password</button>
      <div className="flex gap-4">
        <button className="flex h-12 grow items-center justify-center rounded-lg bg-yellow-300">
          <FaFacebookSquare size={24}></FaFacebookSquare>
        </button>
        <button className="flex h-12 grow items-center justify-center rounded-lg bg-yellow-300">
          <FaGoogle size={24}></FaGoogle>
        </button>
      </div>
    </form>
  );
}
