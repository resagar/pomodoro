"use client";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Database } from "@/database.types";
import { NavigationMenuList } from "@radix-ui/react-navigation-menu";
import {
  createClientComponentClient,
  Session,
} from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, HTMLProps } from "react";

interface Props extends HTMLProps<HTMLElement> {
  session: Session | null;
}

export default function Menu({ session }: Props) {
  const route = useRouter();

  const signOut = async () => {
    const supabase = createClientComponentClient<Database>();
    await supabase.auth.signOut();
    route.refresh();
  };
  return (
    <NavigationMenu className="h-16 border-b-2">
      <div className="container flex flex-row justify-between items-center">
        <div>
          <Link href="/">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Logo
            </NavigationMenuLink>
          </Link>
        </div>
        <div className="flex flex-row">
          {!session ? (
            <Fragment>
              <Link href="/auth/register">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Sign Up
                </NavigationMenuLink>
              </Link>
              <Link href="/auth/login">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Sign In
                </NavigationMenuLink>
              </Link>
            </Fragment>
          ) : (
            <Fragment>
              <Link href="#">
                <NavigationMenuLink
                  onClick={signOut}
                  className={navigationMenuTriggerStyle()}
                >
                  Sign Out
                </NavigationMenuLink>
              </Link>
            </Fragment>
          )}
        </div>
      </div>
    </NavigationMenu>
  );
}
