import { AuthFlow } from "../types"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { TriangleAlertIcon } from "lucide-react"
import { useAuthActions } from "@convex-dev/auth/react";
interface SignInCardProps {
    setState: (state: AuthFlow) => void
}

export const SignInCard = ({
    setState
}: SignInCardProps) => {

    const { signIn } = useAuthActions();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pending, setPending] = useState<boolean>(false);
    const [error, setError] = useState("");

    const onSignIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setPending(true)

        signIn("password", {
            email,
            password,
            flow: "signIn"
        })
            .catch(() => {
                setError("Invalid email or password")
            })
            .finally(() => {
                setPending(false)
            })
    }

    return (
        <Card className="w-full h-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle>
                    Login to continue
                </CardTitle>
                <CardDescription>
                    Use your email or another service to continue
                </CardDescription>
            </CardHeader>
            {!!error && (
                <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
                    <TriangleAlertIcon className="size-4" />
                    {error}
                </div>
            )}
            <CardContent className="space-y-5 px-0 pb-0">
                <form onSubmit={onSignIn} className="space-y-2.5">
                    <Input
                        disabled={pending}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        type="email"
                        required
                    />
                    <Input
                        disabled={pending}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        type="password"
                        required
                    />
                    <Button
                        type="submit"
                        className="w-full"
                        size={"lg"}
                        disabled={pending}
                    >
                        Continue
                    </Button>
                </form>
                <Separator />
                <p className="text-sm text-muted-foreground">
                    Don&apos;t have an account? <span
                        className="text-sky-700 hover:underline cursor-pointer"
                        onClick={() => setState("signUp")}>
                        Sign up
                    </span>
                </p>
            </CardContent>
        </Card>
    )
}