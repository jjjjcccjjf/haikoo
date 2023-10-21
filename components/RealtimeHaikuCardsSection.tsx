"use client";

import React, { useEffect, useState } from "react";
import HaikuCard from "./HaikuCard";
import supabase from "@/utils/supabase";
import { Database } from "@/types/supabase";

type Haiku = Database["public"]["Tables"]["haikus"]["Row"];

export const revalidate = 0;

export default function RealtimeHaikuCardsSection({
  serverHaikus,
}: {
  serverHaikus: Haiku[];
}) {

  const [haikus, setHaikus] = useState(serverHaikus)

  useEffect(() => {
    const channel = supabase
      .channel("realtime haikus")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "haikus",
        },
        (payload) => {
          setHaikus([...haikus, payload.new as Haiku])
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, haikus, setHaikus]);

  return (
    <section className="container flex min-h-screen flex-row flex-wrap gap-x-6 gap-y-6 p-6">
      {haikus.map((item) => {
        return <HaikuCard contents={item} key={item.id} />;
      })}
    </section>
  );
}
