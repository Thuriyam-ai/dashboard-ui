import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Context object passed between middlewares
 */
export interface MiddlewareContext<T extends Record<string, unknown>> {
  state: T;
}

/**
 * Middleware Type Definition
 */
export type Middleware<
  T extends Record<string, unknown> = Record<string, unknown>,
> = (
  req: NextRequest,
  ctx: MiddlewareContext<T>,
  next: () => Promise<NextResponse>,
) => Promise<NextResponse>;

/**
 * Middleware Entry Type: Defines a middleware with its associated conditions.
 */
export interface MiddlewareEntry<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  handler: Middleware<T>; // Middleware function
  matcher?: (string | RegExp)[]; // Optional URL matchers
}

/**
 * Middleware Runner (Composition Utility)
 * @param middlewareEntries - Array of middleware functions with conditions.
 * @returns Middleware handler function.
 */
export function applyMiddleware<T extends Record<string, unknown>>(
  middlewareEntries: MiddlewareEntry<T>[],
) {
  return async function handler(req: NextRequest): Promise<NextResponse> {
    const context: MiddlewareContext<T> = { state: {} as T };

    const applicableMiddlewares = middlewareEntries
      .filter(
        ({ matcher }) =>
          !matcher ||
          matcher.some((condition) =>
            typeof condition === "string"
              ? req.nextUrl.pathname.startsWith(condition)
              : condition.test(req.nextUrl.pathname),
          ),
      )
      .map(({ handler }) => handler);

    let index = -1;
    return (async function runner(i: number): Promise<NextResponse> {
      if (i <= index) throw new Error("next() called multiple times");
      index = i;
      if (i < applicableMiddlewares.length) {
        return await applicableMiddlewares[i](req, context, () =>
          runner(i + 1),
        );
      }
      return NextResponse.next();
    })(0);
  };
}
