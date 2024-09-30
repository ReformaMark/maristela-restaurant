"use client"
import { Button } from "@/components/ui/button";
import Hero from "./_components/Hero";
import { useAuthActions } from "@convex-dev/auth/react";

export default function LandingPage() {
  const { signOut } = useAuthActions()
  return (
    <div className="">
      <Hero/>
      <Button
        onClick={signOut}
      >
        logout
      </Button>
    </div>
  );
}
