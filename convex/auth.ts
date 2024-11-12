import { convexAuth } from "@convex-dev/auth/server";
import CustomPassword from "./CustomPassword";


export const { auth, signIn, signOut, store } = convexAuth({
  providers: [CustomPassword],
});