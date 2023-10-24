import logo from "@/app/logo.png";
import AuthCard from "@/components/AuthCard";
import CreateHaikuCard from "@/components/CreateHaikuCard";
import HaikuCardsSection from "@/components/RealtimeHaikuCardsSection";
import TopHashtags from "@/components/TopHashtags";
import { UserWithProfile } from "@/types";
import {
  createServerComponentClient
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";

// export const dynamic = "force-dynamic";

export const revalidate = 0;

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });
  let userWithProfile = null;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    userWithProfile = await supabase
      .from("profiles")
      .select()
      .eq("id", user.id)
      .single();
    userWithProfile = {
      ...user,
      profile: userWithProfile.data,
    } as UserWithProfile;
  }

  const { data, error } = await supabase
    .from("haikus")
    .select(
      `*,
        hashtags(*),
        profile: profiles(*)`,
    )
    .order("id", { ascending: false });

  // console.log(error);

  return (
    <>
      {/* <pre>{JSON.stringify(userWithProfile)}</pre> */}
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
          <CreateHaikuCard user={userWithProfile} />
        </div>
        <div className="hidden min-h-full w-1/4 p-4 md:block">
          <AuthCard user={userWithProfile}></AuthCard>
        </div>
      </section>
      <HaikuCardsSection serverHaikus={data ?? []} />
    </>
  );
}
