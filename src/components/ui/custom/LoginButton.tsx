"use client";
import React from "react";
import { Button } from "../button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSession } from "@/lib/auth-client";
import { Loader } from "lucide-react";
import Image from "next/image";

export default function LoginButton({ className }: { className?: string }) {
  const { isPending, data } = useSession();
  if (isPending) {
    return (
      <>
        <Loader className="size-5 animate-spin" />
      </>
    );
  }
  if (data) {
    return (
      <Button className={cn("size-8 relative rounded-full overflow-hidden", className)}>
        <Image src={data.user.image ?? ""} alt="user-logo" fill className="cursor-pointer" />
      </Button>
    );
  }
  return (
    <Button
      asChild
      variant="default"
      className={cn("cursor-pointer", className)}
    >
      <Link href="/sign-in">LOGIN</Link>
    </Button>
  );
}
