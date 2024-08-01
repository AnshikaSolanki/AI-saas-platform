import { clerkMiddleware } from "@clerk/nextjs/server";
import { createRouteMatcher } from "@clerk/nextjs/server";



const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  "/api/webhook"
]);


export default clerkMiddleware((auth,req) => {
  if (isProtectedRoute(req)) auth().protect();

});


export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

