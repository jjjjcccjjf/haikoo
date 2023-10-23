import logo from "@/app/logo.png";
import AuthCard from "@/components/AuthCard";
import CreateHaikuCard from "@/components/CreateHaikuCard";
import HaikuCardsSection from "@/components/RealtimeHaikuCardsSection";
import TopHashtags from "@/components/TopHashtags";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";

// export const dynamic = "force-dynamic";

export const revalidate = 0;

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // const { data, error } = await supabase.from("haikus").select();
  const { data, error } = await supabase
    .from("haikus")
    .select("*, hashtags(*)")
    .order("id", { ascending: false });
  // const { data, error } = await supabase.from("haikus").select("*, hashtags(*)").eq("id", 66);

  // .select("haikus:haiku_hashtags(hashtags:hashtags(*))")

  return (
    <>
      {/* <pre>{JSON.stringify(data)}</pre> */}
      <section className="container flex border-b border-b-black">
        <div className="hidden min-h-full w-1/4 p-4 md:block">
          <TopHashtags />
        </div>
        <div className="flex h-full w-full flex-col items-center divide-y divide-black md:w-2/4">
          <div className="relative my-4 h-14 w-14">
            <Image alt="..." src={logo} height={56} width={56} />
          </div>
          <div className="flex h-16 w-full divide-x divide-black bg-green-300">
            <button className="grow divide-x">For you</button>
            <button className="grow divide-x">Recent</button>
          </div>
          <CreateHaikuCard user={user} />
        </div>
        <div className="hidden min-h-full w-1/4 p-4 md:block">
          <AuthCard user={user}></AuthCard>
        </div>
      </section>
      <HaikuCardsSection serverHaikus={data ?? []} />
    </>
  );
}
