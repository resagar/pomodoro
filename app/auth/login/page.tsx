import { Metadata } from "next";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/database.types";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import LoginForm from "./components/login-form";
import { sessionCookies } from "@/lib/utils";
import Menu from "@/app/components/menu/menu";

export const metadata: Metadata = {
  title: "Login",
  description: "page from login user",
};
export default async function Register() {
  const { session } = await sessionCookies(cookies());
  if (session) {
    redirect("/timer");
  }
  return (
    <section className="flex flex-col min-h-screen justify-center items-center">
      <LoginForm />
    </section>
  );
}
