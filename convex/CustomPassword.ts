import { Password } from "@convex-dev/auth/providers/Password";
import { ConvexError } from "convex/values";
import { z } from "zod"
import { ResendOTP } from "@/features/auth/ResendOTP";
import { DataModel } from "./_generated/dataModel";
import { ResendOTPPasswordReset } from "./ResendOTPPasswordReset";

const ParamsSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(1),
    lastName: z.string().min(1),
    role: z.enum(["user", "admin"]),
    address: z.string().min(1),
});

export default Password<DataModel>({
    // @ts-expect-error - profile is not defined in the type
    profile(params) {
        switch (params.flow) {
            case "signIn":
                // For sign in, we only need to validate email and password
                if (!params.email || !params.password) {
                    throw new ConvexError({
                        message: "Invalid credentials",
                        validationErrors: {
                            email: !params.email ? { _errors: ["Required"] } : undefined,
                            password: !params.password ? { _errors: ["Required"] } : undefined,
                        }
                    });
                }
                return {
                    email: params.email,
                    isVerified: true, // User is already verified if they can sign in
                };

            case "email-verification":
                if (!params.email || !params.code) {
                    throw new ConvexError({
                        message: "Invalid verification data",
                        validationErrors: {
                            email: !params.email ? { _errors: ["Required"] } : undefined,
                            code: !params.code ? { _errors: ["Required"] } : undefined,
                        }
                    });
                }
                return {
                    email: params.email,
                    isVerified: false,
                };

            case "reset":
                // Only validate email for initial reset request
                if (!params.email) {
                    throw new ConvexError({
                        message: "Email is required",
                        validationErrors: { email: { _errors: ["Required"] } }
                    });
                }
                return { email: params.email };

            case "reset-verification":
                // For verification step, only validate email and code
                if (!params.email || !params.code) {
                    throw new ConvexError({
                        message: "Invalid verification data",
                        validationErrors: {
                            email: !params.email ? { _errors: ["Required"] } : undefined,
                            code: !params.code ? { _errors: ["Required"] } : undefined,
                        }
                    });
                }
                return { email: params.email };

            case "signUp":
                // For sign up, validate all required fields
                const result = ParamsSchema.safeParse({
                    email: params.email,
                    password: params.password,
                    name: params.name,
                    lastName: params.lastName,
                    role: params.role,
                    address: params.address,
                });

                if (!result.success) {
                    throw new ConvexError({
                        message: "Invalid profile data",
                        validationErrors: result.error.format()
                    });
                }

                return {
                    email: result.data.email,
                    name: result.data.name,
                    lastName: result.data.lastName,
                    role: result.data.role,
                    address: result.data.address,
                    isVerified: false,
                };

            default:
                throw new ConvexError({
                    message: "Invalid flow",
                    validationErrors: {
                        flow: { _errors: ["Invalid flow type"] }
                    }
                });
        }
    },
    validatePasswordRequirements: (password: string) => {
        if (password?.length < 6) {
            throw new ConvexError("Password must be at least 6 characters long");
        }
    },
    // @ts-expect-error - ResendOTP is not defined in the type
    verify: ResendOTP,
    // @ts-expect-error - ResendOTPPasswordReset is not defined in the type
    reset: ResendOTPPasswordReset
});