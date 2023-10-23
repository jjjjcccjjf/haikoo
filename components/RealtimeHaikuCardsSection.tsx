"use client";

import React, { useCallback, useEffect, useState } from "react";
import HaikuCard from "./HaikuCard";
import supabase from "@/utils/supabase";
import { Database } from "@/types/supabase";

type Haiku = Database["public"]["Tables"]["haikus"]["Row"];
type Hashtag = Database["public"]["Tables"]["hashtags"]["Row"];

interface HaikuWithHashtags extends Haiku {
  hashtags: Hashtag[];
}
export const revalidate = 0;

export default function RealtimeHaikuCardsSection({
  serverHaikus,
}: {
  serverHaikus: HaikuWithHashtags[];
}) {

  const [haikus, setHaikus] = useState(serverHaikus);
  const handleRealtime = async (payload: any) => {
    const { data, error } = await supabase
      .from("haikus")
      .select("*, hashtags(*)")
      .eq("id", payload.new.id)
      .single();

    setHaikus([...haikus, data as HaikuWithHashtags]);
  };

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
        handleRealtime,
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, haikus, handleRealtime]);

  return (
    <section className="container flex min-h-screen flex-row flex-wrap gap-x-6 gap-y-6 p-6">
      {haikus.map((item) => {
        return <HaikuCard contents={item} key={item.id} />;
      })}
    </section>
  );
}
