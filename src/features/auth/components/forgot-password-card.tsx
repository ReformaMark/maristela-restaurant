"use client";

import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TriangleAlertIcon, ArrowLeftIcon } from "lucide-react";
import { AuthFlow } from "../types";

interface PasswordResetCardProps {
  setState: (state: AuthFlow) => void;
}

export function ForgotPasswordCard({ setState }: PasswordResetCardProps) {
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<"forgot" | { email: string }>("forgot");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const handleForgotSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);
      await signIn("password", formData);
      setStep({ email: formData.get("email") as string });
    } catch (error) {
      setError("Failed to send reset code. Please try again.");
    } finally {
      setPending(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);
      await signIn("password", formData);
      setState("signIn"); // Redirect to sign in after successful reset
    } catch (error) {
      setError("Failed to reset password. Please try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-primary">
          {step === "forgot" ? "Reset your password" : "Enter verification code"}
        </CardTitle>
        <CardDescription>
          {step === "forgot"
            ? "Enter your email to receive a reset code"
            : "Check your email for the verification code"}
        </CardDescription>
      </CardHeader>

      {error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlertIcon className="size-4" />
          {error}
        </div>
      )}

      <CardContent className="space-y-4 px-0">
        {step === "forgot" ? (
          <form onSubmit={handleForgotSubmit} className="space-y-4">
            <Input
              name="email"
              placeholder="Email"
              type="email"
              disabled={pending}
              required
            />
            <input name="flow" type="hidden" value="reset" />
            <Button
              type="submit"
              className="w-full"
              disabled={pending}
            >
              {pending ? "Sending..." : "Send Reset Code"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleResetSubmit} className="space-y-4">
            <Input
              name="code"
              placeholder="Verification Code"
              disabled={pending}
              required
            />
            <Input
              name="newPassword"
              placeholder="New Password"
              type="password"
              disabled={pending}
              required
            />
            <input name="email" type="hidden" value={step.email} />
            <input name="flow" type="hidden" value="reset-verification" />
            <div className="flex gap-x-2">
              <Button
                type="submit"
                className="flex-1"
                disabled={pending}
              >
                {pending ? "Resetting..." : "Reset Password"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep("forgot")}
                disabled={pending}
              >
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                Back
              </Button>
            </div>
          </form>
        )}
      </CardContent>

      <CardFooter className="px-0 flex-col space-y-4">
        <Separator />
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            Remember your password?{" "}
            <span
              className="text-primary hover:underline cursor-pointer"
              onClick={() => setState("signIn")}
            >
              Sign in
            </span>
          </p>
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <span
              className="text-primary hover:underline cursor-pointer"
              onClick={() => setState("signUp")}
            >
              Sign up
            </span>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}