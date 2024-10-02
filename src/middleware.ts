import {
    convexAuthNextjsMiddleware,
    createRouteMatcher,
    nextjsMiddlewareRedirect
} from "@convex-dev/auth/nextjs/server";

const isAuthPage = createRouteMatcher(["/auth"])
// include all dashboard pages
const isAdminPage = createRouteMatcher(["/dashboard/*"])


export default convexAuthNextjsMiddleware((request, { convexAuth }) => {

    if (isAuthPage(request) && convexAuth.isAuthenticated()) {
        return nextjsMiddlewareRedirect(request, "/")
    }

    // TODO: if is not authed and the user is not an admin redirect to homepage (if the user is trying to access adm dashboard)
    if (isAdminPage(request) && !convexAuth.isAuthenticated()) {
        return nextjsMiddlewareRedirect(request, "/")
    }
})


export const config = {
    // The following matcher runs middleware on all routes
    // except static assets.
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};