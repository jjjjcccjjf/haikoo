"use client";

import { HaikuWithDetails } from "@/types";
import supabase from "@/utils/supabase";
import { useEffect, useReducer, useState } from "react";
import HaikuCard, { HaikuCardSkeleton } from "./HaikuCard";
export const revalidate = 0;

interface State {
  list1: HaikuWithDetails[];
  list2: HaikuWithDetails[];
  list3: HaikuWithDetails[];
}

const initialState: State = {
  list1: [],
  list2: [],
  list3: [],
};
type Action = { field: string; value: HaikuWithDetails[] };

function reducer(state: typeof initialState, action: Action) {
  return { ...state, [action.field]: action.value };
}

export default function RealtimeHaikuCardsSection({
  serverHaikus,
}: {
  serverHaikus: HaikuWithDetails[];
}) {
  const [haikus, setHaikus] = useState(serverHaikus);
  const [haikuLists, dispatch] = useReducer(reducer, initialState);

  const handleRealtime = async (payload: any) => {
    const { data, error } = await supabase
      .from("haikus")
      .select(
        `*,
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

  useEffect(() => {
    const sliceData = () => {
      const list1Data = haikus.slice(0, haikus.length / 3);
      const list2Data = haikus.slice(
        haikus.length / 3,
        (2 * haikus.length) / 3,
      );
      const list3Data = haikus.slice((2 * haikus.length) / 3);

      dispatch({ field: "list1", value: list1Data });
      dispatch({ field: "list2", value: list2Data });
      dispatch({ field: "list3", value: list3Data });
    };

    sliceData();
  }, [haikus]);

  return (
    <>
      {haikuLists.list1.length > 0 ? (
        <section className="NO:max-h-[33rem] container grid grid-cols-1 gap-6 overflow-hidden p-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <ul className="space-y-8">
            {haikuLists.list1.map((item) => {
              return <HaikuCard contents={item} key={item.id} />;
            })}
          </ul>
          <ul className="space-y-8">
            {haikuLists.list2.map((item) => {
              return <HaikuCard contents={item} key={item.id} />;
            })}
          </ul>
          <ul className="space-y-8">
            {haikuLists.list3.map((item) => {
              return <HaikuCard contents={item} key={item.id} />;
            })}
          </ul>
        </section>
      ) : (
        <EmptyHaikuCardsSection />
      )}
    </>
  );
}

export function EmptyHaikuCardsSection() {
  return (
    <section className="NO:max-h-[33rem] container grid grid-cols-1 gap-6 overflow-hidden p-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      <ul className="space-y-8">
        <HaikuCardSkeleton />
        <HaikuCardSkeleton variant="nohashtags" />
        <HaikuCardSkeleton />
      </ul>
      <ul className="space-y-8">
        <HaikuCardSkeleton variant="nohashtags" />
        <HaikuCardSkeleton />
        <HaikuCardSkeleton variant="nohashtags" />
      </ul>
      <ul className="space-y-8">
        <HaikuCardSkeleton />
        <HaikuCardSkeleton variant="nohashtags" />
        <HaikuCardSkeleton />
      </ul>
    </section>
  );
}
