import { Metadata } from "next";
import TimerComponent from "@/app/timer/Components/timer/TimerComponent";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/database.types";
import { cookies } from "next/headers";
import { sessionCookies } from "@/lib/utils";
import { redirect } from "next/navigation";
import Menu from "../components/menu/menu";

export const metadata: Metadata = {
  title: "Timer",
  description: "timer app",
};
export default async function Timer() {
  const { session } = await sessionCookies(cookies());
  if (!session) {
    redirect(`/auth/login`);
  }
  const { user } = session;
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase
    .from("config_timer")
    .select("work, large, short")
    .eq("user_id", user.id);
  const timer = data ? data[0] : { work: 25, large: 15, short: 5 };
  return (
    <section className="flex flex-col min-h-screen justify-center items-center">
      <div>
        <TimerComponent timer={timer} />
      </div>
    </section>
  );
}
