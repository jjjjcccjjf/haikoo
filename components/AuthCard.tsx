"use client";

import endan from "@/app/endan.jpg";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Database } from "@/types/supabase";
import { User } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { useReducer, useState } from "react";
import { FaFacebookSquare, FaGoogle, FaRegSave } from "react-icons/fa";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { TypographyP } from "./ui/typography";
import { Textarea } from "./ui/textarea";
type Profile = Database["public"]["Tables"]["profiles"]["Row"];

interface UserWithProfile extends User {
  profile: Profile;
}

export default function AuthCard({ user }: { user: UserWithProfile | null }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{user ? "Welcome back" : "Welcome to Haikoo"}</CardTitle>
        {!user && (
          <CardDescription>
            Create an account or post anonymously
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {user ? <UserCard user={user} /> : <LoginForm />}
      </CardContent>
      {user && (
        <CardFooter className="flex justify-end">
          <LogoutForm />
        </CardFooter>
      )}
    </Card>
  );
}

function UserCard({ user }: { user: UserWithProfile }) {
  const [isEditMode, toggleEditMode] = useReducer((prev) => !prev, false);

  return (
    <>
      <div>
        <div className="h-20 bg-[url('/plus.svg')]"></div>
        <div className="relative">
          <Image
            src={endan}
            height={80}
            width={80}
            alt="..."
            className=" absolute -top-12 rounded-full border-2 border-orange-50"
          ></Image>
          <Button
            className="absolute right-0 font-normal text-muted-foreground"
            variant={"link"}
            onClick={toggleEditMode}
            size={"sm"}
          >
            Edit profile
          </Button>
        </div>
      </div>
      <div className="mt-14 flex items-center justify-between">
        {isEditMode ? (
          <UpdateProfileForm user={user} />
        ) : (
          <Profile user={user} />
        )}
      </div>
    </>
  );
}

function LogoutForm() {
  return (
    <form action="/auth/sign-out" method="post" className="">
      <Button
        type="submit"
        className="font-normal text-muted-foreground"
        variant={"link"}
        size={"sm"}
      >
        Logout
      </Button>
    </form>
  );
}

function Profile({ user }: { user: UserWithProfile }) {
  return (
    <div className="flex flex-col">
      <TypographyP className="font-bold">@{user.profile.username}</TypographyP>
      <TypographyP>
        lost in multitudes of paracosms but yeah, I smell like coffee, is that
        okay?
      </TypographyP>
    </div>
  );
}

function UpdateProfileForm({ user }: { user: UserWithProfile }) {
  const [username, setUsername] = useState(user.profile.username ?? "");
  return (
    <form
      className="flex w-full flex-col"
      action="/profile/username"
      method="POST"
    >
      <div className="relative">
        <Input
          type="text"
          className="max-full bg-transparent outline-none pl-7"
          name="username"
          required
          placeholder="awesome_user"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <span className="absolute top-2 left-3 pointer-events-none text-muted-foreground">@</span>
      </div>
      <Textarea
        className="mt-6 resize-none"
        placeholder="Edit your status here"
      />
      <Button className="mt-6" size={"lg"} type="submit">
        Save Changes
      </Button>
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
      <div className="flex gap-4">
        <Button
          variant={"outline"}
          size={"lg"}
          type="button"
          className="basis-1/2"
        >
          <FaGoogle size={20}></FaGoogle>
        </Button>
        <Button
          variant={"outline"}
          size={"lg"}
          type="button"
          className="basis-1/2"
        >
          <FaFacebookSquare size={20}></FaFacebookSquare>
        </Button>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <label htmlFor="auth_email" className="sr-only">
        Email
      </label>
      <Input
        type="text"
        name="email"
        id="auth_email"
        placeholder="you@example.com"
        required
      />
      <label htmlFor="auth_password" className="sr-only">
        Password
      </label>

      <Input
        type="password"
        name="password"
        placeholder="••••••••"
        id="auth_password"
        required
      />
      <div className="flex gap-4">
        <Button
          variant={"default"}
          type="submit"
          size={"lg"}
          className="basis-1/2"
        >
          Sign In
        </Button>
        <Button
          variant={"default"}
          type="submit"
          size={"lg"}
          formAction="/auth/sign-up"
          className="basis-1/2"
        >
          Sign Up
        </Button>
      </div>

      <Button
        variant={"link"}
        size={"lg"}
        type="button"
        className="font-normal text-muted-foreground"
      >
        Reset your password
      </Button>
    </form>
  );
}
