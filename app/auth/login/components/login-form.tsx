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

type LoginType = {
  email: string;
  password: string;
};

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Username must be at least 6 characters.",
  }),
});

export default function LoginForm() {
  const { toast } = useToast();
  const form = useForm<LoginType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const handleSignIn: SubmitHandler<LoginType> = async ({
    email,
    password,
  }) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Oops",
        description: error.message,
      });
    } else {
      router.refresh();
    }
  };
  return (
    <Card className="w-[350px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSignIn)}>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
          </CardHeader>
          <CardContent>
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
              <Mail className="mr-2 h-4 w-4" /> Sign In with Email
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
