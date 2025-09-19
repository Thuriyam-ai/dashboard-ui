import { NextResponse } from 'next/server';
import { Middleware } from './_base';

/**
 * Example Logging Middleware
 * This middleware logs the request method and URL to the console
 * @param req NextRequest
 * @param ctx MiddlewareContext
 * @param next Promise<NextResponse>
 * @returns Promise<NextResponse>
 */
export const loggingMiddleware: Middleware = async (
  req,
  ctx,
  next,
): Promise<NextResponse> => {
  console.log(`Request: ${req.method} ${req.nextUrl.pathname}`);
  return next();
};
