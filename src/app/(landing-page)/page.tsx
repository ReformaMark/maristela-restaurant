"use client"
// import { Button } from "@/components/ui/button";
import Hero from "./_components/Hero";
// import { useAuthActions } from "@convex-dev/auth/react";
import BestSeller from "./_components/BestSeller";
import Services from "./_components/Services";
import Testimony from "./_components/Testimony";
import Subhero from "./_components/Subhero";

export default function LandingPage() {
  // const { signOut } = useAuthActions()
  return (
    <div className="">
      <Hero/>
      <Subhero/>
      <BestSeller/>
      <Services/>
      <Testimony/>
      {/* <Button
        onClick={signOut}
      >
        logout
      </Button> */}
    </div>
  );
}
