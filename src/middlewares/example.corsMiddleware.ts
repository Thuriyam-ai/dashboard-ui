import { NextResponse } from "next/server";
import { Middleware } from "./_base";

const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

/**
 * Example CORS Middleware
 * This middleware sets the CORS headers for the response
 * @param req NextRequest
 * @param ctx MiddlewareContext
 * @param next Promise<NextResponse>
 * @returns Promise<NextResponse>
 */
export const corsMiddleware: Middleware = async (
  req,
  ctx,
  next,
): Promise<NextResponse> => {
  const response = await next();

  const allowedOrigins = ["https://example.com", "https://another-origin.com"];
  const origin = req.headers.get("origin") ?? "";

  const isPreflight = req.method === "OPTIONS";

  const isAllowedOrigin = allowedOrigins.includes(origin);

  if (origin && isAllowedOrigin) {
    const headers = {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Credentials": "true",
      ...corsOptions,
    };

    Object.entries(headers).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
  }

  // Handle preflight (OPTIONS) request
  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
      ...corsOptions,
    };
    return NextResponse.json({}, { headers: preflightHeaders });
  }

  return response;
};
