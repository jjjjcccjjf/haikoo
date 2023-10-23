"use client";

import { Database } from "@/types/supabase";
import supabase from "@/utils/supabase";
import { useEffect, useState } from "react";
import HaikuCard from "./HaikuCard";

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

    setHaikus((prevHaikus) => [data as HaikuWithHashtags, ...prevHaikus]);
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
    <section className="container flex min-h-screen flex-row flex-wrap content-start divide-y divide-black md:gap-6 md:p-6">
      {haikus.map((item) => {
        return <HaikuCard contents={item} key={item.id} />;
      })}
    </section>
  );
}
