"use client";

import { Button } from "@/components/ui/button";
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
import { HTMLProps, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

type ConfigTimerType = {
  work: number;
  short: number;
  large: number;
};

interface Props extends HTMLProps<HTMLElement> {
  userConfigTimer: { work: number; short: number; large: number };
}

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Username must be at least 6 characters.",
  }),
});

export default function ConfigTimerForm({ userConfigTimer }: Props) {
  const [configTimer, setConfigTimer] = useState<ConfigTimerType>({
    work: 0,
    short: 0,
    large: 0,
  });
  const { toast } = useToast();
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const handleConfigTimer: SubmitHandler<ConfigTimerType> = async ({
    work,
    short,
    large,
  }) => {
    console.log(work);
    // const { error } = await supabase.auth.signInWithPassword({
    //   email,
    //   password,
    // });
    // if (error) {
    //   toast({
    //     variant: "destructive",
    //     title: "Oops",
    //     description: error.message,
    //   });
    // } else {
    //   router.refresh();
    // }
  };
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Config Timer</CardTitle>
      </CardHeader>
      <CardContent>
        <Slider
          defaultValue={[userConfigTimer.work]}
          onChange={(e) => {
            console.log(e);
          }}
          onValueChange={(value) => {
            console.log(value);
          }}
          min={5}
          max={60}
          step={5}
          className={cn("w-[100%]")}
        />
        {/* <Slider
          defaultValue={[userConfigTimer.short]}
          value={[configTimer.short]}
          min={5}
          max={60}
          step={5}
          className={cn("w-[100%]")}
        />
        <Slider
          defaultValue={[userConfigTimer.large]}
          value={[configTimer.large]}
          min={5}
          max={60}
          step={5}
          className={cn("w-[100%]")}
        /> */}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button type="submit">
          <Mail className="mr-2 h-4 w-4" /> Sign In with Email
        </Button>
      </CardFooter>
    </Card>
  );
}
