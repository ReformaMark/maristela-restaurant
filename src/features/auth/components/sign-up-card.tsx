import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useAuthActions } from "@convex-dev/auth/react"
import { useConvexAuth } from "convex/react"
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, TriangleAlertIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AuthFlow } from "../types"
import { useAdminCheck } from "./use-admin-check"


interface SignUpCardProps {
    setState: (state: AuthFlow) => void
}

export const SignUpCard = ({
    setState
}: SignUpCardProps) => {

    const { signIn } = useAuthActions();
    const isAdmin = useAdminCheck();
    const { isAuthenticated } = useConvexAuth();

    const [name, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [address, setAddress] = useState("");
    const [role] = useState("user");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pending, setPending] = useState<boolean>(false);
    const [error, setError] = useState("");
    const [step, setStep] = useState(1);

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

    const onSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()


        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        setPending(true)
        setError("")

        signIn("password", {
            email,
            lname,
            name,
            address,
            role,
            password,
            flow: "signUp",
        })
            .catch(() => {
                setError("Something went wrong!")
            })
            .finally(() => {
                setPending(false)
            })
    }

    const handleFirstStep = () => {
        // Make a ched firstname and lastname, it should not contain spaces, special characters and numbers.
        const checkedFirstname = /^[a-zA-Z]+$/.test(name)
        const checkedLastname = /^[a-zA-Z]+$/.test(lname)
        const checkedEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

        if (step === 1 && checkedFirstname && checkedLastname && checkedEmail) {
            setStep((prevStep) => prevStep + 1)
            setError("")
        } else {
            setError("Invalid name or email")
        }
    }

    const handleSecondStep = () => {
        if (step === 2 && password && confirmPassword && password === confirmPassword) {
            setStep((prevStep) => prevStep + 1)
            setError("")
        } else {
            setError("Passwords do not match")
        }
    }

    const handlePrevious = () => {
        if (step > 1) setStep((prevStep) => prevStep - 1)
    }

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <Input
                            disabled={pending}
                            value={name}
                            onChange={(e) => setFName(e.target.value)}
                            placeholder="First name"
                            required
                        />

                        <Input
                            disabled={pending}
                            value={lname}
                            onChange={(e) => setLName(e.target.value)}
                            placeholder="Last name"
                            required
                        />

                        <Input
                            disabled={pending}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            type="email"
                            required
                        />
                    </>
                )
            case 2:
                return (
                    <>
                        <Input
                            disabled={pending}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            type="password"
                            required
                        />
                        <Input
                            disabled={pending}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                            type="password"
                            required
                        />
                    </>
                )
            case 3:
                return (
                    <>
                        <Input
                            disabled={pending}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Address"
                            type="text"
                            required
                        />
                    </>
                )
            default:
                return null
        }
    }

    return (
        <Card className="w-full h-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle className="text-primary">
                    Sign up to continue
                </CardTitle>
                <CardDescription>
                    All fields are required to continue
                </CardDescription>
            </CardHeader>

            {!!error && (
                <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
                    <TriangleAlertIcon className="size-4" />
                    {error}
                </div>
            )}

            <CardContent className="space-y-5 px-0 pb-0">
                <form
                    id="sign-up-form"
                    onSubmit={onSignUp}
                    className="space-y-2.5"
                >
                    <div className="mb-6 flex justify-between">
                        {[1, 2, 3].map((stepNumber) => (
                            <div
                                key={stepNumber}
                                className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= stepNumber ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                                    }`}
                            >
                                {step > stepNumber ? <CheckIcon className="h-5 w-5" /> : stepNumber}
                            </div>
                        ))}
                    </div>
                    {renderStep()}
                </form>
                <CardFooter className="flex justify-between">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={step === 1}
                    >
                        <ArrowLeftIcon className="mr-2 h-4 w-4" /> Previous
                    </Button>
                    {step < 3 ? (
                        <Button type="button" onClick={step === 1 ? handleFirstStep : handleSecondStep}>
                            Next <ArrowRightIcon className="ml-2 h-4 w-4" />
                        </Button>
                    ) : (
                        <Button type="submit" form="sign-up-form">
                            Submit <CheckIcon className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                </CardFooter>
                <Separator />
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                        Already have an account? <span
                            className="text-primary hover:underline cursor-pointer"
                            onClick={() => setState("signIn")}>
                            Sign in
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
        </Card >
    )
}