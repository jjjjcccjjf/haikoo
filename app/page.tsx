import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "../components/LogoutButton";
import SupabaseLogo from "../components/SupabaseLogo";
import NextJsLogo from "../components/NextJsLogo";
import DeployButton from "../components/DeployButton";
import CreateHaikuCard from "@/components/CreateHaikuCard";
import HaikuCard from "@/components/HaikuCard";

// export const dynamic = "force-dynamic";

export default async function Index() {
  // const supabase = createServerComponentClient({ cookies });

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  return (
    // <div className="w-full flex flex-col items-center">
    //   <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
    //     <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
    //       <DeployButton />
    //       {user ? (
    //         <div className="flex items-center gap-4">
    //           Hey, {user.email}!
    //           <LogoutButton />
    //         </div>
    //       ) : (
    //         <Link
    //           href="/login"
    //           className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    //         >
    //           Login
    //         </Link>
    //       )}
    //     </div>
    //   </nav>

    //   <CreateHaikuCard />
    // </div>
    <>
      <section className="container flex">
        <div className="hidden min-h-full w-1/4 bg-pink-200 md:block">b</div>
        <div className="flex h-full w-full flex-col md:w-2/4 ">
          <div>for you. recent</div>
          <CreateHaikuCard />
        </div>
        <div className="hidden min-h-full w-1/4 bg-pink-300 md:block">c</div>
      </section>
      <section className="bg-green-50 min-h-screen container flex flex-row flex-wrap p-6 gap-x-6 gap-y-6">
        <HaikuCard/>
        <HaikuCard/>
        <HaikuCard/>
        <HaikuCard/>
        <HaikuCard/>
        <HaikuCard/>
        <HaikuCard/>
        <HaikuCard/>
        <HaikuCard/>
        <HaikuCard/>
        <HaikuCard/>
        <HaikuCard/>
        <HaikuCard/>
      </section>
    </>
  );
}
