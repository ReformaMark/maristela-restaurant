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
import { TriangleAlertIcon, ArrowLeftIcon, Eye, EyeOff } from "lucide-react";
import { AuthFlow } from "../types";
import { toast } from "sonner";

interface PasswordResetCardProps {
  setState: (state: AuthFlow) => void;
}

export function ForgotPasswordCard({ setState }: PasswordResetCardProps) {
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<"forgot" | "verify" | "reset">("forgot");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleForgotSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);
      const emailValue = formData.get("email") as string;
      await signIn("password", {
        email: emailValue,
        flow: "reset"
      });
      setEmail(emailValue);
      setStep("verify");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      setError("Failed to send reset code. Please double check the email address.");
      console.error("Forgot password error:", error);
    } finally {
      setPending(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setError("");

    try {
        const formData = new FormData(e.currentTarget);
        const verificationCode = formData.get("code") as string;
        
        // Store the code first
        setCode(verificationCode);
        setStep("reset");
        toast.success("Code verified successfully!");
        (e.target as HTMLFormElement).reset();
    } catch (error) {
        console.error("Verification error:", error);
        setError("Invalid verification code. Please try again.");
    } finally {
        setPending(false);
    }
};

const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setError("");

    try {
        const formData = new FormData(e.currentTarget);
        const newPassword = formData.get("newPassword") as string;

        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        // Use reset-verification flow with all required data
        await signIn("password", {
            email,
            code,
            newPassword,
            flow: "reset-verification",
            // Add minimal required profile data
            name: "User",
            lastName: "Reset",
            role: "user",
            address: "Reset Address"
        });

        // If successful, redirect to sign in
        setState("signIn");
    } catch (error) {
        console.error("Reset error:", error);
        if (error instanceof Error) {
            setError("Invalid code. Please try again.");
        } else {
            setError("Failed to reset password. Please try again.");
        }
        // If there's an error, go back to verification step
        setStep("verify");
    } finally {
        setPending(false);
    }
};

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-primary">
          {step === "forgot" ? "Reset your password" : 
           step === "verify" ? "Enter verification code" :
           "Set new password"}
        </CardTitle>
        <CardDescription>
          {step === "forgot" ? "Enter your email to receive a reset code" :
           step === "verify" ? "Check your email for the verification code" :
           "Enter your new password"}
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
            <Button
              type="submit"
              className="w-full"
              disabled={pending}
            >
              {pending ? "Sending..." : "Send Reset Code"}
            </Button>
          </form>
        ) : step === "verify" ? (
          <form onSubmit={handleVerifyCode} className="space-y-4">
            <Input
              name="code"
              placeholder="Verification Code"
              disabled={pending}
              required
            />
            <div className="flex gap-x-2">
              <Button
                type="submit"
                className="flex-1"
                disabled={pending}
              >
                {pending ? "Verifying..." : "Verify Code"}
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
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="relative">
              <Input
                name="newPassword"
                placeholder="New Password"
                type={showPassword ? "text" : "password"}
                disabled={pending}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
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
                onClick={() => setStep("verify")}
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
            Don&apos;t have an account?{" "}
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