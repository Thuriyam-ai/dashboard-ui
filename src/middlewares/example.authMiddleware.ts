import { NextResponse } from "next/server";
import { Middleware } from "./_base";

/**
 * User data interface for type safety
 */
interface UserData {
  id: string;
  email: string;
}

/**
 * Type for auth path patterns that can be either string or regex
 */
type AuthPathPattern = string | RegExp;

// Define URL patterns for different auth types
const OPTIONAL_AUTH_PATHS: AuthPathPattern[] = ["/explore"];

/**
 * Authentication Middleware
 * This middleware checks for user authentication and handles two types of auth checks:
 * 1. Strict Auth: Redirects to login if token is not present
 * 2. Optional Auth: Allows access but embeds user data if available
 * @param req NextRequest
 * @param ctx MiddlewareContext
 * @param next Promise<NextResponse>
 * @returns Promise<NextResponse>
 */
export const authMiddleware: Middleware = async (
  req,
  ctx,
  next,
): Promise<NextResponse> => {
  const response = await next();
  const pathname = req.nextUrl.pathname;

  const isOptionalAuthPath = OPTIONAL_AUTH_PATHS.some((path) =>
    typeof path === "string" ? pathname.startsWith(path) : path.test(pathname),
  );

  // Get the user token from cookies
  const userTokenData = req.cookies.get("user_token_data");

  // If no token is present
  if (!userTokenData) {
    if (!isOptionalAuthPath) {
      // For strict auth paths, redirect to login
      console.log("redirecting to login", req.url);
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return response;
  }

  try {
    const userData = JSON.parse(userTokenData.value) as UserData;

    // Clone the response to modify headers
    const newResponse = NextResponse.next({
      request: {
        headers: req.headers,
      },
    });

    // Copy all headers from the original response
    response.headers.forEach((value, key) => {
      newResponse.headers.set(key, value);
    });

    // Embed user data in the response headers for UI components to access
    newResponse.headers.set("x-user-data", JSON.stringify(userData));

    return newResponse;
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Auth middleware error:", error);

    // If token is invalid or malformed
    if (!isOptionalAuthPath) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return response;
  }
};
