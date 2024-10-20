import {
    convexAuthNextjsMiddleware,
    createRouteMatcher,
    nextjsMiddlewareRedirect
} from "@convex-dev/auth/nextjs/server";

const isAuthPage = createRouteMatcher(["/auth"])
const isAdminPage = createRouteMatcher(["/dashboard/*"])
const isUserPage = createRouteMatcher(["/user/*"])

// Create a Convex client
// const convex = new ConvexClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
    if (isAuthPage(request) && convexAuth.isAuthenticated()) {
        return nextjsMiddlewareRedirect(request, "/")
    }

    if (!convexAuth.isAuthenticated()) {
        if (isAdminPage(request) || isUserPage(request)) {
            return nextjsMiddlewareRedirect(request, "/auth")
        }
        return;
    }

    // Get the user's role from the database
    // const userRole = await convex.query(api.users.checkUserRole, {});

    // if (userRole === null) {
    //     return nextjsMiddlewareRedirect(request, "/auth");
    // }

    // if (isAdminPage(request) && userRole !== "admin") {
    //     return nextjsMiddlewareRedirect(request, "/")
    // }

    // Add any additional role-based checks here if needed
})

export const config = {
    // The following matcher runs middleware on all routes
    // except static assets.
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};