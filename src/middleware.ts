import { applyMiddleware } from "./middlewares/_base";

/**
 * NextJS middleware which allows you to run code before each request.
 * Documentation: https://nextjs.org/docs/app/building-your-application/routing/middleware
 *
 * How to add your own middleware:
 * - Create a new file in the middlewares directory. Eg corsMiddleware.ts, loggingMiddleware.ts, authMiddleware.ts
 * - Add the middleware function to the file. Use example.authMiddleware.ts, example.corsMiddleware.ts or example.loggingMiddlware.ts as reference.
 * - Once the middleware is ready, add it to the array in applyMiddleware -> `applyMiddleware([{ handler: yourMiddleware }])`
 * - Along with handler, you can also add `matcher` which accepts an array of strings or regex. The middleware will only be executed if the request URL matches the string or regex.
 * - The middlewares are executed in the order they are added to the array.
 *
 * Examples:
 * applyMiddlware([
 *  {
 *    // This middleware will be executed for all requests
 *    handler: loggingMiddleware
 *  },
 *  {
 *    // This middleware will only be executed if the request URL starts with '/api/' or '/images/'
 *    handler: corsMiddleware, matcher: [/^\/api(\/.*)?$/, '/images/']
 *  },
 *  {
 *    // This middleware will be executed for all requests except for login page
 *    handler: authMiddleware,
 *    matcher: [/^(?!\/login$).*$/],
 *  }
 * ])
 */
export const middleware = applyMiddleware([]);
