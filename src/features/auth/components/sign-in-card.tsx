import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useAuthActions } from "@convex-dev/auth/react"
import { useConvexAuth } from "convex/react"
import { Eye, EyeOff, Loader2, TriangleAlertIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AuthFlow } from "../types"
import { useAdminCheck } from "./use-admin-check"

interface SignInCardProps {
    setState: (state: AuthFlow) => void
}

export const SignInCard = ({
    setState
}: SignInCardProps) => {

    const { signIn } = useAuthActions();
    const isAdmin = useAdminCheck();
    const { isAuthenticated } = useConvexAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [pending, setPending] = useState<boolean>(false);
    const [error, setError] = useState("");

    const router = useRouter()

    useEffect(() => {
        if (isAuthenticated) {
            if (!isAdmin) {
                router.push("/");
            } else {
                router.push("/dashboard");
            }
        }
    }, [isAuthenticated, isAdmin, router]);

    const onSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setPending(true)
        setError("")

        try {
            await signIn("password", {
                email,
                password,
                flow: "signIn"
            });

        } catch (error) {
            setError("Invalid email or password")
            console.error(error)
        } finally {
            setPending(false)
        }
    }

    return (
        <Card className="w-full h-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle className="text-primary">
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
                    <div className="relative">
                        <Input
                            disabled={pending}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            type={showPassword ? "text" : "password"}
                            required
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                        </Button>
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        size={"lg"}
                        disabled={pending}
                    >
                        {pending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Signing In...
                            </>
                        ) : (
                            "Continue"
                        )}
                    </Button>
                </form>
                <Separator />
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                        Don&apos;t have an account? <span
                            className="text-primary hover:underline cursor-pointer"
                            onClick={() => setState("signUp")}>
                            Sign up
                        </span>
                    </p>

                    <p className="text-sm text-muted-foreground">
                        Forgot your password? <span
                            className="text-primary hover:underline cursor-pointer"
                            onClick={() => setState("forgotPassword")}>
                            Reset it here
                        </span>
                    </p>

                    <p className="block lg:hidden text-sm text-muted-foreground">
                        Changed your mind? <span
                            className="text-primary hover:underline cursor-pointer"
                            onClick={() => router.push("/")}>
                            Go back to homepage.
                        </span>
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
