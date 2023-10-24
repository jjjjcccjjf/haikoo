import React from "react";

export default function TopHashtags() {
  return (
    <div className="flex h-full w-full flex-col gap-2 divide-y divide-black rounded-2xl p-4 dark:bg-slate-800 dark:text-white">
      <p className="text-2xl">Top Hashtags</p>
      <div className="grid grid-flow-row grid-cols-2 gap-4 py-4 text-2xl">
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
