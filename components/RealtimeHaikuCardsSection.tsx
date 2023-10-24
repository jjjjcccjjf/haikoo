"use client";

import { HaikuWithDetails } from "@/types";
import supabase from "@/utils/supabase";
import { useEffect, useState } from "react";
import HaikuCard from "./HaikuCard";
 
export const revalidate = 0;

export default function RealtimeHaikuCardsSection({
  serverHaikus,
}: {
  serverHaikus: HaikuWithDetails[];
}) {
  const [haikus, setHaikus] = useState(serverHaikus);
  const handleRealtime = async (payload: any) => {
    const { data, error } = await supabase
      .from("haikus")
      .select(`*,
      hashtags(*),
      profile: profiles(*)`,
      )
      .eq("id", payload.new.id)
      .single();

    setHaikus((prevHaikus) => [data as HaikuWithDetails, ...prevHaikus]);
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
    <section className="container flex min-h-screen flex-row flex-wrap content-start divide-y divide-black md:gap-6 md:divide-none md:p-6">
      {haikus.map((item) => {
        return <HaikuCard contents={item} key={item.id} />;
      })}
    </section>
  );
}
