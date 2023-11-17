import { Database } from "@/database.types";
import { sessionCookies } from "@/lib/utils";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ConfigTimerForm from "./components/config-timer-form";

export default async function Config() {
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
  const userConfigTimer = data ? data[0] : { work: 25, large: 15, short: 5 };

  return (
    <section className="flex flex-col min-h-screen justify-center items-center">
      <ConfigTimerForm userConfigTimer={userConfigTimer} />
    </section>
  );
}
