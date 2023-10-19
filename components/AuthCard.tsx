import React from "react";
import endan from "@/app/endan.jpg";
import Image from "next/image";
import { FaFacebookSquare, FaGoogle } from "react-icons/fa";

export default function AuthCard() {
  return (
    <section className="h-full w-full rounded-2xl bg-green-50 p-4">
      <div className="flex justify-between">
        <div className="flex flex-row gap-4">
          <div className="relative h-12 w-12">
            <Image src={endan} fill alt="..." className=" rounded-full"></Image>
          </div>
          <p>Welcome back, @haikoo</p>
        </div>
        <div>
          <p>Logout</p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <input type="text" placeholder="email@example.com" className="h-12 w-full mt-4 rounded-xl px-4"/>
        <input type="text" placeholder="password" className="h-12 w-full rounded-xl px-4"/>
        <button>Sign In</button>
        <button>Sign Up</button>
        <div className="flex gap-4">
          <button className="grow bg-yellow-300 h-12 flex items-center justify-center rounded-lg">
            <FaFacebookSquare size={24}></FaFacebookSquare>
          </button>
          <button className="grow bg-yellow-300 h-12 flex items-center justify-center rounded-lg">
            <FaGoogle size={24}></FaGoogle>
          </button>
        </div>
      </div>
    </section>
  );
}
