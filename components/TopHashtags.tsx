import React from "react";

export default function TopHashtags() {
  return (
    <div className="flex h-full w-full flex-col divide-y divide-black rounded-2xl bg-slate-400 p-4 gap-2">
      <p className="text-2xl">Top Hashtags</p>
      <div className="grid grid-flow-row grid-cols-2 text-2xl gap-4 py-4">
        <p className="truncate">#mood</p>
        <p className="truncate">#nature</p>
        <p className="truncate">#life</p>
        <p className="truncate">#random</p>
        <p className="truncate">#anon</p>
        <p className="truncate">#modern</p>
        <p className="truncate">#contemporary</p>
        <p className="truncate">#daily</p>
        <p className="truncate">#mood</p>
        <p className="truncate">#nature</p>
        <p className="truncate">#life</p>
        <p className="truncate">#random</p>
        <p className="truncate">#anon</p>
        <p className="truncate">#modern</p>
      </div>
    </div>
  );
}
