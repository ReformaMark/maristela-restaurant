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
    profile(params) {
        const { error, data } = ParamsSchema.safeParse(params);

        if (error) {
            throw new ConvexError(error.format());
        }

        return {
            email: data.email,
            name: data.name,
            lastName: data.lastName,
            role: data.role,
            address: data.address,
            isVerified: false,
        }
    },
    validatePasswordRequirements: (password: string) => {
        console.log("Validating password length:", password.length);

        if (password.length < 6) {
            console.error("Password validation failed: too short");
            throw new ConvexError(
                "Password must be at least 6 characters long"
            );
        }
        console.log("Password validation passed");
    },
    // @ts-expect-error - ResendOTP is not typed
    verify: ResendOTP,
    // @ts-expect-error - ResendOTPPasswordReset is not typed
    reset: ResendOTPPasswordReset
});