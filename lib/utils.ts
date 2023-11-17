import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/database.types";
import {ReadonlyRequestCookies} from "next/dist/server/web/spec-extension/adapters/request-cookies";

 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const setDate = (minutes: number) => {
  const time = new Date()
  time.setMinutes(time.getMinutes() + minutes)
  return time
};

export const sessionCookies = async (cookies: ReadonlyRequestCookies) => {
  const supabase = createServerComponentClient<Database>({cookies: () => cookies})
  const {data} = await supabase.auth.getSession()
  return data
}
