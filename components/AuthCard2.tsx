import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { FaFacebookSquare, FaGoogle } from "react-icons/fa";
import { Button } from "./ui/button";

export default function AuthCard2() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to Haikoo</CardTitle>
        <CardDescription>Create an account or post anonymously</CardDescription>
      </CardHeader>
      <CardContent>
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
          {/* <button className="h-12 rounded-xl bg-orange-100">Sign In</button> */}
          {/* <button
            className="h-12 rounded-xl bg-orange-100"
            formAction="/auth/sign-up"
          >
            Sign Up
          </button> */}
          <Button variant={"link"} size={"lg"} type="button" className="text-muted-foreground font-normal">Forgot password</Button>
          {/* <button className="underline">Forgot password</button> */}
        </form>
      </CardContent>
      {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
    </Card>
  );
}
