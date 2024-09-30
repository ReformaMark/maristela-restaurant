import { convexAuthNextjsMiddleware, createRouteMatcher, isAuthenticatedNextjs, nextjsMiddlewareRedirect } from "@convex-dev/auth/nextjs/server";

const isAuthPage = createRouteMatcher(["/auth"])

export default convexAuthNextjsMiddleware((request) => {
    if (isAuthPage(request) && isAuthenticatedNextjs()) {
        return nextjsMiddlewareRedirect(request, "/")
    }

    // TODO: if is not authed and the user is not an admin redirect to homepage (if the user is trying to access adm dashboard)
})



export const config = {
    // The following matcher runs middleware on all routes
    // except static assets.
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};