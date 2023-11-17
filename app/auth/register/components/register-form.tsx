"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Field from "@/app/components/field";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/database.types";
import { Mail } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

type RegisterType = {
  email: string;
  password: string;
  username: string;
  firstname: string;
  lastname: string;
};

const formSchema = z.object({
  firstname: z.string().min(2, {
    message: "Firstname must be at least 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "Lastname must be at least 2 characters.",
  }),
  username: z.string().min(6, {
    message: "Username must be at least 6 characters.",
  }),
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function RegisterForm() {
  const { toast } = useToast();
  const form = useForm<RegisterType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const handleSignUp: SubmitHandler<RegisterType> = async ({
    firstname,
    lastname,
    username,
    email,
    password,
  }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) {
      toast({
        variant: "destructive",
        title: "Oops",
        description: error.message,
      });
    }
    if (!error) {
      await supabase
        .from("profile")
        .insert([
          {
            firstname,
            lastname,
            username,
            user_id: data.user!.id,
          },
        ])
        .select();
      await supabase.from("config_timer").insert([
        {
          work: 25,
          large: 15,
          short: 5,
        },
      ]);
      router.refresh();
    }
  };
  return (
    <Card className="w-[350px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSignUp)}>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <Field label="Firstname">
                  <Input
                    placeholder="insert firstname"
                    {...field}
                    type="text"
                  />
                </Field>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <Field label="Lastname">
                  <Input placeholder="insert lastname" {...field} type="text" />
                </Field>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <Field label="Username">
                  <Input placeholder="insert username" {...field} type="text" />
                </Field>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <Field label="Email">
                  <Input
                    placeholder="example@example.com"
                    {...field}
                    type="email"
                  />
                </Field>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <Field label="Password" className="mt-3">
                  <Input
                    placeholder="password"
                    id="password"
                    {...field}
                    type="password"
                  />
                </Field>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button type="submit">
              <Mail className="mr-2 h-4 w-4" /> Sign Up with Email
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
