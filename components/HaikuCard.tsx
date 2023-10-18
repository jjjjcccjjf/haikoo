import React from "react";
import { BsPostageHeart, BsFillPostageHeartFill } from "react-icons/bs";

export default function HaikuCard() {
  return (
    <div className="flex h-48 flex-auto basis-72 flex-col justify-between rounded-2xl bg-violet-300 px-8 py-4">
      <p>
        agitated ghosts<br></br>
        manufactured by the mind<br></br>
        hallucinations
      </p>
      <div className="flex flex-col gap-3">
        <p>#test #hello #world</p>
        <div>
          <button className=" border border-yellow-50">
            <BsPostageHeart size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
