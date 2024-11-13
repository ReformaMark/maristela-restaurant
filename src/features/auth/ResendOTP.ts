import Resend from "@auth/core/providers/resend";
import { Resend as ResendAPI } from "resend";
import { alphabet, generateRandomString } from "oslo/crypto";

export const ResendOTP = Resend({
  id: "resend-otp",
  apiKey: process.env.RESEND_API_KEY,
  async generateVerificationToken() {
    return generateRandomString(8, alphabet("0-9"));
  },
  async sendVerificationRequest({ identifier: email, provider, token }) {
    const resend = new ResendAPI(provider.apiKey);
    const { error } = await resend.emails.send({
      from: "Maristela Restaurant <maristela@resend.dev>",
      to: [email],
      subject: "Sign in to Maristela Restaurant",
      html: `
        <div>
          <h1>Welcome to Maristela Restaurant</h1>
          <p>Your verification code is: <strong>${token}</strong></p>
          <p>Enter this code to complete your sign in.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Failed to send verification email:", error);
      throw new Error("Could not send");
    }
  },
});

// export const ResendPasswordReset = Resend({
//   id: "resend-password-reset",
//   apiKey: process.env.RESEND_API_KEY,
//   async generateVerificationToken() {
//     return generateRandomString(8, alphabet("0-9"));
//   },
//   async sendVerificationRequest({ identifier: email, provider, token }) {
//     const resend = new ResendAPI(provider.apiKey);
//     const { error } = await resend.emails.send({
//       from: "Maristela Restaurant <onboarding@resend.dev>",
//       to: [email],
//       subject: "Reset your password",
//       html: `
//         <div>
//           <h1>Password Reset Request</h1>
//           <p>Your password reset code is: <strong>${token}</strong></p>
//           <p>Enter this code to reset your password.</p>
//         </div>
//       `,
//     });

//     if (error) {
//       throw new Error("Failed to send password reset email");
//     }
//   },
// });