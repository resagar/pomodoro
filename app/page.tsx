import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Button asChild>
        <Link href={"/timer"}>Timer</Link>
      </Button>
    </main>
  );
}
