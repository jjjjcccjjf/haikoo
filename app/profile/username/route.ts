import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
// TODO: move this to actions
export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const username = String(formData.get("username"));
  const supabase = createRouteHandlerClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("profiles")
    .update({ username: username })
    .eq("id", user?.id);

  if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}/?error=Could not authenticate user`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      },
    );
  }

  return NextResponse.redirect(
    `${requestUrl.origin}/?message=Username was set successfully`,
    {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    },
  );
}
