import Resend from "@auth/core/providers/resend";
import { Resend as ResendAPI } from "resend";
import { alphabet, generateRandomString } from "oslo/crypto";

export const ResendOTPPasswordReset = Resend({
    id: "resend-otp",
    apiKey: process.env.RESEND_API_KEY,
    async generateVerificationToken() {
        return generateRandomString(8, alphabet("0-9"));
    },
    async sendVerificationRequest({ identifier: email, provider, token }) {
        const resend = new ResendAPI(provider.apiKey);
        const { error } = await resend.emails.send({
            from: "Maristela Restaurant <noreply@maristelarestaurant.com>",
            to: [email],
            subject: "Reset your password in Maristela Restaurant",
            text: "Your password reset code is " + token,
        });

        if (error) {
            throw new Error("Could not send password reset email: " + error.message);
        }
    },
});