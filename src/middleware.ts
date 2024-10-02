import { convexAuthNextjsMiddleware, createRouteMatcher, isAuthenticatedNextjs, nextjsMiddlewareRedirect } from "@convex-dev/auth/nextjs/server";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useCurrentUser } from "./features/auth/api/use-current-user";

const isAuthPage = createRouteMatcher(["/auth"])
const isAdminPage = createRouteMatcher(["/dashboard"])
// const { data } = useCurrentUser()

// export const isAdmin = () => {
//     if (!data) return false
//     return data.role === "admin"
// }

export default convexAuthNextjsMiddleware((request) => {
    if (isAuthPage(request) && isAuthenticatedNextjs()) {
        return nextjsMiddlewareRedirect(request, "/")
    }

    // TODO: if is not authed and the user is not an admin redirect to homepage (if the user is trying to access adm dashboard)
    if (isAdminPage(request) && !isAuthenticatedNextjs()) {
        return nextjsMiddlewareRedirect(request, "/")
    }
})



export const config = {
    // The following matcher runs middleware on all routes
    // except static assets.
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};