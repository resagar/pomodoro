import RegisterForm from "./components/register-form";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { sessionCookies } from "@/lib/utils";
import Menu from "@/app/components/menu/menu";

export const metadata: Metadata = {
  title: "register",
  description: "page from register new user",
};
export default async function Register() {
  const { session } = await sessionCookies(cookies());
  if (session) {
    redirect("/timer");
  }
  return (
    <section className="flex flex-col min-h-screen justify-center items-center p-8">
      <RegisterForm />
    </section>
  );
}
